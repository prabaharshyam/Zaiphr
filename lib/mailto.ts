import { site } from "@/config/site";

/**
 * Interim lead capture until Supabase + Resend are wired (Phase 4):
 * opens the visitor's email client with their details prefilled.
 */
export function openMailto(subject: string, body: string) {
  const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = href;
}
