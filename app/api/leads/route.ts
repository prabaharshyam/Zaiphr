import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/lead-schema";
import { hasDb } from "@/lib/server/env";
import { ipHash } from "@/lib/server/request";
import { isRateLimited, notifyLead, saveLead } from "@/lib/server/leads";

export async function POST(req: Request) {
  // Not configured yet → tell the client to fall back to email so no lead is lost.
  if (!hasDb()) return NextResponse.json({ ok: false, fallback: "mailto" }, { status: 503 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    // Honeypot hit → pretend success.
    if ((body as { hp?: string })?.hp) return NextResponse.json({ ok: true });
    return NextResponse.json({ ok: false, error: parsed.error.issues[0]?.message ?? "Invalid data" }, { status: 422 });
  }

  const ip = ipHash(req);
  if (await isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many submissions — please try again in an hour, or email us." }, { status: 429 });
  }

  try {
    const id = await saveLead(parsed.data, { ip, userAgent: req.headers.get("user-agent") });
    await notifyLead(parsed.data, id);
    return NextResponse.json({ ok: true, id });
  } catch (e) {
    console.error("[leads] save failed", e);
    return NextResponse.json({ ok: false, fallback: "mailto" }, { status: 500 });
  }
}
