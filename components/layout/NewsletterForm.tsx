"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { openMailto } from "@/lib/mailto";

/**
 * Daily AI digest signup.
 * Interim: opens a prefilled email. TODO(phase 4): POST to /api/subscribe →
 * Supabase `subscribers` + `leads` (source = news_digest).
 */
export function NewsletterForm({ className }: { className?: string }) {
  const [state, setState] = useState<"idle" | "done" | "error">("idle");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email")?.toString() ?? "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setState("error");
    openMailto("Subscribe me to the Zaiphr AI digest", `Please add ${email} to the daily AI digest.`);
    setState("done");
  };

  if (state === "done")
    return (
      <p className="label-mono text-signature" role="status">
        ✓ Almost there — send the email that just opened and you&apos;re on the list.
      </p>
    );

  return (
    <form onSubmit={submit} className={cn("flex flex-col gap-2", className)} noValidate>
      <label htmlFor="nl-email" className="sr-only">
        Email address
      </label>
      <div className="flex h-12 items-center rounded-full border border-line-strong bg-surface pl-5 transition-colors focus-within:border-signature">
        <input
          id="nl-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          aria-invalid={state === "error"}
          className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted/70"
        />
        <button
          type="submit"
          className="label-mono mr-1 h-10 shrink-0 rounded-full bg-signature px-4 text-signature-ink transition-shadow hover:shadow-[0_0_30px_-4px_var(--signature-glow)]"
        >
          Subscribe
        </button>
      </div>
      <p className={cn("text-xs", state === "error" ? "text-red-400" : "text-muted")} aria-live="polite">
        {state === "error" ? "Enter a valid email address." : "No spam. Unsubscribe anytime."}
      </p>
    </form>
  );
}
