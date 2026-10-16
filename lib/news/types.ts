import { noEmDash } from "@/lib/text";

/** Shared (client + server) shapes for AI News. */

export const NEWS_CATEGORIES = {
  tools: "Tools",
  models: "Models",
  business: "Business",
  india: "India",
  policy: "Policy & safety",
  research: "Research",
} as const;
export type NewsCategory = keyof typeof NEWS_CATEGORIES;

export interface NewsSourceLink {
  name: string;
  url: string;
}

export interface NewsItem {
  id: string;
  slug: string;
  briefDate: string; // YYYY-MM-DD (IST)
  headline: string;
  summary: string;
  whyItMatters: string | null;
  category: NewsCategory;
  tags: string[];
  sources: NewsSourceLink[];
  score: number;
  publishedAt: string | null;
}

/** Maps a news_items row (snake_case) to the UI shape. */
export function toNewsItem(r: Record<string, unknown>): NewsItem {
  const cat = String(r.category ?? "business");
  return {
    id: String(r.id),
    slug: String(r.slug),
    briefDate: String(r.brief_date),
    headline: noEmDash(String(r.headline)),
    summary: noEmDash(String(r.summary)),
    whyItMatters: r.why_it_matters ? noEmDash(String(r.why_it_matters)) : null,
    category: (cat in NEWS_CATEGORIES ? cat : "business") as NewsCategory,
    tags: (r.tags as string[] | null) ?? [],
    sources: Array.isArray(r.sources) ? (r.sources as NewsSourceLink[]) : [],
    score: Number(r.score ?? 0),
    publishedAt: (r.published_at as string | null) ?? null,
  };
}

/** "2026-10-16" → "Friday, 16 October 2026" (date-only, no time-zone drift). */
export function formatBriefDate(date: string, style: "long" | "short" = "long") {
  const [y, m, d] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("en-IN", {
    weekday: style === "long" ? "long" : undefined,
    day: "numeric",
    month: style === "long" ? "long" : "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

/** Today's date in India (the brief is published for IST mornings). */
export function istDate(at = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(at);
}
