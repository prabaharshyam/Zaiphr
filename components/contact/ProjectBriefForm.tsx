"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef, useState, type ReactNode } from "react";
import { services } from "@/config/services";
import { useCurrency } from "@/lib/currency";
import { submitLead } from "@/lib/submit";
import { cn } from "@/lib/utils";
import { CurrencyToggle } from "@/components/ui/CurrencyToggle";
import { Button } from "@/components/ui/Button";

const budgets = {
  INR: ["Under ₹1L", "₹1L – 3L", "₹3L – 10L", "₹10L – 25L", "₹25L+", "Not sure yet"],
  USD: ["Under $1.2k", "$1.2k – 3.5k", "$3.5k – 12k", "$12k – 30k", "$30k+", "Not sure yet"],
};
const timelines = ["ASAP (this month)", "1–3 months", "3–6 months", "Just exploring"];
const steps = ["Service", "Budget", "Timeline", "Details", "Contact"] as const;

interface Brief {
  services: string[];
  budget: string;
  timeline: string;
  details: string;
  website: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  consent: boolean;
}

const optionCls = (on: boolean) =>
  cn(
    "flex min-h-16 items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-colors",
    on ? "border-signature bg-signature/10" : "border-line-strong hover:border-text",
  );
const inputCls =
  "w-full rounded-xl border border-line-strong bg-surface px-4 py-3.5 text-base outline-none transition-colors placeholder:text-muted/60 focus:border-signature";

function Field({ label, htmlFor, children, hint }: { label: string; htmlFor: string; children: ReactNode; hint?: string }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="label-mono mb-2 block text-muted">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function ProjectBriefForm() {
  const params = useSearchParams();
  const preService = params.get("service");
  const prePackage = params.get("package");
  const preUseCase = params.get("usecase");

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [error, setError] = useState("");
  const [sent, setSent] = useState<null | "saved" | "mailto">(null);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useCurrency();
  const top = useRef<HTMLDivElement>(null);
  const [brief, setBrief] = useState<Brief>(() => ({
    services: preService && services.some((s) => s.slug === preService) ? [services.find((s) => s.slug === preService)!.title] : [],
    budget: "",
    timeline: "",
    details: [prePackage && `Interested in the "${prePackage}" package.`, preUseCase && `Use case: ${preUseCase.replace(/-/g, " ")}.`]
      .filter(Boolean)
      .join(" "),
    website: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    consent: false,
  }));

  const set = <K extends keyof Brief>(k: K, v: Brief[K]) => setBrief((b) => ({ ...b, [k]: v }));

  const validate = (i: number) => {
    if (i === 0 && !brief.services.length) return "Pick at least one service.";
    if (i === 1 && !brief.budget) return "Choose a budget range — a rough guess is fine.";
    if (i === 2 && !brief.timeline) return "When would you like to start?";
    if (i === 3 && brief.details.trim().length < 10) return "A sentence or two about the project helps us prepare.";
    if (i === 4) {
      if (!brief.name.trim()) return "What should we call you?";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(brief.email)) return "Enter a valid email address.";
      if (!brief.consent) return "Please confirm we can contact you about this enquiry.";
    }
    return "";
  };

  const go = (to: number) => {
    if (to > step) {
      const e = validate(step);
      if (e) return setError(e);
    }
    setError("");
    setDir(to > step ? 1 : -1);
    setStep(to);
    top.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  };

  const submit = async () => {
    const e = validate(4);
    if (e) return setError(e);
    const body = [
      `Name: ${brief.name}`,
      `Email: ${brief.email}`,
      `Phone/WhatsApp: ${brief.phone || "-"}`,
      `Company: ${brief.company || "-"}`,
      `Website: ${brief.website || "-"}`,
      `Services: ${brief.services.join(", ")}`,
      `Budget: ${brief.budget}`,
      `Timeline: ${brief.timeline}`,
      "",
      brief.details,
    ].join("\n");
    setLoading(true);
    const r = await submitLead(
      {
        name: brief.name,
        email: brief.email,
        phone: brief.phone,
        company: brief.company,
        website: brief.website,
        services: brief.services,
        budget: brief.budget,
        timeline: brief.timeline,
        message: brief.details,
        inputs: { package: prePackage ?? undefined, useCase: preUseCase ?? undefined },
        source: "contact_form",
        consent: true,
      },
      { subject: `Project brief — ${brief.name}${brief.company ? ` (${brief.company})` : ""}`, body },
    );
    setLoading(false);
    if (r.status === "error") return setError(r.message);
    setSent(r.status);
  };

  if (sent)
    return (
      <div role="status" className="rounded-3xl border border-signature/40 bg-bg-2 p-8 md:p-12">
        <p className="label-mono text-signature">{sent === "saved" ? "Brief received" : "Almost done"}</p>
        <p className="font-display-tight mt-4 text-4xl">
          {sent === "saved" ? "Thank you — we'll be in touch within one business day." : "Your email app should be open — hit send."}
        </p>
        <p className="mt-4 max-w-lg text-muted">
          We reply within one business day. Want to skip the wait? Pick a time for a free 30-minute strategy call below.
        </p>
      </div>
    );

  return (
    <div ref={top} className="scroll-mt-28">
      {/* Progress */}
      <ol className="mb-10 grid grid-cols-5 gap-2" aria-label="Form progress">
        {steps.map((s, i) => (
          <li key={s}>
            <button
              type="button"
              onClick={() => i < step && go(i)}
              disabled={i > step}
              aria-current={i === step ? "step" : undefined}
              className="group w-full text-left disabled:cursor-default"
            >
              <span className="block h-0.5 overflow-hidden rounded-full bg-line">
                <span
                  className="block h-full origin-left bg-signature transition-transform duration-700 ease-[var(--ease-out)]"
                  style={{ transform: `scaleX(${i <= step ? 1 : 0})` }}
                />
              </span>
              <span className={cn("label-mono mt-2 hidden text-[0.6rem] sm:block", i === step ? "text-text" : "text-muted")}>
                0{i + 1} {s}
              </span>
            </button>
          </li>
        ))}
      </ol>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (step < 4) go(step + 1);
          else submit();
        }}
        noValidate
      >
        <div className="relative min-h-[26rem] overflow-hidden">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.fieldset
              key={step}
              custom={dir}
              initial={{ opacity: 0, x: 60 * dir }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 * dir }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {step === 0 && (
                <>
                  <legend className="font-display-tight text-[clamp(1.8rem,3.4vw,3rem)]">What can we build for you?</legend>
                  <p className="mt-2 text-muted">Pick all that apply.</p>
                  <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {services.map((s) => {
                      const on = brief.services.includes(s.title);
                      return (
                        <button
                          key={s.slug}
                          type="button"
                          aria-pressed={on}
                          onClick={() => set("services", on ? brief.services.filter((x) => x !== s.title) : [...brief.services, s.title])}
                          className={optionCls(on)}
                        >
                          <span>
                            <span className="label-mono block text-[0.6rem] text-muted">{s.index}</span>
                            <span className="mt-1 block font-medium">{s.title}</span>
                          </span>
                          <span
                            aria-hidden
                            className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs", on ? "border-signature bg-signature text-signature-ink" : "border-line-strong")}
                          >
                            {on ? "✓" : ""}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <legend className="font-display-tight text-[clamp(1.8rem,3.4vw,3rem)]">What&apos;s your budget?</legend>
                      <p className="mt-2 text-muted">A rough range helps us suggest the right scope.</p>
                    </div>
                    <CurrencyToggle value={currency} onChange={setCurrency} />
                  </div>
                  <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {budgets[currency].map((b) => (
                      <button key={b} type="button" role="radio" aria-checked={brief.budget === b} onClick={() => set("budget", b)} className={optionCls(brief.budget === b)}>
                        <span className="font-medium">{b}</span>
                        <span aria-hidden className={cn("h-3 w-3 rounded-full border", brief.budget === b ? "border-signature bg-signature" : "border-line-strong")} />
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <legend className="font-display-tight text-[clamp(1.8rem,3.4vw,3rem)]">When do you want to start?</legend>
                  <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {timelines.map((t) => (
                      <button key={t} type="button" role="radio" aria-checked={brief.timeline === t} onClick={() => set("timeline", t)} className={optionCls(brief.timeline === t)}>
                        <span className="font-medium">{t}</span>
                        <span aria-hidden className={cn("h-3 w-3 rounded-full border", brief.timeline === t ? "border-signature bg-signature" : "border-line-strong")} />
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <legend className="font-display-tight text-[clamp(1.8rem,3.4vw,3rem)]">Tell us about the project.</legend>
                  <p className="mt-2 text-muted">Goals, current tools, what success looks like — whatever you know so far.</p>
                  <div className="mt-8 space-y-5">
                    <Field label="Project details" htmlFor="b-details">
                      <textarea id="b-details" rows={6} value={brief.details} onChange={(e) => set("details", e.target.value)} className={cn(inputCls, "resize-none")} placeholder="We want to stop missing calls at our 3 clinics and…" />
                    </Field>
                    <Field label="Current website (optional)" htmlFor="b-site">
                      <input id="b-site" value={brief.website} onChange={(e) => set("website", e.target.value)} inputMode="url" autoComplete="url" className={inputCls} placeholder="yourbrand.com" />
                    </Field>
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <legend className="font-display-tight text-[clamp(1.8rem,3.4vw,3rem)]">Where should we reply?</legend>
                  <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Name" htmlFor="b-name">
                      <input id="b-name" value={brief.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" className={inputCls} />
                    </Field>
                    <Field label="Work email" htmlFor="b-email">
                      <input id="b-email" type="email" value={brief.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" className={inputCls} />
                    </Field>
                    <Field label="Phone / WhatsApp (optional)" htmlFor="b-phone">
                      <input id="b-phone" type="tel" value={brief.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" className={inputCls} placeholder="+91" />
                    </Field>
                    <Field label="Company (optional)" htmlFor="b-company">
                      <input id="b-company" value={brief.company} onChange={(e) => set("company", e.target.value)} autoComplete="organization" className={inputCls} />
                    </Field>
                  </div>
                  <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-muted">
                    <input type="checkbox" checked={brief.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-0.5 h-4 w-4 accent-[var(--signature)]" />
                    <span>
                      I agree that Zaiphr Labs may contact me about this enquiry. We use your details only to respond — see our{" "}
                      <Link href="/legal/privacy" target="_blank" className="text-text underline underline-offset-4">
                        privacy policy
                      </Link>
                      .
                    </span>
                  </label>
                </>
              )}
            </motion.fieldset>
          </AnimatePresence>
        </div>

        <p className="mt-6 min-h-6 text-sm text-red-400" role="alert" aria-live="assertive">
          {error}
        </p>
        <div className="mt-4 flex items-center justify-between gap-4 border-t border-line pt-6">
          <button
            type="button"
            onClick={() => go(step - 1)}
            className={cn("label-mono text-muted transition-colors hover:text-text", step === 0 && "invisible")}
          >
            ← Back
          </button>
          <Button type="submit" size="lg" magnetic={false} disabled={loading}>
            {step < 4 ? "Continue" : loading ? "Sending…" : "Send brief"}
          </Button>
        </div>
      </form>
    </div>
  );
}
