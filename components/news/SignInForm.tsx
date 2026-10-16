"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { requestMagicLink } from "@/lib/news/account";
import { cn } from "@/lib/utils";

/** Email-only sign-in: we send a one-time link, no password. */
export function SignInForm({ next, className, autoFocus }: { next?: string; className?: string; autoFocus?: boolean }) {
  const [state, setState] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const value = String(form.get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setState("error");
      setMessage("Enter a valid email address.");
      return;
    }
    setEmail(value);
    setState("loading");
    const r = await requestMagicLink(value, { digest: form.get("digest") === "on", next });
    if (r.ok) setState("sent");
    else {
      setState("error");
      setMessage(r.error);
    }
  };

  if (state === "sent")
    return (
      <div className={className} role="status">
        <p className="label-mono text-signature">✓ Check your inbox</p>
        <p className="mt-3 text-lg leading-relaxed">
          We sent a sign-in link to <span className="font-medium">{email}</span>. Open it on this device to continue.
        </p>
        <p className="mt-3 text-sm text-muted">
          Nothing after a minute? Check spam, or{" "}
          <button type="button" onClick={() => setState("idle")} className="underline underline-offset-4 hover:text-text">
            try again
          </button>
          .
        </p>
      </div>
    );

  return (
    <form onSubmit={submit} className={cn("flex flex-col gap-4", className)} noValidate>
      <div>
        <label htmlFor="signin-email" className="label-mono mb-2 block text-muted">
          Email
        </label>
        <input
          id="signin-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          autoFocus={autoFocus}
          placeholder="you@company.com"
          aria-invalid={state === "error"}
          aria-describedby="signin-msg"
          className="h-13 w-full rounded-2xl border border-line-strong bg-surface px-5 text-base outline-none transition-colors placeholder:text-muted/50 focus:border-signature"
        />
      </div>
      <label className="flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" name="digest" className="mt-0.5 h-4 w-4 accent-[var(--signature)]" />
        <span>Also email me the daily AI Digest (unsubscribe anytime).</span>
      </label>
      <button
        type="submit"
        disabled={state === "loading"}
        className="h-12 rounded-full bg-signature px-6 text-sm font-medium text-signature-ink transition-shadow hover:shadow-[0_0_40px_-6px_var(--signature-glow)] disabled:opacity-60"
      >
        {state === "loading" ? "Sending…" : "Email me a sign-in link"}
      </button>
      <p id="signin-msg" className="text-xs leading-relaxed text-muted" aria-live="polite">
        {state === "error" ? (
          <span className="text-sm text-red-400">{message}</span>
        ) : (
          <>
            No password needed. We only use your email to sign you in
            . See our <Link href="/legal/privacy" className="underline underline-offset-2 hover:text-text">privacy policy</Link>.
          </>
        )}
      </p>
    </form>
  );
}
