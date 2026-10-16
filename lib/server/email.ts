import "server-only";
import { env, hasEmail } from "./env";
import { site } from "@/config/site";

interface Mail {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
  headers?: Record<string, string>;
}

const API = () => process.env.RESEND_API_URL ?? "https://api.resend.com/emails";
const payload = (m: Mail) => ({ from: env.emailFrom, to: m.to, subject: m.subject, html: m.html, reply_to: m.replyTo, headers: m.headers });

/** Sends via the Resend REST API. Returns false (never throws) so email can't break lead capture. */
export async function sendEmail(mail: Mail) {
  if (!hasEmail()) return false;
  try {
    const res = await fetch(API(), {
      method: "POST",
      headers: { Authorization: `Bearer ${env.resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload(mail)),
    });
    if (!res.ok) console.error("[email] resend error", res.status, await res.text());
    return res.ok;
  } catch (e) {
    console.error("[email] failed", e);
    return false;
  }
}

/** Resend batch API: up to 100 distinct emails per request. Returns how many were accepted. */
export async function sendBatch(mails: Mail[]) {
  if (!hasEmail() || !mails.length) return { sent: 0, failed: mails.length };
  let sent = 0;
  for (let i = 0; i < mails.length; i += 100) {
    const chunk = mails.slice(i, i + 100);
    try {
      const res = await fetch(`${API()}/batch`, {
        method: "POST",
        headers: { Authorization: `Bearer ${env.resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify(chunk.map(payload)),
      });
      if (res.ok) sent += chunk.length;
      else console.error("[email] batch error", res.status, await res.text());
    } catch (e) {
      console.error("[email] batch failed", e);
    }
  }
  return { sent, failed: mails.length - sent };
}

const esc = (s: unknown) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Branded, email-client-safe layout (tables + inline styles). */
export function layout(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#05060A;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#EDEEF2">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#05060A;padding:32px 16px"><tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#0A0C12;border:1px solid #1d2029;border-radius:16px">
<tr><td style="padding:28px 32px;border-bottom:1px solid #1d2029">
<span style="font-weight:800;letter-spacing:.04em;font-size:16px">ZAIPHR</span><span style="color:#8A90A2;font-size:11px;letter-spacing:.14em"> LABS</span>
<span style="display:inline-block;width:6px;height:6px;background:#C8FF2E;margin-left:6px;vertical-align:top"></span></td></tr>
<tr><td style="padding:32px">
<h1 style="margin:0 0 18px;font-size:24px;line-height:1.2;letter-spacing:-.02em">${esc(title)}</h1>
${body}
</td></tr>
<tr><td style="padding:20px 32px;border-top:1px solid #1d2029;color:#8A90A2;font-size:12px">
${esc(site.name)} · ${esc(site.location)} · <a href="${site.url}" style="color:#C8FF2E">${site.url.replace(/^https?:\/\//, "")}</a>
</td></tr></table></td></tr></table></body></html>`;
}

export const p = (text: string) => `<p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#C9CCD6">${esc(text)}</p>`;
export const button = (href: string, label: string) =>
  `<a href="${esc(href)}" style="display:inline-block;margin:8px 0 6px;background:#C8FF2E;color:#0A0D02;text-decoration:none;font-weight:600;font-size:14px;padding:12px 22px;border-radius:999px">${esc(label)}</a>`;
export const rows = (data: Record<string, unknown>) =>
  `<table width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 18px;font-size:14px">${Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && !v.length))
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px 8px 0;color:#8A90A2;vertical-align:top;white-space:nowrap;border-bottom:1px solid #1d2029">${esc(k)}</td><td style="padding:8px 0;border-bottom:1px solid #1d2029;color:#EDEEF2">${esc(Array.isArray(v) ? v.join(", ") : v).replace(/\n/g, "<br/>")}</td></tr>`,
    )
    .join("")}</table>`;
export { esc };
