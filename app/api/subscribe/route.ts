import { NextResponse } from "next/server";
import { z } from "zod";
import { attributionSchema } from "@/lib/lead-schema";
import { db } from "@/lib/server/db";
import { hasDb } from "@/lib/server/env";
import { ipHash } from "@/lib/server/request";
import { isRateLimited, notifyLead, saveLead } from "@/lib/server/leads";

const schema = z.object({
  email: z.string().trim().toLowerCase().email().max(200),
  attribution: attributionSchema,
  hp: z.string().max(0).optional(),
});

/** Daily AI digest signup → subscribers + leads (source = news_digest). */
export async function POST(req: Request) {
  if (!hasDb()) return NextResponse.json({ ok: false, fallback: "mailto" }, { status: 503 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 422 });

  const ip = ipHash(req);
  if (await isRateLimited(ip)) return NextResponse.json({ ok: false, error: "Too many requests — try again later." }, { status: 429 });

  const { email, attribution } = parsed.data;
  try {
    const { data: existing } = await db().from("subscribers").select("id, unsubscribed_at").ilike("email", email).maybeSingle();
    if (existing) {
      if (existing.unsubscribed_at) await db().from("subscribers").update({ unsubscribed_at: null }).eq("id", existing.id);
      return NextResponse.json({ ok: true, already: !existing.unsubscribed_at });
    }
    await db().from("subscribers").insert({ email, source: "news_digest" });
    const lead = { name: email.split("@")[0], email, source: "news_digest" as const, consent: true as const, attribution };
    const id = await saveLead(lead, { ip, userAgent: req.headers.get("user-agent") });
    await notifyLead(lead, id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[subscribe] failed", e);
    return NextResponse.json({ ok: false, fallback: "mailto" }, { status: 500 });
  }
}
