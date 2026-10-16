"use client";

import { useState, type FormEvent } from "react";
import { services } from "@/config/services";
import { site } from "@/config/site";
import { submitLead } from "@/lib/submit";
import { cn } from "@/lib/utils";
import { RevealText } from "@/components/ui/RevealText";
import { Button } from "@/components/ui/Button";

const budgets = ["< ₹1L / $1.2k", "₹1–3L / $1.2–3.5k", "₹3–10L / $3.5–12k", "₹10L+ / $12k+", "Not sure yet"];

const field =
  "peer w-full rounded-none border-0 border-b border-line-strong bg-transparent pt-6 pb-2 text-base outline-none transition-colors placeholder:text-transparent focus:border-signature";
const floating =
  "label-mono pointer-events-none absolute top-0 left-0 text-[0.62rem] text-muted transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-focus:top-0 peer-focus:text-[0.62rem] peer-focus:tracking-[0.14em] peer-focus:uppercase peer-focus:text-signature";

/**
 * Closing CTA + quick brief. Interim: sends via the visitor's email client.
 * TODO(phase 4): POST to /api/leads (Supabase + Resend notifications).
 */
export function BigCta() {
  const [service, setService] = useState<string[]>([]);
  const [sent, setSent] = useState<null | "saved" | "mailto">(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toggle = (s: string) => setService((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please add your name and a valid email.");
      return;
    }
    setError("");
    if (!f.get("consent")) {
      setError("Please confirm we can contact you about this enquiry.");
      return;
    }
    const company = String(f.get("company") || "");
    const budget = String(f.get("budget") || "");
    const message = String(f.get("message") || "");
    const body = [`Name: ${name}`, `Email: ${email}`, `Company: ${company || "-"}`, `Services: ${service.join(", ") || "-"}`, `Budget: ${budget || "-"}`, "", message].join("\n");
    setLoading(true);
    const r = await submitLead(
      { name, email, company, services: service, budget, message, source: "quick_brief", consent: true, hp: String(f.get("hp") || "") },
      { subject: `Project brief: ${name}`, body },
    );
    setLoading(false);
    if (r.status === "error") return setError(r.message);
    setSent(r.status);
  };

  return (
    <section aria-labelledby="cta-heading" className="relative z-10 overflow-hidden border-t border-line bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-1/3 left-1/2 h-[60vw] w-[90vw] -translate-x-1/2 rounded-full bg-signature/[0.08] blur-[160px]"
      />
      <div className="container-x relative py-28 md:py-40">
        <RevealText id="cta-heading" as="h2" split="chars" className="font-display-wide text-[length:var(--text-giga)]">
          
            Let&apos;s build your <span className="text-signature">unfair</span> advantage.
          
        </RevealText>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:mt-24 lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-4">
            <p className="text-lg leading-relaxed text-muted">
              Tell us what you&apos;re building. We reply within one business day with honest thoughts, even if we&apos;re
              not the right fit.
            </p>
            <div className="flex flex-col items-start gap-3">
              <Button href={site.calendlyUrl} variant="ghost">
                Book a 30-min strategy call
              </Button>
              <a
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi Zaiphr Labs, I'd like to discuss a project.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="label-mono mt-2 text-muted transition-colors hover:text-signature"
              >
                Or WhatsApp us →
              </a>
            </div>
          </div>

          {sent ? (
            <div className="lg:col-span-8" role="status">
              <p className="font-display-tight text-4xl">
                {sent === "saved" ? "Brief received. Talk soon." : "Thank you. Your email app should be open."}
              </p>
              <p className="mt-4 text-muted">
                {sent === "saved"
                  ? "We've emailed you a confirmation and will reply within one business day. Questions? Write to "
                  : "Hit send and we'll be in touch within one business day. Nothing opened? Write to "}
                <a className="text-signature underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:col-span-8">
              <fieldset className="sm:col-span-2">
                <legend className="label-mono mb-4 text-muted">I&apos;m interested in</legend>
                <div className="flex flex-wrap gap-2">
                  {services.map((s) => {
                    const on = service.includes(s.title);
                    return (
                      <button
                        key={s.slug}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggle(s.title)}
                        className={cn(
                          "rounded-full border px-4 py-2 text-sm transition-colors",
                          on ? "border-signature bg-signature text-signature-ink" : "border-line-strong hover:border-text",
                        )}
                      >
                        {s.title}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
              {[
                ["name", "Your name", "text", "name"],
                ["email", "Work email", "email", "email"],
                ["company", "Company / website", "text", "organization"],
              ].map(([n, l, t, ac]) => (
                <div key={n} className="relative">
                  <input id={`cta-${n}`} name={n} type={t} autoComplete={ac} placeholder={l} className={field} required={n !== "company"} />
                  <label htmlFor={`cta-${n}`} className={floating}>
                    {l}
                  </label>
                </div>
              ))}
              <div className="relative">
                <select id="cta-budget" name="budget" defaultValue="" className={cn(field, "appearance-none text-text")}>
                  <option value="" disabled>
                    Select a range
                  </option>
                  {budgets.map((b) => (
                    <option key={b} value={b} className="bg-bg-2">
                      {b}
                    </option>
                  ))}
                </select>
                <label htmlFor="cta-budget" className="label-mono absolute top-0 left-0 text-[0.62rem] text-muted">
                  Budget
                </label>
              </div>
              <div className="relative sm:col-span-2">
                <textarea id="cta-message" name="message" rows={3} placeholder="What are you building?" className={cn(field, "resize-none")} />
                <label htmlFor="cta-message" className={floating}>
                  What are you building?
                </label>
              </div>
              <input type="text" name="hp" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
              <label className="flex cursor-pointer items-start gap-3 text-sm text-muted sm:col-span-2">
                <input type="checkbox" name="consent" className="mt-0.5 h-4 w-4 accent-[var(--signature)]" />
                <span>I agree that Zaiphr Labs may contact me about this enquiry.</span>
              </label>
              <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted" aria-live="polite">
                  {error ? <span className="text-red-400">{error}</span> : "We only use your details to reply to you."}
                </p>
                <Button type="submit" size="lg" disabled={loading}>
                  {loading ? "Sending…" : "Send brief"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
