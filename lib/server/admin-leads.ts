import "server-only";
import { db } from "./db";

export const STATUSES = ["new", "contacted", "proposal", "won", "lost"] as const;
export const SOURCES = ["contact_form", "quick_brief", "tool", "news_digest", "chat"] as const;

export interface LeadFilters {
  status?: string;
  source?: string;
  q?: string;
}

export interface LeadRow {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  website: string | null;
  source: string;
  tool: string | null;
  services: string[] | null;
  budget: string | null;
  timeline: string | null;
  message: string | null;
  inputs: Record<string, unknown> | null;
  report: Record<string, unknown> | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
  landing_page: string | null;
  consent: boolean;
  status: (typeof STATUSES)[number];
  notes: string | null;
}

export async function listLeads(f: LeadFilters, limit = 500) {
  let q = db().from("leads").select("*").order("created_at", { ascending: false }).limit(limit);
  if (f.status && STATUSES.includes(f.status as never)) q = q.eq("status", f.status);
  if (f.source && SOURCES.includes(f.source as never)) q = q.eq("source", f.source);
  if (f.q) {
    const term = f.q.replace(/[%,()]/g, " ").trim();
    if (term) q = q.or(`name.ilike.%${term}%,email.ilike.%${term}%,company.ilike.%${term}%`);
  }
  const { data, error } = await q;
  if (error) throw new Error(error.message);
  return (data ?? []) as LeadRow[];
}

export async function leadCounts() {
  const { data } = await db().from("leads").select("status");
  const counts: Record<string, number> = { all: data?.length ?? 0 };
  data?.forEach((r: { status: string }) => (counts[r.status] = (counts[r.status] ?? 0) + 1));
  return counts;
}
