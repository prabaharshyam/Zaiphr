"use client";

import { useRef, useState } from "react";
import { services } from "@/config/services";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { sceneState } from "@/lib/scene-store";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { useLenis } from "@/components/providers/SmoothScroll";

const SEG_VH = 85; // scroll distance per service, in % of viewport height

/**
 * Pinned scroll story: one panel per service while the Cipher Core
 * morphs into that service's form (graph, waveform, browser, phone, glyph, film, orbit).
 */
export function ServicesScroll() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const st = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const lenis = useLenis();

  useGSAP(
    () => {
      const section = root.current!;
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", section);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(panels, { autoAlpha: 0 });
        gsap.set(panels[0], { autoAlpha: 1 });
        let current = 0;

        const show = (next: number) => {
          if (next === current) return;
          const dir = next > current ? 1 : -1;
          const out = panels[current];
          const inn = panels[next];
          gsap.to(out, { autoAlpha: 0, y: -40 * dir, duration: 0.5, ease: "power3.in", overwrite: true });
          gsap.fromTo(
            inn,
            { autoAlpha: 0, y: 50 * dir },
            { autoAlpha: 1, y: 0, duration: 0.9, ease: "expo.out", delay: 0.25, overwrite: true },
          );
          gsap.fromTo(
            inn.querySelectorAll("[data-panel-line]"),
            { yPercent: 105 },
            { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.06, delay: 0.3 },
          );
          current = next;
          setActive(next);
        };

        // Hero → first service: the core bursts and re-forms as the section arrives.
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "top top",
          scrub: true,
          onUpdate: (self) => {
            sceneState.morph = self.progress;
          },
        });

        st.current = ScrollTrigger.create({
          trigger: pin.current,
          start: "top top",
          end: () => `+=${(services.length * SEG_VH * window.innerHeight) / 100}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress * services.length;
            const idx = Math.min(services.length - 1, Math.floor(p));
            const frac = p - idx;
            // Hold each form while it's read; morph in the last third of its segment.
            const morph = idx < services.length - 1 ? gsap.utils.clamp(0, 1, (frac - 0.68) / 0.32) : 0;
            sceneState.morph = 1 + idx + morph * morph * (3 - 2 * morph);
            show(Math.min(services.length - 1, Math.floor(p + 0.16)));
            gsap.set("[data-progress]", { scaleX: self.progress });
          },
        });

        // Story ends: core re-forms and the scene fades as the next section covers it.
        ScrollTrigger.create({
          trigger: section,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            sceneState.morph = services.length + self.progress;
            sceneState.opacity = 1 - self.progress;
          },
          onLeaveBack: () => {
            sceneState.opacity = 1;
          },
        });

        return () => {
          st.current = null;
          sceneState.morph = 0;
          sceneState.opacity = 1;
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  // Keyboard users: focusing a panel's link scrolls the story to that panel.
  const focusPanel = (i: number) => {
    const t = st.current;
    if (!t) return;
    const y = t.start + ((i + 0.4) / services.length) * (t.end - t.start);
    if (lenis) lenis.scrollTo(y, { immediate: true });
    else window.scrollTo(0, y);
  };

  return (
    <section
      ref={root}
      id="services"
      aria-labelledby="services-heading"
      className="relative z-10"
    >
      <div ref={pin} className="relative min-h-[100svh] overflow-hidden motion-reduce:min-h-0">
        {/* Legibility veil: stronger on mobile where copy overlaps the form */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,var(--bg)_35%,transparent_75%)] md:bg-[linear-gradient(to_right,var(--bg)_20%,transparent_60%)] motion-reduce:hidden"
        />
        <div className="container-x relative flex min-h-[100svh] flex-col pt-[calc(var(--nav-h)+2rem)] pb-8 motion-reduce:min-h-0 motion-reduce:py-24">
          <div className="flex items-start justify-between gap-6">
            <div>
              <Eyebrow index="01">What we build</Eyebrow>
              <h2 id="services-heading" className="font-display-tight mt-4 text-2xl md:text-3xl">
                Seven engines. <span className="text-muted">One studio.</span>
              </h2>
            </div>
            <p className="label-mono hidden text-muted tabular-nums motion-safe:block" aria-hidden>
              <span className="text-text">{String(active + 1).padStart(2, "0")}</span> / {String(services.length).padStart(2, "0")}
            </p>
          </div>

          <div className="relative flex-1 motion-reduce:mt-12 motion-reduce:space-y-16">
            {services.map((s, i) => (
              <article
                key={s.slug}
                data-panel
                onFocusCapture={() => focusPanel(i)}
                className={cn(
                  "flex flex-col justify-end pb-6 md:justify-center md:pb-0",
                  "motion-safe:absolute motion-safe:inset-0",
                )}
              >
                <div className="max-w-xl md:max-w-[46%]">
                  <p className="label-mono mb-5 flex items-center gap-3 text-signature">
                    <span className="h-px w-8 bg-signature" aria-hidden />
                    Service {s.index}
                  </p>
                  <h3 className="font-display-wide text-[clamp(2.3rem,4.6vw,5.4rem)]">
                    {s.title.split(" ").map((word, w) => (
                      <span key={w} className="mask-line mr-[0.22em] inline-block align-top">
                        <span data-panel-line className="inline-block">
                          {word}
                        </span>
                      </span>
                    ))}
                  </h3>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">{s.summary}</p>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${s.title} capabilities`}>
                    {s.capabilities.map((c) => (
                      <li key={c} className="label-mono rounded-full border border-line-strong px-3 py-1.5 text-[0.65rem] text-text/80">
                        {c}
                      </li>
                    ))}
                  </ul>
                  <TransitionLink
                    href={`/services/${s.slug}`}
                    className="group mt-8 inline-flex items-center gap-3 text-sm font-medium"
                  >
                    <span className="relative">
                      Explore {s.short.toLowerCase()}
                      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-signature transition-transform duration-500 group-hover:scale-x-100" />
                    </span>
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-line-strong transition-colors group-hover:border-signature group-hover:bg-signature group-hover:text-signature-ink">
                      →
                    </span>
                  </TransitionLink>
                </div>
              </article>
            ))}
          </div>

          {/* Progress rail */}
          <div className="relative motion-reduce:hidden" aria-hidden>
            <div className="h-px w-full bg-line">
              <div data-progress className="h-full origin-left scale-x-0 bg-signature shadow-[0_0_12px_var(--signature)]" />
            </div>
            <ol className="mt-3 hidden grid-cols-7 md:grid">
              {services.map((s, i) => (
                <li
                  key={s.slug}
                  className={cn(
                    "label-mono text-[0.62rem] transition-colors duration-500",
                    i === active ? "text-text" : "text-muted/60",
                  )}
                >
                  {s.index} {s.short}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
