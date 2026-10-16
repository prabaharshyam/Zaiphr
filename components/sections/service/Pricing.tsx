"use client";

import type { Package } from "@/config/service-details";
import { formatMoney, useCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { CurrencyToggle } from "@/components/ui/CurrencyToggle";
import { Button } from "@/components/ui/Button";

export function Pricing({ packages, serviceSlug }: { packages: Package[]; serviceSlug: string }) {
  const [currency, setCurrency] = useCurrency();
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="relative z-10 scroll-mt-24 bg-bg py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Eyebrow index="06">Pricing guidance</Eyebrow>
            <h2 id="pricing-heading" className="font-display-tight mt-5 text-[clamp(2.2rem,4.6vw,4.4rem)]">
              Clear starting points.
            </h2>
          </div>
          <CurrencyToggle value={currency} onChange={setCurrency} />
        </div>
        <ul className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {packages.map((p) => (
            <li
              key={p.name}
              className={cn(
                "relative flex flex-col rounded-3xl border p-8",
                p.highlight ? "border-signature/60 bg-bg-2 shadow-[0_0_80px_-30px_var(--signature-glow)]" : "border-line bg-bg",
              )}
            >
              {p.highlight && (
                <span className="label-mono absolute -top-3 left-8 rounded-full bg-signature px-3 py-1 text-[0.6rem] text-signature-ink">
                  Most chosen
                </span>
              )}
              <h3 className="text-xl font-medium">{p.name}</h3>
              <p className="mt-2 min-h-12 text-sm text-muted">{p.description}</p>
              <p className="mt-8">
                <span className="label-mono block text-[0.6rem] text-muted">Starting from</span>
                <span className="font-display-wide mt-2 block text-[clamp(2.2rem,3.6vw,3rem)] tabular-nums">
                  {formatMoney(currency === "INR" ? p.inr : p.usd, currency)}
                </span>
                <span className="text-sm text-muted">{p.per === "month" ? "per month" : "per project"}</span>
              </p>
              <ul className="mt-8 flex-1 space-y-3 border-t border-line pt-6">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm">
                    <span aria-hidden className="text-signature">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button href={`/contact?service=${serviceSlug}&package=${encodeURIComponent(p.name)}`} variant={p.highlight ? "primary" : "outline"} magnetic={false} className="w-full justify-between">
                  Get a quote
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-muted">
          Guidance only — final quotes follow a free discovery call. Prices exclude GST and third-party costs (ad spend, usage, creator fees).
        </p>
      </div>
    </section>
  );
}
