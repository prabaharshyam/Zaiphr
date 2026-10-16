"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Pulls its child toward the pointer. The inner layer moves further than the shell,
 * which gives magnetic buttons their depth. No-op on touch / reduced motion.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const shell = useRef<HTMLSpanElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const s = shell.current;
    const i = inner.current;
    if (!s || !i) return;
    const ok = window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;

    const sx = gsap.quickTo(s, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const sy = gsap.quickTo(s, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const ix = gsap.quickTo(i, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const iy = gsap.quickTo(i, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });

    const move = (e: PointerEvent) => {
      const r = s.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      sx(x * strength);
      sy(y * strength);
      ix(x * strength * 0.5);
      iy(y * strength * 0.5);
    };
    const leave = () => {
      sx(0); sy(0); ix(0); iy(0);
    };
    s.addEventListener("pointermove", move);
    s.addEventListener("pointerleave", leave);
    return () => {
      s.removeEventListener("pointermove", move);
      s.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  return (
    <span ref={shell} className={cn("inline-block will-change-transform", className)}>
      <span ref={inner} className="block will-change-transform">
        {children}
      </span>
    </span>
  );
}
