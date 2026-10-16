"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { subscribe } from "@/lib/submit";

/** Daily AI digest signup → /api/subscribe (falls back to email if the backend is down). */
export function NewsletterForm({ className }: { className?: string }) {
  const [state, setState] = useState<"idle" | "loading" | "saved" | "mailto" | "error">("idle");
  const [message, setMessage] = useState("");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email")?.toString().trim() ?? "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      setMessage("Enter a valid email address.");
      return;
    }
    setState("loading");
    const r = await subscribe(email);
    if (r.status === "error") {
      setState("error");
      setMessage(r.message);
    } else setState(r.status);
  };

  if (state === "saved" || state === "mailto")
    return (
      <p className="label-mono text-signature" role="status">
        {state === "saved"
          ? "✓ You're on the list. The digest lands every morning."
          : "✓ Almost there — send the email that just opened and you're on the list."}
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
          disabled={state === "loading"}
          className="label-mono mr-1 h-10 shrink-0 rounded-full bg-signature px-4 text-signature-ink transition-shadow hover:shadow-[0_0_30px_-4px_var(--signature-glow)] disabled:opacity-60"
        >
          {state === "loading" ? "…" : "Subscribe"}
        </button>
      </div>
      <p className={cn("text-xs", state === "error" ? "text-red-400" : "text-muted")} aria-live="polite">
        {state === "error" ? message : "No spam. Unsubscribe anytime."}
      </p>
    </form>
  );
}
