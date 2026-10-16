"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";
import { GlassCard } from "@/components/ui/GlassCard";
import { Magnetic } from "@/components/ui/Magnetic";
import { getTool, pricingLabel } from "@/config/ai-tools";
import { finderExamples } from "@/config/finder-examples";

/** Illustrative stack for the first example problem — not a live result. */
const sample = [
  { id: "bolna", role: "Answers every missed call" },
  { id: "zoho-bookings", role: "Books the slot" },
  { id: "wati", role: "Sends WhatsApp reminders" },
];

/** Homepage preview of the AI Stack Finder: describe a problem, jump into the tool. */
export function ToolsTeaser() {
  const router = useRouter();
  const [problem, setProblem] = useState("");
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const v = problem.trim();
    if (v.length < 15) return setError("Tell us a little more — one or two sentences is perfect.");
    setError("");
    router.push(`/tools/ai-stack-finder?q=${encodeURIComponent(v)}`);
  };

  return (
    <section aria-labelledby="tools-heading" className="relative z-10 overflow-hidden bg-bg py-28 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-0 h-[50vw] w-[50vw] -translate-y-1/2 translate-x-1/3 rounded-full bg-signature/10 blur-[140px]"
      />
      <div className="container-x relative grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Eyebrow index="04">Free tool</Eyebrow>
          <RevealText as="h2" className="font-display-tight mt-5 text-[length:var(--text-display)]">
            <span id="tools-heading">Tell us the problem. Get your AI stack.</span>
          </RevealText>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            There are thousands of AI tools and no time to test them. Describe what&apos;s slowing your business down —
            the AI Stack Finder picks the right tools, shows how they connect and what it&apos;ll cost. Free.
          </p>
          <form onSubmit={submit} className="mt-10 max-w-xl" noValidate>
            <label htmlFor="teaser-problem" className="label-mono mb-3 block text-muted">
              What&apos;s the problem?
            </label>
            <div className="glass rounded-3xl p-2 transition-colors focus-within:border-signature">
              <textarea
                id="teaser-problem"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                rows={3}
                maxLength={1200}
                placeholder={finderExamples[0]}
                aria-invalid={!!error}
                aria-describedby="teaser-problem-msg"
                className="block w-full resize-none bg-transparent px-4 pt-3 text-base leading-relaxed outline-none placeholder:text-muted/50"
              />
              <div className="flex justify-end">
                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    className="h-12 rounded-full bg-signature px-6 text-sm font-medium text-signature-ink transition-shadow hover:shadow-[0_0_40px_-6px_var(--signature-glow)]"
                  >
                    Find my stack
                  </button>
                </Magnetic>
              </div>
            </div>
            <p id="teaser-problem-msg" className="mt-3 text-sm text-muted" aria-live="polite">
              {error ? <span className="text-red-400">{error}</span> : "No sign-up to see your top picks."}
            </p>
          </form>
          <p className="label-mono mt-10 text-muted">
            Or browse the{" "}
            <Link href="/ai-tools" className="text-text underline decoration-line-strong underline-offset-4 hover:decoration-signature">
              AI tools directory →
            </Link>
          </p>
        </div>

        <div className="lg:col-span-6" aria-hidden>
          <GlassCard tilt className="p-6 md:p-8">
            <div className="flex items-center justify-between">
              <p className="label-mono text-muted">Your AI stack</p>
              <span className="label-mono rounded-full border border-line-strong px-2.5 py-1 text-[0.6rem] text-muted">
                Example
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted">&ldquo;{finderExamples[0]}&rdquo;</p>
            <ol className="mt-6 space-y-3">
              {sample.map((s, i) => {
                const t = getTool(s.id);
                if (!t) return null;
                return (
                  <li key={s.id} className="flex items-center gap-4 rounded-xl border border-line bg-surface p-4">
                    <span className="font-display-wide text-2xl text-signature">0{i + 1}</span>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">{t.name}</p>
                      <p className="text-sm text-muted">{s.role}</p>
                    </div>
                    <span className="label-mono shrink-0 rounded-full border border-line-strong px-2.5 py-1 text-[0.6rem] text-muted">
                      {pricingLabel[t.pricing]}
                    </span>
                  </li>
                );
              })}
            </ol>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                ["Setup", "~1 week"],
                ["Difficulty", "Easy"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl border border-line bg-surface p-4">
                  <p className="label-mono text-[0.6rem] text-muted">{k}</p>
                  <p className="mt-1 font-display text-2xl font-bold">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-signature/30 bg-signature/5 p-4">
              <p className="label-mono text-[0.6rem] text-signature">Quick win</p>
              <p className="mt-1.5 text-sm leading-relaxed">
                Route unanswered calls to a voice agent that books straight into your calendar, then confirm on WhatsApp.
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
