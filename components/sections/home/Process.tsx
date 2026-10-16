"use client";

import { useRef } from "react";
import { processSteps } from "@/config/process";
import { gsap, useGSAP } from "@/lib/gsap";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";

/** Discover → Design → Build → Automate → Grow, with a timeline that draws as you scroll. */
export function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-line]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-steps]", start: "top 70%", end: "bottom 70%", scrub: true },
          },
        );
        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step) => {
          gsap.from(step.querySelectorAll("[data-step-in]"), {
            y: 40,
            autoAlpha: 0,
            duration: 1,
            ease: "expo.out",
            stagger: 0.08,
            scrollTrigger: { trigger: step, start: "top 78%" },
          });
          gsap.fromTo(
            step.querySelector("[data-node]"),
            { scale: 0.4, backgroundColor: "rgba(237,238,242,0.2)" },
            {
              scale: 1,
              backgroundColor: "#c8ff2e",
              duration: 0.6,
              scrollTrigger: { trigger: step, start: "top 70%", toggleActions: "play none none reverse" },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="process-heading" className="relative z-10 bg-bg py-28 md:py-40">
      <div className="container-x grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)]">
            <Eyebrow index="03">How we work</Eyebrow>
            <RevealText id="process-heading" as="h2" className="font-display-tight mt-5 text-[clamp(2.4rem,4.6vw,4.8rem)]">
              From first call to compounding growth.
            </RevealText>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              Five stages, weekly demos and one team accountable for the outcome, not a relay race between agencies.
            </p>
          </div>
        </div>
        <ol data-steps className="relative lg:col-span-7">
          <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-line" />
          <span
            aria-hidden
            data-line
            className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-signature shadow-[0_0_12px_var(--signature)]"
          />
          {processSteps.map((s) => (
            <li key={s.index} data-step className="relative pb-16 pl-12 last:pb-0 md:pl-16">
              <span
                aria-hidden
                data-node
                className="absolute top-2 left-0 h-[15px] w-[15px] rounded-full border-4 border-bg bg-signature"
              />
              <div data-step-in className="flex items-baseline gap-4">
                <span className="label-mono text-muted">{s.index}</span>
                <span className="label-mono text-signature">{s.duration}</span>
              </div>
              <h3 data-step-in className="font-display-wide mt-3 text-[clamp(2.4rem,5vw,4.5rem)]">
                {s.title}
              </h3>
              <p data-step-in className="mt-4 max-w-lg text-base leading-relaxed text-muted md:text-lg">
                {s.summary}
              </p>
              <ul data-step-in className="mt-5 flex flex-wrap gap-2">
                {s.outputs.map((o) => (
                  <li key={o} className="label-mono rounded-full border border-line-strong px-3 py-1.5 text-[0.62rem]">
                    {o}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
