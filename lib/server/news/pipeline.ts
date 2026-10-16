import "server-only";
import { newsSources } from "@/config/news-sources";
import { istDate, toNewsItem } from "@/lib/news/types";
import { db } from "../db";
import { env, hasAi, hasDb } from "../env";
import { collect, normalizeUrl, type SourceResult } from "./fetch";
import { curateWithClaude, curateWithoutAi, type Story } from "./curate";
import { sendDigest } from "./digest";

export interface RunStats {
  briefDate: string;
  engine?: "ai" | "match";
  aiError?: string;
  candidates?: number;
  stories?: number;
  skipped?: string;
  sources?: SourceResult[];
  digest?: { sent: number; failed: number; skipped?: string };
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 70)
    .replace(/-[^-]*$/, "");

/** URLs already published in recent briefs, so yesterday's story doesn't repeat today. */
async function recentUrls(days = 5) {
  const since = new Date(Date.now() - days * 86400_000).toISOString().slice(0, 10);
  const { data } = await db().from("news_items").select("sources").gte("brief_date", since);
  return new Set((data ?? []).flatMap((r) => ((r.sources as { url: string }[]) ?? []).map((s) => normalizeUrl(s.url))));
}

async function store(briefDate: string, stories: Story[]) {
  const taken = new Set<string>();
  const rows = stories.map((s, i) => {
    let slug = `${briefDate}-${slugify(s.headline) || "story"}`;
    while (taken.has(slug)) slug += `-${i}`;
    taken.add(slug);
    return {
      slug,
      brief_date: briefDate,
      headline: s.headline,
      summary: s.summary,
      why_it_matters: s.whyItMatters,
      category: s.category,
      tags: s.tags,
      sources: s.sources,
      // Keep the curator's order stable: higher rank first, ties broken by position.
      score: s.score + (stories.length - i) / 100,
      published_at: s.publishedAt,
    };
  });
  const { data, error } = await db().from("news_items").insert(rows).select("*");
  if (error) throw new Error(`insert news_items: ${error.message}`);
  return (data ?? []).map(toNewsItem);
}

/**
 * Builds today's brief once (unless forced), then sends the digest once.
 * Safe to call repeatedly: the cron, a retry and the admin "Run now" button all share it.
 */
export async function runNewsPipeline({ force = false, digest = true }: { force?: boolean; digest?: boolean } = {}) {
  if (!hasDb()) throw new Error("Supabase is not configured");
  const briefDate = istDate();
  const stats: RunStats = { briefDate };

  // One run at a time.
  const tenMinAgo = new Date(Date.now() - 10 * 60_000).toISOString();
  const { data: running } = await db().from("news_runs").select("id").eq("status", "running").gte("started_at", tenMinAgo).limit(1);
  if (running?.length && !force) return { status: "skipped" as const, stats: { ...stats, skipped: "another run is in progress" } };

  const { data: run, error: runErr } = await db().from("news_runs").insert({ status: "running", stats }).select("id").single();
  if (runErr) throw new Error(`news_runs: ${runErr.message}`);
  const finish = (status: "ok" | "error", error?: string) =>
    db().from("news_runs").update({ status, stats, error: error ?? null, finished_at: new Date().toISOString() }).eq("id", run.id);

  try {
    const { data: existing } = await db().from("news_items").select("*").eq("brief_date", briefDate).order("score", { ascending: false });
    let items = (existing ?? []).map(toNewsItem);

    if (items.length && !force) {
      stats.skipped = "today's brief already exists";
    } else {
      if (items.length) await db().from("news_items").delete().eq("brief_date", briefDate);
      const { candidates, results } = await collect(newsSources);
      const seen = await recentUrls();
      const fresh = candidates.filter((c) => !seen.has(normalizeUrl(c.url)));
      stats.sources = results;
      stats.candidates = fresh.length;
      if (!fresh.length) throw new Error(`no fresh candidates (${results.filter((r) => r.ok).length}/${results.length} sources reachable)`);

      let stories: Story[] | null = null;
      if (hasAi()) {
        try {
          stories = await curateWithClaude(fresh);
          stats.engine = "ai";
        } catch (e) {
          stats.aiError = e instanceof Error ? e.message.slice(0, 200) : String(e);
          console.error("[news] AI curation failed, using fallback", e);
        }
      }
      if (!stories) {
        stories = curateWithoutAi(fresh);
        stats.engine = "match";
      }
      items = await store(briefDate, stories);
      stats.stories = items.length;
    }

    if (digest) stats.digest = await sendDigest(briefDate, items);
    await finish("ok");
    return { status: "ok" as const, stats, items };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    await finish("error", msg.slice(0, 500));
    throw e;
  }
}

export async function recentRuns(limit = 7) {
  const { data } = await db().from("news_runs").select("*").order("started_at", { ascending: false }).limit(limit);
  return (data ?? []) as { id: string; started_at: string; finished_at: string | null; status: string; stats: RunStats | null; error: string | null }[];
}

export const newsModelName = () => env.newsModel;
