import "server-only";

/** Server-only configuration. Features degrade gracefully when keys are missing. */
export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  resendKey: process.env.RESEND_API_KEY ?? "",
  emailFrom: process.env.EMAIL_FROM ?? "Zaiphr Labs <shyam@zaiphr.in>",
  leadNotifyEmail: process.env.LEAD_NOTIFY_EMAIL ?? "shyam@zaiphr.in",
  adminPassword: process.env.ADMIN_PASSWORD ?? "",
  ipSalt: process.env.IP_HASH_SALT ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? "zaiphr",
};

export const hasDb = () => Boolean(env.supabaseUrl && env.supabaseServiceKey);
export const hasEmail = () => Boolean(env.resendKey);
