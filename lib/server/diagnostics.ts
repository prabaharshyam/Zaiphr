import "server-only";
import { env, hasDb, hasEmail } from "./env";
import { db } from "./db";

export interface Check {
  label: string;
  ok: boolean;
  detail: string;
}

/** Admin-only health checks. Never returns secret values — only whether they look right. */
export async function runDiagnostics(): Promise<Check[]> {
  const checks: Check[] = [];
  const url = env.supabaseUrl;
  checks.push({
    label: "NEXT_PUBLIC_SUPABASE_URL",
    ok: /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/.test(url),
    detail: !url
      ? "Missing"
      : url.includes("supabase.com/dashboard")
        ? "This is the dashboard link — use Project Settings → API → Project URL (https://xxxx.supabase.co)"
        : /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/.test(url)
          ? url
          : `Unexpected format: ${url.slice(0, 40)}… (expected https://xxxx.supabase.co)`,
  });

  const key = env.supabaseServiceKey;
  let keyRole = "missing";
  if (key.startsWith("sb_secret_")) keyRole = "secret key ✓";
  else if (key.startsWith("sb_publishable_")) keyRole = "publishable (anon) key — wrong one";
  else if (key.split(".").length === 3) {
    try {
      const payload = JSON.parse(Buffer.from(key.split(".")[1], "base64url").toString());
      keyRole = payload.role === "service_role" ? "service_role key ✓" : `"${payload.role}" key — wrong one, use service_role`;
    } catch {
      keyRole = "unreadable key";
    }
  } else if (key) keyRole = "unrecognised format";
  checks.push({ label: "SUPABASE_SERVICE_ROLE_KEY", ok: keyRole.endsWith("✓"), detail: keyRole });

  if (hasDb()) {
    try {
      const { error, count } = await db().from("leads").select("id", { count: "exact", head: true });
      checks.push({
        label: "Database connection",
        ok: !error,
        detail: error
          ? `${error.code ?? ""} ${error.message}${error.code === "42P01" || /relation .* does not exist|schema cache/i.test(error.message) ? " — run supabase/migrations/0001_init.sql" : ""}`
          : `Connected · ${count ?? 0} leads`,
      });
    } catch (e) {
      checks.push({ label: "Database connection", ok: false, detail: e instanceof Error ? e.message : String(e) });
    }
  }

  checks.push({
    label: "RESEND_API_KEY",
    ok: hasEmail() && env.resendKey.startsWith("re_"),
    detail: !hasEmail() ? "Missing — emails won't send" : env.resendKey.startsWith("re_") ? "Set ✓" : "Should start with re_",
  });
  checks.push({ label: "EMAIL_FROM", ok: /@zaiphr\.in>?$/.test(env.emailFrom), detail: env.emailFrom });
  checks.push({ label: "LEAD_NOTIFY_EMAIL", ok: !!env.leadNotifyEmail, detail: env.leadNotifyEmail });
  return checks;
}
