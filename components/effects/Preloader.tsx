"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { markReady } from "@/lib/ready";
import { prefersReducedMotion } from "@/lib/hooks";
import { LogoMark } from "@/components/ui/Logo";
import { ScrambleText } from "@/components/ui/ScrambleText";

const KEY = "zl-preloaded";
const MAX_MS = 1800;
const MIN_MS = 1100;

/**
 * Branded preloader, first visit per session only (≤ ~2s).
 * The SSR markup is hidden by an inline <head> script when already seen,
 * and by <noscript> CSS when JS is off - content is never blocked.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);
  const [decode, setDecode] = useState(0);

  useEffect(() => {
    const el = root.current;
    const seen = document.documentElement.classList.contains("preloaded");
    if (!el || seen) {
      markReady();
      setDone(true);
      return;
    }

    document.documentElement.style.overflow = "hidden";
    const reduced = prefersReducedMotion();
    const counter = { v: 0 };
    setDecode(1);

    const finish = () => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      document.documentElement.style.overflow = "";
      markReady();
      const tl = gsap.timeline({ onComplete: () => setDone(true) });
      if (reduced) tl.to(el, { autoAlpha: 0, duration: 0.3 });
      else
        tl.to(el.querySelectorAll("[data-pl-fade]"), { autoAlpha: 0, y: -12, duration: 0.3, stagger: 0.04 })
          .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.9, ease: "expo.inOut" }, "-=0.1");
    };

    // Progress follows fonts + window load, capped so the loader never overstays.
    const loaded = Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((r) => window.addEventListener("load", r, { once: true })),
    ]);
    const cap = new Promise((r) => setTimeout(r, MAX_MS - 300));
    const minimum = new Promise((r) => setTimeout(r, reduced ? 300 : MIN_MS));

    const tween = gsap.to(counter, {
      v: 86,
      duration: reduced ? 0.4 : 1.1,
      ease: "power2.out",
      onUpdate: () => setPct(Math.round(counter.v)),
    });

    Promise.all([Promise.race([loaded, cap]), minimum]).then(() => {
      tween.kill();
      gsap.to(counter, {
        v: 100,
        duration: 0.35,
        ease: "power1.inOut",
        onUpdate: () => setPct(Math.round(counter.v)),
        onComplete: finish,
      });
    });

    return () => {
      tween.kill();
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      id="preloader"
      ref={root}
      role="status"
      aria-label="Loading Zaiphr Labs"
      className="fixed inset-0 z-[110] flex flex-col bg-bg"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="relative flex flex-1 flex-col items-center justify-center gap-6" data-pl-fade>
        <LogoMark className="h-14 w-14 text-text" />
        <div className="font-display text-2xl font-extrabold tracking-[0.02em] [font-stretch:125%] sm:text-3xl">
          <ScrambleText text="ZAIPHR LABS" trigger="manual" play={decode} duration={1100} />
        </div>
      </div>
      <div className="container-x relative flex items-end justify-between pb-8" data-pl-fade>
        <span className="label-mono text-muted">Calibrating engines</span>
        <span className="font-mono text-5xl leading-none font-light tabular-nums sm:text-7xl">
          {String(pct).padStart(3, "0")}
          <span className="text-signature">%</span>
        </span>
      </div>
      <div className="relative h-px w-full bg-line" aria-hidden>
        <div
          className="h-full bg-signature shadow-[0_0_20px_2px_var(--signature-glow)]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
