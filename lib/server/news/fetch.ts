import "server-only";
import { XMLParser } from "fast-xml-parser";
import type { NewsSource } from "@/config/news-sources";

export interface Candidate {
  id: number;
  title: string;
  url: string;
  sourceId: string;
  source: string;
  authority: number;
  india: boolean;
  publishedAt: string | null;
  snippet: string;
  points?: number;
}

export interface SourceResult {
  id: string;
  name: string;
  ok: boolean;
  count: number;
  error?: string;
}

const UA = "ZaiphrNewsBot/1.0 (+https://www.zaiphr.in/news)";
const TIMEOUT_MS = 10_000;

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  cdataPropName: false,
  processEntities: true,
  htmlEntities: true,
});

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", hellip: "…", mdash: "—", ndash: "–", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“" };

/** Strips tags and decodes entities from feed HTML. */
export function plain(html: unknown, max = 600) {
  const s = text(html)
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m)
    .replace(/\s+/g, " ")
    .trim();
  return s.length > max ? s.slice(0, max).replace(/\s+\S*$/, "") + "…" : s;
}

/** Feed fields can be strings, numbers or { "#text": … } nodes. */
function text(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string" || typeof v === "number") return String(v);
  if (Array.isArray(v)) return text(v[0]);
  if (typeof v === "object" && "#text" in (v as object)) return text((v as Record<string, unknown>)["#text"]);
  return "";
}

const arr = <T,>(v: T | T[] | undefined): T[] => (v == null ? [] : Array.isArray(v) ? v : [v]);

function atomLink(link: unknown): string {
  const links = arr(link as Record<string, string> | Record<string, string>[]);
  const alt = links.find((l) => typeof l === "object" && (!l["@_rel"] || l["@_rel"] === "alternate")) ?? links[0];
  return typeof alt === "string" ? alt : (alt?.["@_href"] ?? "");
}

function isoDate(v: unknown) {
  const t = Date.parse(text(v));
  return Number.isNaN(t) ? null : new Date(t).toISOString();
}

type Raw = Omit<Candidate, "id">;

/** Parses RSS 2.0, RSS 1.0 (RDF) and Atom. */
export function parseFeed(xml: string, src: NewsSource): Raw[] {
  const doc = parser.parse(xml);
  const base = { sourceId: src.id, source: src.name, authority: src.authority, india: !!src.india };
  const rssItems = arr(doc?.rss?.channel?.item ?? doc?.["rdf:RDF"]?.item);
  if (rssItems.length)
    return rssItems.map((i: Record<string, unknown>) => ({
      ...base,
      title: plain(i.title, 300),
      url: text(i.link).trim() || text(i.guid).trim(),
      publishedAt: isoDate(i.pubDate ?? i["dc:date"]),
      snippet: plain(i.description ?? i["content:encoded"]),
    }));
  if (!doc?.feed && !doc?.rss && !doc?.["rdf:RDF"]) throw new Error("not an RSS/Atom feed");
  return arr(doc?.feed?.entry).map((e: Record<string, unknown>) => ({
    ...base,
    title: plain(e.title, 300),
    url: atomLink(e.link),
    publishedAt: isoDate(e.published ?? e.updated),
    snippet: plain(e.summary ?? e.content),
  }));
}

/** Test-only: NEWS_FEED_TEST_BASE serves every source from a local mock (`<base>/<source id>`). */
const sourceUrl = (src: NewsSource) => (process.env.NEWS_FEED_TEST_BASE ? `${process.env.NEWS_FEED_TEST_BASE}/${src.id}` : src.url);

async function get(url: string) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "application/rss+xml, application/atom+xml, application/xml, application/json;q=0.9, */*;q=0.5" },
    signal: AbortSignal.timeout(TIMEOUT_MS),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

async function fetchHn(src: NewsSource, sinceSec: number): Promise<Raw[]> {
  const url = `${sourceUrl(src)}?tags=story&hitsPerPage=50&numericFilters=${encodeURIComponent(`points>=150,created_at_i>${sinceSec}`)}`;
  const data = JSON.parse(await get(url)) as { hits?: { objectID: string; title: string; url: string | null; points: number; created_at: string; story_text?: string }[] };
  return (data.hits ?? []).map((h) => ({
    sourceId: src.id,
    source: src.name,
    authority: src.authority,
    india: false,
    title: plain(h.title, 300),
    url: h.url || `https://news.ycombinator.com/item?id=${h.objectID}`,
    publishedAt: h.created_at,
    snippet: plain(h.story_text ?? "", 400),
    points: h.points,
  }));
}

/** Cleans tracking params and fragments so the same story dedupes across feeds. */
export function normalizeUrl(u: string) {
  try {
    const url = new URL(u);
    url.hash = "";
    [...url.searchParams.keys()].forEach((k) => /^(utm_|ref|source|fbclid|gclid|mc_)/i.test(k) && url.searchParams.delete(k));
    url.hostname = url.hostname.replace(/^www\./, "").toLowerCase();
    return url.toString().replace(/\/$/, "");
  } catch {
    return u.trim();
  }
}

export const AI_RE =
  /\b(ai|a\.i\.|artificial intelligence|genai|generative|llms?|gpt[-\w.]*|chatgpt|claude|gemini|llama|mistral|openai|anthropic|deepmind|copilot|ai agents?|agentic|machine learning|neural|chatbots?|diffusion|transformer|nvidia|hugging ?face|perplexity|midjourney|sora|deepseek|qwen|grok)\b/i;

/**
 * Fetches every source in parallel. A failing feed never fails the run — it's reported in `results`.
 * Returns fresh, AI-relevant, de-duplicated candidates (newest first).
 */
export async function collect(sources: NewsSource[], windowHours = 30) {
  const since = Date.now() - windowHours * 3600_000;
  const results: SourceResult[] = [];
  const all: Raw[] = [];

  await Promise.all(
    sources.map(async (src) => {
      try {
        const items = src.kind === "hn" ? await fetchHn(src, Math.floor(since / 1000)) : parseFeed(await get(sourceUrl(src)), src);
        const fresh = items.filter(
          (i) =>
            i.title &&
            /^https?:\/\//.test(i.url) &&
            (!i.publishedAt || Date.parse(i.publishedAt) >= since) &&
            (src.aiOnly || AI_RE.test(`${i.title} ${i.snippet}`)),
        );
        all.push(...fresh);
        results.push({ id: src.id, name: src.name, ok: true, count: fresh.length });
      } catch (e) {
        results.push({ id: src.id, name: src.name, ok: false, count: 0, error: e instanceof Error ? e.message.slice(0, 120) : String(e) });
      }
    }),
  );

  const seen = new Set<string>();
  const candidates: Candidate[] = [];
  all
    .sort((a, b) => Date.parse(b.publishedAt ?? "0") - Date.parse(a.publishedAt ?? "0"))
    .forEach((c) => {
      const key = normalizeUrl(c.url);
      if (seen.has(key)) return;
      seen.add(key);
      candidates.push({ ...c, id: candidates.length + 1 });
    });

  results.sort((a, b) => a.name.localeCompare(b.name));
  return { candidates, results };
}
