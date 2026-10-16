import "server-only";
import { db } from "./db";
import { env, hasDb } from "./env";
import { button, layout, p, rows, sendEmail } from "./email";
import type { Lead } from "@/lib/lead-schema";
import { site } from "@/config/site";

/** "Dr. Meera Iyer" → "Meera"; falls back to the full name. */
const firstName = (name: string) =>
  name.replace(/^(dr|mr|mrs|ms|miss|prof|sir|shri|smt)\.?\s+/i, "").trim().split(/\s+/)[0] || name;

const SOURCE_LABEL: Record<Lead["source"], string> = {
  contact_form: "Project brief",
  quick_brief: "Homepage brief",
  tool: "Free tool",
  news_digest: "AI digest signup",
  chat: "Chat assistant",
};

/** Max leads per IP hash per hour (cheap abuse guard; tools have their own limits). */
const PER_HOUR = 8;

export async function isRateLimited(ip: string) {
  if (!hasDb()) return false;
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await db().from("leads").select("id", { count: "exact", head: true }).eq("ip_hash", ip).gte("created_at", since);
  return (count ?? 0) >= PER_HOUR;
}

export async function saveLead(lead: Lead, meta: { ip: string; userAgent: string | null }) {
  const a = lead.attribution ?? {};
  const { data, error } = await db()
    .from("leads")
    .insert({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      website: lead.website,
      source: lead.source,
      tool: lead.tool,
      services: lead.services,
      budget: lead.budget,
      timeline: lead.timeline,
      message: lead.message,
      inputs: lead.inputs,
      report: lead.report,
      consent: lead.consent,
      utm_source: a.utm_source,
      utm_medium: a.utm_medium,
      utm_campaign: a.utm_campaign,
      utm_term: a.utm_term,
      utm_content: a.utm_content,
      referrer: a.referrer,
      landing_page: a.landing,
      ip_hash: meta.ip,
      user_agent: meta.userAgent?.slice(0, 300),
    })
    .select("id")
    .single();
  if (error) throw error;
  return data.id as string;
}

/** Notification to the team + confirmation to the lead. Failures are logged, never thrown. */
export async function notifyLead(lead: Lead, id: string, extra?: { confirmSubject?: string; confirmHtml?: string }) {
  const label = SOURCE_LABEL[lead.source];
  const a = lead.attribution ?? {};
  const team = sendEmail({
    to: env.leadNotifyEmail,
    replyTo: lead.email,
    subject: `New lead · ${label} · ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
    html: layout(`New lead: ${lead.name}`, [
      p(`${label}${lead.tool ? ` — ${lead.tool}` : ""}. Reply to this email to respond directly.`),
      rows({
        Name: lead.name,
        Email: lead.email,
        "Phone / WhatsApp": lead.phone,
        Company: lead.company,
        Website: lead.website,
        Services: lead.services,
        Budget: lead.budget,
        Timeline: lead.timeline,
        Message: lead.message,
        Source: [a.utm_source, a.utm_medium, a.utm_campaign].filter(Boolean).join(" / ") || a.referrer || "direct",
        "Landing page": a.landing,
      }),
      button(`${site.url}/admin?lead=${id}`, "Open in admin"),
    ].join("")),
  });

  const user =
    lead.source === "news_digest"
      ? Promise.resolve(true)
      : sendEmail({
          to: lead.email,
          replyTo: env.leadNotifyEmail,
          subject: extra?.confirmSubject ?? "We've got your brief — Zaiphr Labs",
          html:
            extra?.confirmHtml ??
            layout(`Thanks, ${firstName(lead.name)} — we're on it.`, [
              p("Your brief landed safely with the Zaiphr Labs team. We reply to every enquiry within one business day with honest thoughts — even if we're not the right fit."),
              p("Want to move faster? Grab a slot for a free 30-minute strategy call:"),
              button(site.calendlyUrl, "Book a strategy call"),
              p(`Or just reply to this email, or WhatsApp us on ${site.phone}.`),
            ].join("")),
        });

  await Promise.allSettled([team, user]);
}
