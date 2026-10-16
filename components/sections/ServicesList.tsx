"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { ScrambleText } from "@/components/ui/ScrambleText";

export interface ServiceRow {
  slug: string;
  index: string;
  title: string;
  summary: string;
  capabilities: string[];
  cover?: string;
}

/** Big service index with a cursor-following preview of a related build (desktop). */
export function ServicesList({ rows }: { rows: ServiceRow[] }) {
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const el = preview.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      x(e.clientX + 24);
      y(e.clientY - 120);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <>
      <ul className="border-t border-line" onPointerLeave={() => setActive(null)}>
        {rows.map((s, i) => (
          <li key={s.slug} className="border-b border-line" onPointerEnter={() => setActive(i)}>
            <TransitionLink
              href={`/services/${s.slug}`}
              className="group grid grid-cols-12 items-baseline gap-4 py-8 transition-colors md:py-10"
            >
              <span className="label-mono col-span-2 text-muted transition-colors group-hover:text-signature md:col-span-1">{s.index}</span>
              <span className="font-display-wide col-span-10 text-[clamp(1.9rem,4vw,4rem)] transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-3 md:col-span-7">
                <ScrambleText text={s.title} duration={500} />
              </span>
              <span className="col-span-12 md:col-span-4 md:pl-6">
                <span className="block text-muted">{s.summary}</span>
                <span className="mt-4 flex flex-wrap gap-2">
                  {s.capabilities.map((c) => (
                    <span key={c} className="label-mono rounded-full border border-line-strong px-2.5 py-1 text-[0.6rem] text-text/70">
                      {c}
                    </span>
                  ))}
                </span>
              </span>
            </TransitionLink>
          </li>
        ))}
      </ul>
      <div
        ref={preview}
        aria-hidden
        className={cn(
          "pointer-events-none fixed top-0 left-0 z-50 hidden aspect-[16/10] w-[22rem] overflow-hidden rounded-xl border border-line-strong shadow-2xl transition-[opacity,scale] duration-500 lg:block",
          active !== null && rows[active]?.cover ? "scale-100 opacity-100" : "scale-90 opacity-0",
        )}
      >
        {rows.map((s, i) =>
          s.cover ? (
            <Image
              key={s.slug}
              src={s.cover}
              alt=""
              fill
              sizes="352px"
              className={cn("object-cover transition-opacity duration-300", active === i ? "opacity-100" : "opacity-0")}
            />
          ) : null,
        )}
      </div>
    </>
  );
}
