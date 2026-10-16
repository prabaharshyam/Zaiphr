"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { industries, type Industry, type ServiceDetail } from "@/config/service-details";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/SectionHeading";

export function IndustryUseCases({ detail, title }: { detail: ServiceDetail; title: string }) {
  const keys = Object.keys(industries) as Industry[];
  const [active, setActive] = useState<Industry>(keys[0]);

  return (
    <section aria-labelledby="uc-heading" className="relative z-10 border-y border-line bg-bg-2 py-24 md:py-32">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow index="03">By industry</Eyebrow>
          <h2 id="uc-heading" className="font-display-tight mt-5 text-[clamp(2.2rem,4.2vw,4rem)]">
            {title} for your industry.
          </h2>
          <div role="tablist" aria-label="Industries" className="mt-10 flex flex-wrap gap-2">
            {keys.map((k) => (
              <button
                key={k}
                role="tab"
                id={`tab-${k}`}
                aria-selected={active === k}
                aria-controls="uc-panel"
                onClick={() => setActive(k)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-colors",
                  active === k ? "border-signature bg-signature text-signature-ink" : "border-line-strong hover:border-text",
                )}
              >
                {industries[k]}
              </button>
            ))}
          </div>
        </div>
        <div className="lg:col-span-7">
          <div id="uc-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="relative min-h-[16rem] overflow-hidden rounded-3xl border border-line bg-bg p-8 md:p-12">
            <div className="bg-grid absolute inset-0 opacity-40" aria-hidden />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <p className="label-mono text-signature">{industries[active]}</p>
                <p className="font-display-tight mt-6 text-[clamp(1.6rem,2.8vw,2.6rem)] leading-tight">
                  {detail.useCases[active]}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
