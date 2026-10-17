import "server-only";
import { site } from "@/config/site";
import { formatBriefDate, NEWS_CATEGORIES, type NewsItem } from "@/lib/news/types";
import { db } from "../db";
import { hasEmail } from "../env";
import { esc, sendBatch } from "../email";

const unsubscribeUrl = (token: string) => `${site.url}/unsubscribe?token=${token}`;
const oneClickUrl = (token: string) => `${site.url}/api/unsubscribe?token=${token}`;

/** Email-client-safe digest (tables + inline styles), matching the site's dark brand. */
export function digestHtml(briefDate: string, items: NewsItem[], token: string) {
  const story = (n: NewsItem, i: number) => `
<tr><td style="padding:22px 0;border-top:1px solid #1d2029">
  <p style="margin:0 0 8px;font-family:Menlo,Consolas,monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#8A90A2">
    <span style="color:#C8FF2E">${String(i + 1).padStart(2, "0")}</span> · ${esc(NEWS_CATEGORIES[n.category])}</p>
  <a href="${site.url}/news#${esc(n.slug)}" style="color:#EDEEF2;text-decoration:none;font-size:19px;line-height:1.3;font-weight:700;letter-spacing:-.01em">${esc(n.headline)}</a>
  <p style="margin:10px 0 0;font-size:15px;line-height:1.6;color:#C9CCD6">${esc(n.summary)}</p>
  ${n.whyItMatters ? `<p style="margin:12px 0 0;padding:10px 14px;border-left:2px solid #C8FF2E;background:#0f1208;font-size:14px;line-height:1.55;color:#EDEEF2"><b style="color:#C8FF2E">Why it matters:</b> ${esc(n.whyItMatters)}</p>` : ""}
  <p style="margin:12px 0 0;font-size:13px;color:#8A90A2">${n.sources.map((s) => `<a href="${esc(s.url)}" style="color:#8A90A2">${esc(s.name)} ↗</a>`).join(" &nbsp;·&nbsp; ")}</p>
</td></tr>`;

  return `<!doctype html><html><body style="margin:0;background:#05060A;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#EDEEF2">
<div style="display:none;max-height:0;overflow:hidden">${esc(items[0]?.headline ?? "")}, and ${Math.max(0, items.length - 1)} more stories</div>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#05060A;padding:32px 16px"><tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#0A0C12;border:1px solid #1d2029;border-radius:16px">
<tr><td style="padding:26px 32px;border-bottom:1px solid #1d2029">
  <img src="${site.url}/brand/zaiphr-email-header.png" width="187" height="20" alt="Zaiphr Labs" style="display:block;border:0;height:20px;width:187px"></td></tr>
<tr><td style="padding:30px 32px 8px">
  <p style="margin:0;font-family:Menlo,Consolas,monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#8A90A2">The AI Digest · ${esc(formatBriefDate(briefDate))}</p>
  <h1 style="margin:10px 0 6px;font-size:30px;line-height:1.1;letter-spacing:-.02em">Today in AI.</h1>
  <p style="margin:0 0 6px;font-size:15px;color:#C9CCD6">${items.length} stories that matter for founders, in about 3 minutes.</p>
</td></tr>
<tr><td style="padding:0 32px"><table width="100%" cellpadding="0" cellspacing="0">${items.map(story).join("")}</table></td></tr>
<tr><td style="padding:22px 32px 30px;border-top:1px solid #1d2029">
  <a href="${site.url}/news" style="display:inline-block;background:#C8FF2E;color:#0A0D02;text-decoration:none;font-weight:600;font-size:14px;padding:12px 22px;border-radius:999px">Read on the web</a>
  <p style="margin:18px 0 0;font-size:14px;line-height:1.6;color:#C9CCD6">Want AI working in your business, not just in the news? <a href="${site.url}/tools/ai-stack-finder" style="color:#C8FF2E">Find your AI stack</a> or <a href="${site.url}/contact" style="color:#C8FF2E">talk to us</a>.</p>
</td></tr>
<tr><td style="padding:18px 32px;border-top:1px solid #1d2029;color:#8A90A2;font-size:12px;line-height:1.6">
  Summaries are based on the linked sources and may be AI-assisted. Check the original before acting on anything important.<br/>
  You're receiving this because you subscribed at ${esc(site.url.replace(/^https?:\/\//, ""))}. <a href="${unsubscribeUrl(token)}" style="color:#8A90A2">Unsubscribe</a>
</td></tr></table></td></tr></table></body></html>`;
}

/** Sends today's digest to every active subscriber - at most once per brief date. */
export async function sendDigest(briefDate: string, items: NewsItem[]) {
  if (!hasEmail()) return { sent: 0, failed: 0, skipped: "email not configured" };
  if (!items.length) return { sent: 0, failed: 0, skipped: "no stories" };

  const { data: runs } = await db().from("news_runs").select("stats").eq("stats->>briefDate", briefDate);
  if ((runs ?? []).some((r) => (r.stats as { digest?: { sent?: number } } | null)?.digest?.sent)) {
    return { sent: 0, failed: 0, skipped: "already sent today" };
  }

  const { data: subs, error } = await db().from("subscribers").select("email, unsubscribe_token").is("unsubscribed_at", null);
  if (error) throw new Error(`subscribers: ${error.message}`);
  if (!subs?.length) return { sent: 0, failed: 0, skipped: "no subscribers" };

  const top = items.slice(0, 10);
  const subject = `Today in AI: ${top[0].headline}`.slice(0, 120);
  return sendBatch(
    subs.map((s) => ({
      to: s.email,
      subject,
      html: digestHtml(briefDate, top, s.unsubscribe_token),
      headers: {
        "List-Unsubscribe": `<${oneClickUrl(s.unsubscribe_token)}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    })),
  );
}
