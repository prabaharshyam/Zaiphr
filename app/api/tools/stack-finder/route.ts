import { NextResponse } from "next/server";
import { finderInputSchema, previewOf, TOOL_ID, type FinderResult, type Plan } from "@/lib/stack-finder/types";
import { analyseWithClaude, hasAi, inputHash, matchWithoutAi } from "@/lib/server/stack-finder";
import { db } from "@/lib/server/db";
import { hasDb } from "@/lib/server/env";
import { ipHash } from "@/lib/server/request";

export const maxDuration = 60;

const PER_HOUR = 6;
const CACHE_DAYS = 14;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  // Honeypot filled: answer vaguely so bots learn nothing.
  if ((body as { hp?: string })?.hp) return NextResponse.json({ error: "Invalid input" }, { status: 422 });
  const parsed = finderInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 422 });
  }
  const input = parsed.data;
  const hash = inputHash(input);
  const ip = ipHash(req);

  // Cache + rate limit (when the database is available)
  if (hasDb()) {
    const since = new Date(Date.now() - CACHE_DAYS * 864e5).toISOString();
    const { data: cached } = await db()
      .from("tool_runs")
      .select("id, result")
      .eq("tool", TOOL_ID)
      .eq("input_hash", hash)
      .eq("status", "ok")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (cached?.result) return NextResponse.json(respond(cached.id, cached.result as StoredResult));

    const hourAgo = new Date(Date.now() - 3600e3).toISOString();
    const { count } = await db().from("tool_runs").select("id", { count: "exact", head: true }).eq("tool", TOOL_ID).eq("ip_hash", ip).gte("created_at", hourAgo);
    if ((count ?? 0) >= PER_HOUR) {
      return NextResponse.json({ error: "You've run a few plans already. Please try again in an hour, or book a call and we'll map it with you." }, { status: 429 });
    }
  }

  let plan: Plan;
  let engine: "ai" | "match" = "match";
  if (hasAi()) {
    try {
      plan = await analyseWithClaude(input);
      engine = "ai";
    } catch (e) {
      console.error("[stack-finder] AI failed, using matcher", e);
      plan = matchWithoutAi(input);
    }
  } else {
    plan = matchWithoutAi(input);
  }

  const stored: StoredResult = { plan, engine };
  let runId: string | null = null;
  if (hasDb()) {
    const { data, error } = await db()
      .from("tool_runs")
      .insert({ tool: TOOL_ID, input_hash: hash, inputs: input, result: stored, status: "ok", ip_hash: ip })
      .select("id")
      .single();
    if (error) console.error("[stack-finder] save failed", error);
    runId = data?.id ?? null;
  }
  return NextResponse.json(respond(runId, stored));
}

/** Re-open a saved plan (?plan=<runId>). Full plan only if it was unlocked with the lead form. */
export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("plan") ?? "";
  if (!hasDb() || !/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const { data: run } = await db().from("tool_runs").select("id, result, lead_id, inputs").eq("id", id).eq("tool", TOOL_ID).maybeSingle();
  if (!run?.result) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const stored = run.result as StoredResult;
  const base = respond(run.id, stored);
  const res = run.lead_id ? { ...base, locked: false, plan: stored.plan } : base;
  return NextResponse.json({ ...res, problem: (run.inputs as { problem?: string })?.problem ?? "" });
}

interface StoredResult {
  plan: Plan;
  engine: "ai" | "match";
}

function respond(runId: string | null, { plan, engine }: StoredResult): FinderResult {
  // Without a database we can't gate the full plan, so return it all.
  if (!runId) return { runId, engine, locked: false, plan, totalTools: plan.stack.length };
  return { runId, engine, locked: true, plan: previewOf(plan), totalTools: plan.stack.length };
}
