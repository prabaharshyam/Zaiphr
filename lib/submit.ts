"use client";

import type { LeadInput } from "@/lib/lead-schema";
import { getAttribution } from "@/lib/utm";
import { openMailto } from "@/lib/mailto";

export type SubmitResult = { status: "saved" } | { status: "mailto" } | { status: "error"; message: string };

async function post(url: string, body: unknown): Promise<Response | null> {
  try {
    return await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  } catch {
    return null;
  }
}

function attribution() {
  const a = getAttribution();
  if (!a) return undefined;
  const { ts: _ts, ...rest } = a;
  void _ts;
  return rest;
}

/**
 * Saves a lead via /api/leads. If the backend isn't configured or is down,
 * falls back to a prefilled email so the enquiry is never lost.
 */
export async function submitLead(
  lead: Omit<LeadInput, "attribution">,
  mailto: { subject: string; body: string },
): Promise<SubmitResult> {
  const res = await post("/api/leads", { ...lead, attribution: attribution() });
  if (res?.ok) return { status: "saved" };
  if (res && (res.status === 422 || res.status === 429)) {
    const data = await res.json().catch(() => ({}));
    return { status: "error", message: data.error ?? "Please check the form and try again." };
  }
  openMailto(mailto.subject, mailto.body);
  return { status: "mailto" };
}

export async function subscribe(email: string): Promise<SubmitResult> {
  const res = await post("/api/subscribe", { email, attribution: attribution() });
  if (res?.ok) return { status: "saved" };
  if (res && (res.status === 422 || res.status === 429)) {
    const data = await res.json().catch(() => ({}));
    return { status: "error", message: data.error ?? "Enter a valid email address." };
  }
  openMailto("Subscribe me to the Zaiphr AI digest", `Please add ${email} to the daily AI digest.`);
  return { status: "mailto" };
}
