"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";
import { GlassCard } from "@/components/ui/GlassCard";
import { Magnetic } from "@/components/ui/Magnetic";

const axes = ["Positioning", "SEO", "Speed", "Offer clarity", "Social", "Trust"];
const you = [0.55, 0.42, 0.7, 0.38, 0.6, 0.5];
const them = [0.72, 0.66, 0.52, 0.64, 0.48, 0.7];

function radarPoints(values: number[], r: number, c: number) {
  return values
    .map((v, i) => {
      const a = (Math.PI * 2 * i) / values.length - Math.PI / 2;
      return `${c + Math.cos(a) * r * v},${c + Math.sin(a) * r * v}`;
    })
    .join(" ");
}

/** Homepage preview of the Competitor Analysis tool: type a URL, jump into the tool. */
export function ToolsTeaser() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const v = url.trim();
    const ok = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i.test(v);
    if (!ok) return setError("Enter a website like yourbrand.com");
    setError("");
    router.push(`/tools?url=${encodeURIComponent(v)}`);
  };

  const R = 120;
  const C = 150;

  return (
    <section aria-labelledby="tools-heading" className="relative z-10 overflow-hidden bg-bg py-28 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-0 h-[50vw] w-[50vw] -translate-y-1/2 translate-x-1/3 rounded-full bg-signature/10 blur-[140px]"
      />
      <div className="container-x relative grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Eyebrow index="04">Free tools</Eyebrow>
          <RevealText as="h2" className="font-display-tight mt-5 text-[length:var(--text-display)]">
            <span id="tools-heading">See your competitors through an AI&apos;s eyes.</span>
          </RevealText>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            Paste your website. Our AI reads your site and your competitors&apos; — positioning, pricing, SEO and tech
            stack — and tells you exactly where you&apos;re losing deals. Free, in about a minute.
          </p>
          <form onSubmit={submit} className="mt-10 max-w-xl" noValidate>
            <label htmlFor="teaser-url" className="label-mono mb-3 block text-muted">
              Your website
            </label>
            <div className="glass flex h-16 items-center gap-2 rounded-full pr-2 pl-6 transition-colors focus-within:border-signature">
              <span className="font-mono text-sm text-muted">https://</span>
              <input
                id="teaser-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="yourbrand.com"
                inputMode="url"
                autoComplete="url"
                aria-invalid={!!error}
                aria-describedby="teaser-url-msg"
                className="h-full min-w-0 flex-1 bg-transparent font-mono text-base outline-none placeholder:text-muted/50"
              />
              <Magnetic strength={0.2}>
                <button
                  type="submit"
                  className="h-12 rounded-full bg-signature px-6 text-sm font-medium text-signature-ink transition-shadow hover:shadow-[0_0_40px_-6px_var(--signature-glow)]"
                >
                  Analyse
                </button>
              </Magnetic>
            </div>
            <p id="teaser-url-msg" className="mt-3 text-sm text-muted" aria-live="polite">
              {error ? <span className="text-red-400">{error}</span> : "No sign-up for the summary. Full PDF report is free too."}
            </p>
          </form>
          <ul className="label-mono mt-10 flex flex-wrap gap-x-6 gap-y-2 text-muted">
            <li>→ AI Readiness Score</li>
            <li>→ Automation ROI calculator</li>
          </ul>
        </div>

        <div className="lg:col-span-6" aria-hidden>
          <GlassCard tilt className="p-6 md:p-8">
            <div className="flex items-center justify-between">
              <p className="label-mono text-muted">Competitor report</p>
              <span className="label-mono rounded-full border border-line-strong px-2.5 py-1 text-[0.6rem] text-muted">
                Sample
              </span>
            </div>
            <div className="mt-6 grid items-center gap-6 sm:grid-cols-[300px_1fr]">
              <svg viewBox="0 0 300 300" className="mx-auto w-full max-w-[300px]">
                {[0.25, 0.5, 0.75, 1].map((k) => (
                  <polygon key={k} points={radarPoints(axes.map(() => k), R, C)} fill="none" stroke="var(--line-strong)" />
                ))}
                {axes.map((a, i) => {
                  const ang = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
                  return (
                    <g key={a}>
                      <line x1={C} y1={C} x2={C + Math.cos(ang) * R} y2={C + Math.sin(ang) * R} stroke="var(--line)" />
                      <text
                        x={C + Math.cos(ang) * (R + 18)}
                        y={C + Math.sin(ang) * (R + 18)}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-[var(--muted)] font-mono text-[9px] uppercase"
                      >
                        {a}
                      </text>
                    </g>
                  );
                })}
                <polygon points={radarPoints(them, R, C)} fill="rgba(237,238,242,0.06)" stroke="rgba(237,238,242,0.5)" strokeDasharray="4 4" />
                <polygon points={radarPoints(you, R, C)} fill="rgba(200,255,46,0.18)" stroke="var(--signature)" strokeWidth="1.5" />
              </svg>
              <div className="space-y-3">
                {[
                  ["Value-prop clarity", "48", "/100"],
                  ["SEO coverage", "42", "/100"],
                  ["Pricing visibility", "Hidden", ""],
                ].map(([k, v, u]) => (
                  <div key={k} className="rounded-xl border border-line bg-surface p-4">
                    <p className="label-mono text-[0.6rem] text-muted">{k}</p>
                    <p className="mt-1 font-display text-2xl font-bold">
                      {v}
                      <span className="text-sm text-muted">{u}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 rounded-xl border border-signature/30 bg-signature/5 p-4">
              <p className="label-mono text-[0.6rem] text-signature">Top action #1</p>
              <p className="mt-1.5 text-sm leading-relaxed">
                Competitors lead with outcomes and show starting prices. Rewrite your hero around one measurable result
                and add a pricing anchor.
              </p>
            </div>
            <div className="label-mono mt-5 flex items-center gap-5 text-[0.6rem] text-muted">
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-signature" />You</span>
              <span className="flex items-center gap-2"><span className="h-px w-4 border-t border-dashed border-text/60" />Competitor avg.</span>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
