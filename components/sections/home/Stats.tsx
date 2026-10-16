"use client";

import { useRef } from "react";
import { stats } from "@/config/stats";
import { gsap, useGSAP } from "@/lib/gsap";

/** Animated counters - values live in config/stats.ts. */
export function Stats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count);
          const obj = { v: 0 };
          el.textContent = "0";
          gsap.to(obj, {
            v: target,
            duration: 2,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
            onUpdate: () => {
              el.textContent = String(Math.round(obj.v));
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="Zaiphr Labs in numbers" className="relative z-10 border-y border-line bg-bg-2">
      <div className="container-x grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="flex flex-col justify-between gap-10 border-line py-12 pr-4 max-lg:[&:nth-child(odd)]:border-r lg:border-r lg:px-8 lg:py-16 lg:first:pl-0 lg:last:border-r-0 max-lg:[&:nth-child(-n+2)]:border-b max-lg:[&:nth-child(even)]:pl-4"
          >
            <span className="label-mono text-muted">0{i + 1}</span>
            <div>
              <p className="font-display-wide text-[clamp(2.6rem,6vw,5.5rem)] tabular-nums">
                {s.prefix}
                <span data-count={s.value}>{s.value}</span>
                <span className="text-signature">{s.suffix}</span>
              </p>
              <p className="mt-3 text-base font-medium">{s.label}</p>
              {s.note && <p className="mt-1 text-sm text-muted">{s.note}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
