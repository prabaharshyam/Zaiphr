"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { aiTools, finderIndustries, getTool, pricingLabel, toolCategories } from "@/config/ai-tools";
import { finderExamples } from "@/config/finder-examples";
import { services } from "@/config/services";
import { site } from "@/config/site";
import type { FinderResult } from "@/lib/stack-finder/types";
import { getAttribution } from "@/lib/utm";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

type Phase = "input" | "loading" | "result";

const selectCls =
  "h-11 w-full rounded-xl border border-line-strong bg-surface px-3 text-sm outline-none transition-colors focus:border-signature";

const LOADING_STEPS = [
  "Understanding your problem",
  `Matching against ${aiTools.length} vetted tools`,
  "Designing how the tools work together",
  "Estimating time saved and monthly cost",
];

/* ───────────────────────── Loading ───────────────────────── */

function Analysing() {
  const [step, setStep] = useState(0);
  const [flash, setFlash] = useState(0);
  useEffect(() => {
    const a = window.setInterval(() => setStep((s) => Math.min(s + 1, LOADING_STEPS.length - 1)), 2600);
    const b = window.setInterval(() => setFlash((f) => (f + 7) % aiTools.length), 140);
    return () => {
      window.clearInterval(a);
      window.clearInterval(b);
    };
  }, []);
  return (
    <div role="status" aria-live="polite" className="grid gap-10 lg:grid-cols-2">
      <ol className="space-y-5">
        {LOADING_STEPS.map((s, i) => (
          <li key={s} className={cn("flex items-center gap-4 transition-opacity duration-500", i > step && "opacity-30")}>
            <span
              className={cn(
                "grid h-8 w-8 shrink-0 place-items-center rounded-full border text-xs",
                i < step ? "border-signature bg-signature text-signature-ink" : i === step ? "border-signature text-signature" : "border-line-strong",
              )}
            >
              {i < step ? "✓" : i === step ? <span className="h-2 w-2 animate-ping rounded-full bg-signature" /> : i + 1}
            </span>
            <span className="text-lg">{s}</span>
          </li>
        ))}
      </ol>
      <div aria-hidden className="grid grid-cols-4 gap-2 sm:grid-cols-6">
        {aiTools.slice(0, 36).map((t, i) => {
          const lit = (i * 5 + flash) % 9 === 0;
          return (
            <span
              key={t.id}
              className={cn(
                "label-mono truncate rounded-lg border px-2 py-2 text-center text-[0.55rem] transition-all duration-300",
                lit ? "border-signature bg-signature/15 text-signature" : "border-line text-muted/50",
              )}
            >
              {t.name}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ───────────────────────── Result pieces ───────────────────────── */

function ToolCard({ item, index }: { item: FinderResult["plan"]["stack"][number]; index: number }) {
  const tool = getTool(item.toolId);
  if (!tool) return null;
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass flex flex-col rounded-2xl p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-display-wide grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-signature text-lg text-signature-ink">
            {tool.name[0]}
          </span>
          <div>
            <p className="label-mono text-[0.6rem] text-signature">
              0{index + 1} · {item.role}
            </p>
            <h3 className="mt-1 text-lg font-medium">{tool.name}</h3>
          </div>
        </div>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="label-mono shrink-0 text-[0.6rem] text-muted underline-offset-4 hover:text-signature hover:underline"
        >
          Visit ↗
        </a>
      </div>
      <p className="mt-4 text-[0.95rem] leading-relaxed text-text/85">{item.why}</p>
      {item.setup && (
        <p className="mt-3 text-sm leading-relaxed text-muted">
          <span className="text-text">First step: </span>
          {item.setup}
        </p>
      )}
      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        <span className="label-mono rounded-full border border-line-strong px-2.5 py-1 text-[0.58rem]">{pricingLabel[tool.pricing]}</span>
        <span className="label-mono rounded-full border border-line-strong px-2.5 py-1 text-[0.58rem]">{tool.difficulty}</span>
        {tool.india && (
          <span title={tool.india} className="label-mono rounded-full border border-signature/40 px-2.5 py-1 text-[0.58rem] text-signature">
            India ready
          </span>
        )}
      </div>
    </motion.li>
  );
}

function UnlockForm({ runId, onUnlocked, totalTools }: { runId: string; onUnlocked: (r: FinderResult) => void; totalTools: number }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (!f.get("consent")) return setError("Please tick the consent box so we can email your plan.");
    setLoading(true);
    setError("");
    const a = getAttribution();
    const res = await fetch("/api/tools/stack-finder/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        runId,
        name: f.get("name"),
        email: f.get("email"),
        company: f.get("company") || undefined,
        phone: f.get("phone") || undefined,
        consent: true,
        attribution: a ? { ...a, ts: undefined } : undefined,
      }),
    }).catch(() => null);
    setLoading(false);
    if (!res?.ok) {
      const d = await res?.json().catch(() => ({}));
      return setError(d?.error ?? "Couldn't unlock right now. Please try again.");
    }
    onUnlocked(await res.json());
  };
  const input = "h-12 w-full rounded-xl border border-line-strong bg-bg px-4 text-sm outline-none focus:border-signature";
  return (
    <form onSubmit={submit} noValidate className="rounded-3xl border border-signature/40 bg-bg-2/95 p-6 shadow-[0_0_80px_-30px_var(--signature-glow)] backdrop-blur-xl md:p-8">
      <p className="label-mono text-signature">Free · takes 10 seconds</p>
      <h3 className="font-display-tight mt-3 text-3xl">Unlock your full plan</h3>
      <p className="mt-2 text-sm text-muted">
        All {totalTools} tools with setup steps, the workflow diagram, cost and time estimates, plus a copy in your inbox.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <label className="sr-only" htmlFor="u-name">Name</label>
        <input id="u-name" name="name" required autoComplete="name" placeholder="Your name" className={input} />
        <label className="sr-only" htmlFor="u-email">Email</label>
        <input id="u-email" name="email" type="email" required autoComplete="email" placeholder="Work email" className={input} />
        <label className="sr-only" htmlFor="u-company">Company</label>
        <input id="u-company" name="company" autoComplete="organization" placeholder="Company (optional)" className={input} />
        <label className="sr-only" htmlFor="u-phone">WhatsApp</label>
        <input id="u-phone" name="phone" type="tel" autoComplete="tel" placeholder="WhatsApp (optional)" className={input} />
      </div>
      <label className="mt-4 flex cursor-pointer items-start gap-3 text-xs text-muted">
        <input type="checkbox" name="consent" className="mt-0.5 h-4 w-4 accent-[var(--signature)]" />
        <span>
          Email me this plan. Zaiphr Labs may follow up about it. No spam, unsubscribe anytime.{" "}
          <Link href="/legal/privacy" target="_blank" className="underline underline-offset-4">Privacy</Link>
        </span>
      </label>
      <p className="mt-3 min-h-5 text-sm text-red-400" role="alert">{error}</p>
      <Button type="submit" size="lg" magnetic={false} disabled={loading} className="mt-2 w-full justify-between">
        {loading ? "Unlocking…" : "Show my full plan"}
      </Button>
    </form>
  );
}

function FullPlan({ result }: { result: FinderResult }) {
  const p = result.plan;
  const service = services.find((s) => s.slug === p.doneForYou?.service);
  return (
    <div className="space-y-16">
      {p.workflow && p.workflow.length > 0 && (
        <section aria-labelledby="wf-h">
          <p className="label-mono text-muted">How it works</p>
          <h3 id="wf-h" className="font-display-tight mt-3 text-3xl">Your workflow</h3>
          <ol className="relative mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {p.workflow.map((w, i) => (
              <li key={i} className="relative rounded-2xl border border-line bg-bg-2 p-5">
                <span className="font-display-wide text-3xl text-signature/80">{String(i + 1).padStart(2, "0")}</span>
                <h4 className="mt-3 text-lg font-medium">{w.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{w.detail}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {w.toolIds.map((id) => (
                    <span key={id} className="label-mono rounded-full bg-signature/10 px-2.5 py-1 text-[0.58rem] text-signature">
                      {getTool(id)?.name}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section aria-label="Estimates" className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
        {[
          ["Time saved", p.hoursSavedPerWeek, "per week"],
          ["Monthly cost", p.monthlyCostInr, p.monthlyCostUsd],
          ["Setup time", p.setupTime, ""],
          ["Difficulty", p.difficulty, ""],
        ].map(([k, v, sub]) => (
          <div key={k} className="bg-bg p-6">
            <p className="label-mono text-[0.6rem] text-muted">{k}</p>
            <p className="font-display-tight mt-3 text-2xl capitalize">{v}</p>
            {sub && <p className="mt-1 text-sm text-muted">{sub}</p>}
          </div>
        ))}
      </section>

      {p.watchOuts && p.watchOuts.length > 0 && (
        <section aria-labelledby="wo-h">
          <h3 id="wo-h" className="label-mono text-muted">Watch out for</h3>
          <ul className="mt-4 grid gap-3 md:grid-cols-3">
            {p.watchOuts.map((w) => (
              <li key={w} className="rounded-2xl border border-line p-5 text-sm leading-relaxed text-text/85">
                <span className="mr-2 text-signature" aria-hidden>!</span>
                {w}
              </li>
            ))}
          </ul>
        </section>
      )}

      {p.doneForYou && (
        <section className="no-print relative overflow-hidden rounded-3xl bg-signature p-8 text-signature-ink md:p-12">
          <p className="label-mono">Done for you</p>
          <p className="font-display-tight mt-4 max-w-2xl text-[clamp(1.8rem,3.4vw,3rem)] leading-tight">
            Rather not set this up yourself? We&apos;ll build it end-to-end.
          </p>
          <p className="mt-4 max-w-xl">{p.doneForYou.pitch}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={site.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-signature-ink px-6 py-3 font-medium text-signature transition-transform hover:-translate-y-0.5"
            >
              Book a free 30-min call
            </a>
            {service && (
              <Link href={`/services/${service.slug}`} className="rounded-full border border-signature-ink/30 px-6 py-3 font-medium">
                See {service.title}
              </Link>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

/* ───────────────────────── Main ───────────────────────── */

export function StackFinder() {
  const params = useSearchParams();
  const [phase, setPhase] = useState<Phase>("input");
  const [problem, setProblem] = useState("");
  const [industry, setIndustry] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [budget, setBudget] = useState("");
  const [comfort, setComfort] = useState("");
  const [showContext, setShowContext] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<FinderResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const autoRan = useRef(false);

  const run = useCallback(
    async (text: string) => {
      setError("");
      setPhase("loading");
      window.scrollTo({ top: 0, behavior: "smooth" });
      const res = await fetch("/api/tools/stack-finder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problem: text,
          industry: industry || undefined,
          teamSize: teamSize || undefined,
          budget: budget || undefined,
          comfort: comfort || undefined,
        }),
      }).catch(() => null);
      if (!res?.ok) {
        const d = await res?.json().catch(() => ({}));
        setError(d?.error ?? "Something went wrong. Please try again.");
        setPhase("input");
        return;
      }
      setResult(await res.json());
      setPhase("result");
    },
    [industry, teamSize, budget, comfort],
  );

  // Deep links: ?q=<problem> (from the homepage) runs immediately; ?plan=<id> reopens a saved plan.
  // Deep links (?q= / ?plan=) are read once after mount: search params only exist client-side.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (autoRan.current) return;
    autoRan.current = true;
    const q = params.get("q");
    const planId = params.get("plan");
    if (planId) {
      setPhase("loading");
      fetch(`/api/tools/stack-finder?plan=${encodeURIComponent(planId)}`)
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((d) => {
          setProblem(d.problem ?? "");
          setResult(d);
          setPhase("result");
        })
        .catch(() => setPhase("input"));
    } else if (q && q.trim().length >= 15) {
      setProblem(q);
      void run(q);
    } else if (q) setProblem(q);
  }, [params, run]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (problem.trim().length < 15) return setError("Tell us a little more: at least a sentence about what's slowing you down.");
    void run(problem.trim());
  };

  const reset = () => {
    setResult(null);
    setPhase("input");
    window.history.replaceState(null, "", "/tools/ai-stack-finder");
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        {phase === "input" && (
          <motion.form
            key="input"
            onSubmit={submit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            noValidate
          >
            <label htmlFor="sf-problem" className="label-mono text-muted">
              Describe your problem in your own words
            </label>
            <div className="glass mt-3 rounded-3xl p-2 transition-colors focus-within:border-signature">
              <textarea
                id="sf-problem"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                rows={5}
                maxLength={1200}
                placeholder="e.g. We get 50 enquiries a day on WhatsApp and Instagram, but we reply late and lose most of them…"
                className="w-full resize-none bg-transparent p-4 text-lg leading-relaxed outline-none placeholder:text-muted/50"
              />
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line p-3">
                <button
                  type="button"
                  onClick={() => setShowContext((s) => !s)}
                  aria-expanded={showContext}
                  className="label-mono text-muted hover:text-text"
                >
                  {showContext ? "− Hide context" : "+ Add context (better results)"}
                </button>
                <div className="flex items-center gap-4">
                  <span className="label-mono text-[0.6rem] text-muted tabular-nums">{problem.length}/1200</span>
                  <Button type="submit" size="md" magnetic={false}>
                    Find my AI stack
                  </Button>
                </div>
              </div>
              <AnimatePresence initial={false}>
                {showContext && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-3 border-t border-line p-4 sm:grid-cols-2 lg:grid-cols-4">
                      <select aria-label="Industry" value={industry} onChange={(e) => setIndustry(e.target.value)} className={selectCls}>
                        <option value="">Industry</option>
                        {finderIndustries.map((i) => (
                          <option key={i.slug} value={i.label} className="bg-bg-2">{i.label}</option>
                        ))}
                        <option value="Other" className="bg-bg-2">Other</option>
                      </select>
                      <select aria-label="Team size" value={teamSize} onChange={(e) => setTeamSize(e.target.value)} className={selectCls}>
                        <option value="">Team size</option>
                        <option value="solo" className="bg-bg-2">Just me</option>
                        <option value="2-10" className="bg-bg-2">2–10 people</option>
                        <option value="11-50" className="bg-bg-2">11–50 people</option>
                        <option value="50+" className="bg-bg-2">50+ people</option>
                      </select>
                      <select aria-label="Budget" value={budget} onChange={(e) => setBudget(e.target.value)} className={selectCls}>
                        <option value="">Budget</option>
                        <option value="free" className="bg-bg-2">Free tools only</option>
                        <option value="low" className="bg-bg-2">Low (under ₹5k / $60 a month)</option>
                        <option value="flexible" className="bg-bg-2">Flexible</option>
                      </select>
                      <select aria-label="Tech comfort" value={comfort} onChange={(e) => setComfort(e.target.value)} className={selectCls}>
                        <option value="">Tech comfort</option>
                        <option value="beginner" className="bg-bg-2">Beginner</option>
                        <option value="some" className="bg-bg-2">Some experience</option>
                        <option value="technical" className="bg-bg-2">Technical</option>
                      </select>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <p className="mt-3 min-h-5 text-sm text-red-400" role="alert">{error}</p>
            <div className="mt-6">
              <p className="label-mono text-[0.62rem] text-muted">Or try an example</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {finderExamples.map((ex) => (
                  <li key={ex}>
                    <button
                      type="button"
                      onClick={() => setProblem(ex)}
                      className="max-w-xs truncate rounded-full border border-line-strong px-4 py-2 text-left text-sm text-text/80 transition-colors hover:border-signature hover:text-text"
                      title={ex}
                    >
                      {ex}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.form>
        )}

        {phase === "loading" && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-6">
            <Analysing />
          </motion.div>
        )}

        {phase === "result" && result && (
          <motion.div
            key="result"
            ref={resultRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="print-area space-y-16"
          >
            <header>
              <div className="flex flex-wrap items-center gap-3">
                <span className="label-mono rounded-full bg-signature px-3 py-1 text-[0.6rem] text-signature-ink">Your AI stack</span>
                {result.engine === "match" && (
                  <span className="label-mono rounded-full border border-line-strong px-3 py-1 text-[0.6rem] text-muted">Instant match</span>
                )}
              </div>
              <h2 className="font-display-wide mt-6 text-[clamp(2.2rem,5vw,4.5rem)]">{result.plan.headline}</h2>
              {problem && <p className="mt-4 max-w-3xl text-sm text-muted">You said: “{problem}”</p>}
              <p className="mt-8 max-w-3xl text-xl leading-relaxed">{result.plan.diagnosis}</p>
              <div className="mt-8 max-w-3xl rounded-2xl border border-signature/40 bg-signature/5 p-5">
                <p className="label-mono text-[0.62rem] text-signature">Quick win: do this today</p>
                <p className="mt-2 leading-relaxed">{result.plan.quickWin}</p>
              </div>
            </header>

            <section aria-labelledby="stack-h">
              <div className="flex items-end justify-between gap-4">
                <h3 id="stack-h" className="font-display-tight text-3xl">
                  Recommended tools <span className="text-muted">({result.totalTools})</span>
                </h3>
              </div>
              <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {result.plan.stack.map((s, i) => (
                  <ToolCard key={s.toolId} item={s} index={i} />
                ))}
              </ul>
            </section>

            {result.locked && result.runId ? (
              <section className="relative">
                <div aria-hidden className="pointer-events-none select-none blur-[6px]">
                  <div className="grid gap-4 md:grid-cols-3">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="h-52 rounded-2xl border border-line bg-bg-2 p-5">
                        <div className="h-6 w-12 rounded bg-signature/30" />
                        <div className="mt-6 h-4 w-2/3 rounded bg-text/20" />
                        <div className="mt-3 h-3 w-full rounded bg-text/10" />
                        <div className="mt-2 h-3 w-5/6 rounded bg-text/10" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 grid grid-cols-4 gap-4">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className="h-28 rounded-2xl border border-line bg-bg-2" />
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center p-2">
                  <div className="w-full max-w-xl">
                    <UnlockForm
                      runId={result.runId}
                      totalTools={result.totalTools}
                      onUnlocked={(r) => {
                        setResult(r);
                        window.history.replaceState(null, "", `/tools/ai-stack-finder?plan=${r.runId}`);
                      }}
                    />
                  </div>
                </div>
              </section>
            ) : (
              <>
                {result.runId && (
                  <p role="status" className="no-print label-mono text-signature">
                    ✓ Full plan unlocked. A copy is on its way to your inbox.
                  </p>
                )}
                <FullPlan result={result} />
              </>
            )}

            <div className="no-print flex flex-wrap items-center gap-3 border-t border-line pt-8">
              <button type="button" onClick={reset} className="rounded-full border border-line-strong px-5 py-2.5 text-sm hover:border-text">
                ← Try another problem
              </button>
              {!result.locked && (
                <button type="button" onClick={() => window.print()} className="rounded-full border border-line-strong px-5 py-2.5 text-sm hover:border-text">
                  Download PDF
                </button>
              )}
              <p className="ml-auto max-w-sm text-xs text-muted">
                Recommendations come from our curated catalog of {aiTools.length} tools across {Object.keys(toolCategories).length} categories. Pricing changes often, so check each vendor.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
