import { NextResponse } from "next/server";
import { z } from "zod";
import { attributionSchema } from "@/lib/lead-schema";
import { TOOL_ID, type FinderResult, type Plan } from "@/lib/stack-finder/types";
import { db } from "@/lib/server/db";
import { hasDb } from "@/lib/server/env";
import { ipHash } from "@/lib/server/request";
import { isRateLimited, notifyLead, saveLead } from "@/lib/server/leads";
import { planEmail } from "@/lib/server/finder-email";

const schema = z.object({
  runId: z.string().uuid(),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().toLowerCase().email().max(200),
  company: z.string().trim().max(160).optional(),
  phone: z.string().trim().max(40).optional(),
  consent: z.literal(true, { message: "Consent is required" }),
  attribution: attributionSchema,
});

/** Unlock the full plan: save the lead, email the plan, return everything. */
export async function POST(req: Request) {
  if (!hasDb()) return NextResponse.json({ error: "Unavailable" }, { status: 503 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid data" }, { status: 422 });
  const { runId, attribution, ...person } = parsed.data;

  const ip = ipHash(req);
  if (await isRateLimited(ip)) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });

  const { data: run } = await db().from("tool_runs").select("id, inputs, result").eq("id", runId).eq("tool", TOOL_ID).maybeSingle();
  if (!run?.result) return NextResponse.json({ error: "Plan not found. Please run the finder again." }, { status: 404 });
  const { plan, engine } = run.result as { plan: Plan; engine: "ai" | "match" };
  const inputs = run.inputs as { problem: string; industry?: string };

  const lead = {
    ...person,
    company: person.company || undefined,
    phone: person.phone || undefined,
    source: "tool" as const,
    tool: TOOL_ID,
    message: inputs.problem,
    inputs: run.inputs as Record<string, unknown>,
    report: { headline: plan.headline, tools: plan.stack.map((s) => s.toolId), service: plan.doneForYou.service, engine },
    attribution,
  };
  try {
    const leadId = await saveLead(lead, { ip, userAgent: req.headers.get("user-agent") });
    await db().from("tool_runs").update({ lead_id: leadId }).eq("id", runId);
    await notifyLead(lead, leadId, { confirmSubject: `Your AI stack: ${plan.headline}`, confirmHtml: planEmail(person.name, plan, runId) });
  } catch (e) {
    console.error("[stack-finder] unlock failed", e);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }

  const result: FinderResult = { runId, engine, locked: false, plan, totalTools: plan.stack.length };
  return NextResponse.json(result);
}
