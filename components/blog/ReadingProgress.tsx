"use client";

import { useEffect, useRef } from "react";

/** Thin progress bar under the nav while reading an article. */
export function ReadingProgress({ target }: { target: string }) {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = document.getElementById(target);
    if (!el || !bar.current) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
      bar.current!.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => (raf ||= requestAnimationFrame(update));
    update();
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [target]);
  return <div ref={bar} aria-hidden className="fixed top-0 left-0 z-[60] h-[2px] w-full origin-left scale-x-0 bg-signature" />;
}
