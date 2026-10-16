"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { LogoMark } from "@/components/ui/Logo";

/**
 * Phase-1 stand-in for the WebGL "Cipher Core": layered light, orbit rings and the mark,
 * with pointer parallax. Phase 2 swaps this for the R3F particle scene and keeps this
 * as the low-power / reduced-motion fallback.
 */
export function HeroCore() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const layers = el.querySelectorAll<HTMLElement>("[data-depth]");
    const setters = [...layers].map((l) => ({
      d: Number(l.dataset.depth),
      x: gsap.quickTo(l, "x", { duration: 1.2, ease: "power3.out" }),
      y: gsap.quickTo(l, "y", { duration: 1.2, ease: "power3.out" }),
    }));
    const move = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      setters.forEach((s) => {
        s.x(nx * s.d * 60);
        s.y(ny * s.d * 60);
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      className="hero-core-fallback pointer-events-none absolute inset-0 flex items-start justify-center pt-[var(--nav-h)] opacity-70 md:items-center md:justify-end md:pt-0 md:opacity-100"
    >
      <div className="relative aspect-square w-[72vw] md:-mr-[8vw] md:w-[min(60vw,48rem)] md:-translate-y-[10%]">
        <div data-depth="0.3" className="absolute inset-[18%] rounded-full bg-signature/25 blur-[90px]" />
        <div data-depth="0.6" className="absolute inset-0">
          <div className="absolute inset-[6%] rounded-full border border-line animate-[spin_60s_linear_infinite]">
            <span className="absolute top-1/2 -left-1 h-2 w-2 rounded-full bg-signature shadow-[0_0_12px_var(--signature)]" />
          </div>
          <div className="absolute inset-[16%] rounded-full border border-dashed border-line-strong/60 animate-[spin_90s_linear_infinite_reverse]" />
          <div className="absolute inset-[27%] rounded-full [background:conic-gradient(from_0deg,transparent,rgba(200,255,46,0.45),transparent_35%)] animate-[spin_7s_linear_infinite] [mask:radial-gradient(circle,transparent_62%,black_63%,black_64%,transparent_65%)]" />
        </div>
        <div data-depth="1" className="absolute inset-[34%] flex items-center justify-center">
          <div className="glass relative flex h-full w-full items-center justify-center rounded-[28%] [transform:rotate(45deg)]">
            <div className="absolute inset-0 rounded-[28%] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.12),transparent_60%)]" />
            <LogoMark className="h-[38%] w-[38%] -rotate-45 text-text drop-shadow-[0_0_24px_rgba(200,255,46,0.35)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
