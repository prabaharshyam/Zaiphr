"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Button } from "@/components/ui/Button";

export interface WorkCard {
  slug: string;
  client: string;
  title: string;
  label: string;
  industry: string;
  cover: string;
  accent: string;
  service: string;
}

/**
 * Selected work. Desktop: pinned section scrolled horizontally.
 * Mobile / reduced motion: native swipe row with scroll-snap.
 */
export function WorkTrack({ projects, total }: { projects: WorkCard[]; total: number }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        // Parallax inside each card image
        gsap.utils.toArray<HTMLElement>("[data-parallax]", el).forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: img.parentElement,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="work"
      aria-labelledby="work-heading"
      className="relative z-10 overflow-hidden border-t border-line bg-bg lg:flex lg:h-[100svh] lg:flex-col lg:justify-center"
    >
      <div className="container-x flex flex-col gap-6 pt-24 lg:flex-row lg:items-end lg:justify-between lg:pt-[calc(var(--nav-h)+1rem)]">
        <div>
          <Eyebrow index="02">Selected work</Eyebrow>
          <RevealText id="work-heading" as="h2" className="font-display-tight mt-5 text-[length:var(--text-display)]">
            Built to show what&apos;s possible.
          </RevealText>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          We&apos;re a new studio, so these are <span className="text-text">concept projects and showcase builds</span>{" "}
          for fictional brands. Real thinking, real design, honest about what they are.
        </p>
      </div>

      <div
        ref={track}
        className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-24 [scrollbar-width:none] lg:mt-14 lg:w-max lg:snap-none lg:gap-8 lg:overflow-visible lg:pb-0"
      >
        {projects.map((p, i) => (
          <TransitionLink
            key={p.slug}
            href={`/work/${p.slug}`}
            data-cursor="View"
            className="group relative w-[84vw] shrink-0 snap-center sm:w-[64vw] lg:w-[min(46vw,52rem)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-bg-2">
              <div data-parallax className="absolute inset-y-0 -inset-x-[10%]">
                <Image
                  src={p.cover}
                  alt={`${p.client}: ${p.title} (concept mockup)`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 85vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.04]"
                  priority={i === 0}
                />
              </div>
              <span className="label-mono absolute top-4 left-4 rounded-full bg-bg/75 px-3 py-1.5 text-[0.62rem] text-text backdrop-blur-md">
                {p.label}
              </span>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-x-100"
                style={{ background: p.accent }}
              />
            </div>
            <div className="mt-5 flex items-start justify-between gap-6">
              <div>
                <p className="label-mono text-muted">
                  {String(i + 1).padStart(2, "0")} · {p.client}
                </p>
                <h3 className="mt-2 text-xl font-medium tracking-[-0.01em] md:text-2xl">{p.title}</h3>
              </div>
              <div className="hidden shrink-0 flex-col items-end gap-1.5 sm:flex">
                <span className="label-mono rounded-full border border-line-strong px-2.5 py-1 text-[0.6rem] text-text/80">
                  {p.service}
                </span>
                <span className="label-mono text-[0.6rem] text-muted">{p.industry}</span>
              </div>
            </div>
          </TransitionLink>
        ))}
        <div className="flex w-[70vw] shrink-0 snap-center flex-col items-start justify-center gap-6 sm:w-[40vw] lg:w-[28vw] lg:pr-[8vw]">
          <p className="font-display-tight text-4xl md:text-5xl">
            {total} builds.
            <br />
            <span className="text-muted">7 engines.</span>
          </p>
          <Button href="/work" variant="outline">
            View all work
          </Button>
        </div>
      </div>
    </section>
  );
}
