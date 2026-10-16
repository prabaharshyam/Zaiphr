"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { site } from "@/config/site";
import { submitLead } from "@/lib/submit";

const waLink = (text: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
const card = "mt-3 rounded-2xl border border-line-strong bg-bg/70 p-4";
const btn = "inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium transition-colors";

export function ContactCard({ summary, transcript, conversationId }: { summary: string; transcript: string; conversationId: string }) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const phone = String(f.get("phone") ?? "").trim();
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      setError("Add your name and a valid email.");
      return;
    }
    if (f.get("consent") !== "on") {
      setState("error");
      setError("Please tick the consent box so we can reply.");
      return;
    }
    setState("loading");
    const message = `${summary || "Enquiry from the website chat"}\n\n--- Chat transcript ---\n${transcript}`.slice(0, 5000);
    const r = await submitLead(
      { name, email, phone: phone || undefined, source: "chat", message, inputs: { conversationId }, consent: true },
      { subject: `Enquiry from ${name}`, body: `${summary}\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}` },
    );
    if (r.status === "error") {
      setState("error");
      setError(r.message);
    } else setState("done");
  };

  if (state === "done")
    return (
      <div className={card} role="status">
        <p className="label-mono text-[0.62rem] text-signature">✓ Sent to the team</p>
        <p className="mt-2 text-sm">Thanks! We&apos;ll reply by email within one business day.</p>
      </div>
    );

  return (
    <form onSubmit={submit} className={card} noValidate>
      <p className="label-mono text-[0.62rem] text-signature">Share your details</p>
      {summary && <p className="mt-2 text-xs text-muted">About: {summary}</p>}
      <div className="mt-3 grid gap-2">
        <input name="name" required autoComplete="name" placeholder="Your name" aria-label="Your name" className="h-10 rounded-xl border border-line-strong bg-surface px-3 text-sm outline-none focus:border-signature" />
        <input name="email" type="email" required autoComplete="email" placeholder="Email" aria-label="Email" className="h-10 rounded-xl border border-line-strong bg-surface px-3 text-sm outline-none focus:border-signature" />
        <input name="phone" type="tel" autoComplete="tel" placeholder="WhatsApp number (optional)" aria-label="WhatsApp number (optional)" className="h-10 rounded-xl border border-line-strong bg-surface px-3 text-sm outline-none focus:border-signature" />
      </div>
      <label className="mt-3 flex items-start gap-2 text-xs text-muted">
        <input type="checkbox" name="consent" className="mt-0.5 h-3.5 w-3.5 accent-[var(--signature)]" />
        <span>
          Zaiphr Labs can contact me about this, and receive this chat. <Link href="/legal/privacy" className="underline">Privacy</Link>
        </span>
      </label>
      {state === "error" && <p className="mt-2 text-xs text-red-400" role="alert">{error}</p>}
      <button type="submit" disabled={state === "loading"} className={`${btn} mt-3 w-full bg-signature text-signature-ink disabled:opacity-60`}>
        {state === "loading" ? "Sending…" : "Send to the team"}
      </button>
    </form>
  );
}

export function BookCard() {
  return (
    <div className={card}>
      <p className="label-mono text-[0.62rem] text-signature">Free 30-minute call</p>
      <p className="mt-2 text-sm text-muted">Pick a time that suits you. No prep needed.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <a href={site.calendlyUrl} target="_blank" rel="noopener noreferrer" className={`${btn} bg-signature text-signature-ink`}>
          Book a call ↗
        </a>
        <a href={waLink("Hi Zaiphr Labs! I came from your website chat.")} target="_blank" rel="noopener noreferrer" className={`${btn} border border-line-strong hover:border-text`}>
          WhatsApp
        </a>
      </div>
    </div>
  );
}

export function HumanCard() {
  return (
    <div className={card}>
      <p className="label-mono text-[0.62rem] text-signature">Talk to the team</p>
      <div className="mt-3 grid gap-2">
        <a href={waLink("Hi Zaiphr Labs! I came from your website.")} target="_blank" rel="noopener noreferrer" className={`${btn} bg-signature text-signature-ink`}>
          WhatsApp {site.phone} ↗
        </a>
        <a href={site.calendlyUrl} target="_blank" rel="noopener noreferrer" className={`${btn} border border-line-strong hover:border-text`}>
          Book a free 30-min call ↗
        </a>
        <a href={`mailto:${site.email}`} className={`${btn} border border-line-strong hover:border-text`}>
          {site.email}
        </a>
        <Link href="/contact" className={`${btn} border border-line-strong hover:border-text`}>
          Send a project brief
        </Link>
      </div>
    </div>
  );
}
