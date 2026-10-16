import "server-only";
import type { z } from "zod";
import type { attributionSchema } from "@/lib/lead-schema";
import { db } from "./db";
import { notifyLead, saveLead } from "./leads";

/**
 * Adds (or re-activates) a digest subscriber. New subscribers are also saved as a lead
 * (source = news_digest) and trigger the usual notification.
 */
export async function addSubscriber(
  email: string,
  meta: { ip: string; userAgent: string | null; attribution?: z.infer<typeof attributionSchema> },
) {
  const { data: existing } = await db().from("subscribers").select("id, unsubscribed_at").ilike("email", email).maybeSingle();
  if (existing) {
    if (existing.unsubscribed_at) await db().from("subscribers").update({ unsubscribed_at: null }).eq("id", existing.id);
    return { already: !existing.unsubscribed_at };
  }
  await db().from("subscribers").insert({ email, source: "news_digest" });
  const lead = { name: email.split("@")[0], email, source: "news_digest" as const, consent: true as const, attribution: meta.attribution };
  const id = await saveLead(lead, { ip: meta.ip, userAgent: meta.userAgent });
  await notifyLead(lead, id);
  return { already: false };
}
