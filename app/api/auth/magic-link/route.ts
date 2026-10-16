import { NextResponse } from "next/server";
import { createHash, randomBytes } from "node:crypto";
import { z } from "zod";
import { site } from "@/config/site";
import { attributionSchema } from "@/lib/lead-schema";
import { db } from "@/lib/server/db";
import { button, layout, p, sendEmail } from "@/lib/server/email";
import { env, hasDb, hasEmail } from "@/lib/server/env";
import { ipHash } from "@/lib/server/request";
import { addSubscriber } from "@/lib/server/subscribers";

const schema = z.object({
  email: z.string().trim().toLowerCase().email().max(200),
  next: z.string().max(200).optional(),
  digest: z.boolean().optional(),
  attribution: attributionSchema,
  hp: z.string().max(0).optional(),
});

const TOOL = "auth_link";
const PER_IP_HOUR = 6;
const PER_EMAIL_15MIN = 3;

/** Only same-site relative paths, so the link can't bounce people to another domain. */
const safeNext = (n?: string) => (n && n.startsWith("/") && !n.startsWith("//") && !n.includes("\\") ? n : "/news/saved");

async function count(column: "ip_hash" | "input_hash", value: string, minutes: number) {
  const since = new Date(Date.now() - minutes * 60_000).toISOString();
  const { count } = await db().from("tool_runs").select("id", { count: "exact", head: true }).eq("tool", TOOL).eq(column, value).gte("created_at", since);
  return count ?? 0;
}

async function createLink(email: string) {
  const auth = db().auth.admin;
  let { data, error } = await auth.generateLink({ type: "magiclink", email });
  // Older auth servers only issue magic links to existing users — create the account first.
  if (error && /not found|no user/i.test(error.message)) {
    ({ data, error } = await auth.generateLink({ type: "signup", email, password: randomBytes(24).toString("base64url") }));
  }
  if (error || !data?.properties) throw new Error(error?.message ?? "no link");
  return data.properties;
}

/**
 * Passwordless sign-in. We mint the one-time token with the service role and send our own
 * branded email through Resend, so no Supabase SMTP setup is needed. The token is verified
 * in the browser on /auth/confirm.
 */
export async function POST(req: Request) {
  if (!hasDb() || !env.supabaseAnonKey) return NextResponse.json({ ok: false, error: "Sign-in isn't available yet." }, { status: 503 });
  if (!hasEmail()) return NextResponse.json({ ok: false, error: "Email isn't configured yet." }, { status: 503 });

  const body = await req.json().catch(() => null);
  if ((body as { hp?: string })?.hp) return NextResponse.json({ ok: true });
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 422 });
  const { email, next, digest, attribution } = parsed.data;

  const ip = ipHash(req);
  const emailHash = createHash("sha256").update(`${env.ipSalt}:${email}`).digest("hex");
  if ((await count("ip_hash", ip, 60)) >= PER_IP_HOUR) {
    return NextResponse.json({ ok: false, error: "Too many requests — try again in a little while." }, { status: 429 });
  }
  // Same answer whether or not we send, so this can't be used to probe or spam an inbox.
  if ((await count("input_hash", emailHash, 15)) >= PER_EMAIL_15MIN) return NextResponse.json({ ok: true });
  await db().from("tool_runs").insert({ tool: TOOL, input_hash: emailHash, ip_hash: ip, status: "ok" });

  try {
    const { hashed_token, verification_type } = await createLink(email);
    const link = `${site.url}/auth/confirm?${new URLSearchParams({ token_hash: hashed_token, type: verification_type, next: safeNext(next) })}`;
    const sent = await sendEmail({
      to: email,
      subject: "Your sign-in link for Zaiphr Labs",
      html: layout(
        "Sign in to Zaiphr Labs",
        p("Tap the button below to sign in and save stories from the daily AI brief. The link works once and expires in 1 hour.") +
          button(link, "Sign in") +
          p("If you didn't ask for this, you can ignore this email — nobody can sign in without the link."),
      ),
    });
    if (!sent) throw new Error("email not sent");
    if (digest) await addSubscriber(email, { ip, userAgent: req.headers.get("user-agent"), attribution }).catch((e) => console.error("[magic-link] subscribe", e));
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[magic-link] failed", e);
    return NextResponse.json({ ok: false, error: "Couldn't send the link — please try again." }, { status: 500 });
  }
}
