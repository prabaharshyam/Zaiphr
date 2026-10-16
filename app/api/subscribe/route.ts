import { NextResponse } from "next/server";
import { z } from "zod";
import { attributionSchema } from "@/lib/lead-schema";
import { hasDb } from "@/lib/server/env";
import { ipHash } from "@/lib/server/request";
import { isRateLimited } from "@/lib/server/leads";
import { addSubscriber } from "@/lib/server/subscribers";

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
  if (await isRateLimited(ip)) return NextResponse.json({ ok: false, error: "Too many requests. Try again later." }, { status: 429 });

  const { email, attribution } = parsed.data;
  try {
    const { already } = await addSubscriber(email, { ip, userAgent: req.headers.get("user-agent"), attribution });
    return NextResponse.json({ ok: true, already });
  } catch (e) {
    console.error("[subscribe] failed", e);
    return NextResponse.json({ ok: false, fallback: "mailto" }, { status: 500 });
  }
}
