import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/server/db";
import { hasDb } from "@/lib/server/env";

const token = z.string().uuid();

/**
 * One-click unsubscribe (RFC 8058): mail apps POST here from the List-Unsubscribe header,
 * and the /unsubscribe page posts here from its button. GET never changes anything,
 * so link scanners can't unsubscribe people by accident.
 */
export async function POST(req: Request) {
  const url = new URL(req.url);
  const form = await req.formData().catch(() => null);
  const parsed = token.safeParse(url.searchParams.get("token") ?? form?.get("token"));
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid link" }, { status: 400 });
  if (!hasDb()) return NextResponse.json({ ok: false }, { status: 503 });

  const { error } = await db()
    .from("subscribers")
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq("unsubscribe_token", parsed.data)
    .is("unsubscribed_at", null);
  if (error) return NextResponse.json({ ok: false }, { status: 500 });

  // Form posts from our page get a friendly redirect; mail-client one-click gets a plain 200.
  if (form?.get("from") === "page") return NextResponse.redirect(new URL("/unsubscribe?done=1", url), 303);
  return NextResponse.json({ ok: true });
}
