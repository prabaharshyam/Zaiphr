import "server-only";

/** Trims whitespace and stray surrounding quotes from pasted values. */
const clean = (v: string | undefined) => (v ?? "").trim().replace(/^["']|["']$/g, "").trim();

/** Server-only configuration. Features degrade gracefully when keys are missing. */
export const env = {
  supabaseUrl: clean(process.env.NEXT_PUBLIC_SUPABASE_URL).replace(/\/+$/, "").replace(/\/rest\/v1$/, ""),
  supabaseServiceKey: clean(process.env.SUPABASE_SERVICE_ROLE_KEY),
  resendKey: clean(process.env.RESEND_API_KEY),
  emailFrom: clean(process.env.EMAIL_FROM) || "Zaiphr Labs <shyam@zaiphr.in>",
  leadNotifyEmail: clean(process.env.LEAD_NOTIFY_EMAIL) || "shyam@zaiphr.in",
  adminPassword: clean(process.env.ADMIN_PASSWORD),
  anthropicKey: clean(process.env.ANTHROPIC_API_KEY),
  finderEffort: (["low", "medium", "high"].includes(clean(process.env.STACK_FINDER_EFFORT)) ? clean(process.env.STACK_FINDER_EFFORT) : "low") as "low" | "medium" | "high",
  ipSalt: clean(process.env.IP_HASH_SALT) || clean(process.env.SUPABASE_SERVICE_ROLE_KEY) || "zaiphr",
};

export const hasDb = () => Boolean(env.supabaseUrl && env.supabaseServiceKey);
export const hasEmail = () => Boolean(env.resendKey);
