"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Dark glass panel with a pointer-following spotlight and optional 3D tilt.
 */
export function GlassCard({
  children,
  className,
  tilt = false,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  as?: "div" | "article" | "li";
}) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    if (tilt)
      gsap.to(el, {
        rotateY: (x - 0.5) * 8,
        rotateX: (0.5 - y) * 8,
        transformPerspective: 900,
        duration: 0.6,
        ease: "power3.out",
      });
  };
  const leave = () => {
    if (tilt && ref.current) gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "expo.out" });
  };

  return (
    <Tag
      ref={ref as never}
      onPointerMove={move}
      onPointerLeave={leave}
      className={cn(
        "glass group/card relative overflow-hidden rounded-2xl",
        "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
        "before:bg-[radial-gradient(420px_circle_at_var(--mx,50%)_var(--my,50%),rgba(200,255,46,0.09),transparent_60%)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
