import "server-only";
import { toNewsItem, type NewsItem } from "@/lib/news/types";
import { db } from "../db";
import { hasDb } from "../env";

/** Read helpers for the public pages. They never throw: no DB or an error just means "no news yet". */

async function safe<T>(fallback: T, fn: () => Promise<T>) {
  if (!hasDb()) return fallback;
  try {
    return await fn();
  } catch (e) {
    console.error("[news] query failed", e);
    return fallback;
  }
}

export function getBrief(date: string) {
  return safe<NewsItem[]>([], async () => {
    const { data, error } = await db().from("news_items").select("*").eq("brief_date", date).order("score", { ascending: false });
    if (error) throw error;
    return (data ?? []).map(toNewsItem);
  });
}

/** Most recent brief dates, newest first. */
export function getBriefDates(limit = 21) {
  return safe<string[]>([], async () => {
    const { data, error } = await db().from("news_items").select("brief_date").order("brief_date", { ascending: false }).limit(limit * 15);
    if (error) throw error;
    return [...new Set((data ?? []).map((r) => String(r.brief_date)))].slice(0, limit);
  });
}

export async function getLatestBrief() {
  const [date] = await getBriefDates(1);
  return { date: date ?? null, items: date ? await getBrief(date) : [] };
}
