"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useFinePointer, useReducedMotion } from "@/lib/hooks";

const INTERACTIVE = "a, button, [role='button'], summary, label, select";
const TEXT = "input:not([type='checkbox']):not([type='radio']):not([type='range']), textarea";

/**
 * Desktop-only cursor: a dot + trailing ring.
 * - Grows over links/buttons
 * - Becomes a labelled lens over anything with data-cursor="View" (or any label)
 * - Collapses to a caret over text inputs
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled || !dot.current || !ring.current) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const d = dot.current;
    const r = ring.current;
    gsap.set([d, r], { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    const dx = gsap.quickTo(d, "x", { duration: 0.12, ease: "power3.out" });
    const dy = gsap.quickTo(d, "y", { duration: 0.12, ease: "power3.out" });
    const rx = gsap.quickTo(r, "x", { duration: 0.45, ease: "power3.out" });
    const ry = gsap.quickTo(r, "y", { duration: 0.45, ease: "power3.out" });

    let state = "";
    let currentLabel = "";
    const setState = (next: string, text = "") => {
      if (next === state && text === currentLabel) return;
      state = next;
      currentLabel = text;
      setLabel(text);
      const presets: Record<string, gsap.TweenVars> = {
        idle: { width: 36, height: 36, backgroundColor: "rgba(200,255,46,0)", borderColor: "rgba(237,238,242,0.35)", borderRadius: 999 },
        hover: { width: 64, height: 64, backgroundColor: "rgba(200,255,46,0.06)", borderColor: "rgba(200,255,46,0.8)", borderRadius: 999 },
        label: { width: 96, height: 96, backgroundColor: "rgba(200,255,46,1)", borderColor: "rgba(200,255,46,1)", borderRadius: 999 },
        text: { width: 3, height: 28, backgroundColor: "rgba(200,255,46,1)", borderColor: "rgba(200,255,46,1)", borderRadius: 2 },
      };
      gsap.to(r, { ...presets[next], duration: 0.4, ease: "expo.out", overwrite: "auto" });
      gsap.to(d, { scale: next === "idle" ? 1 : 0, duration: 0.25, overwrite: "auto" });
    };
    setState("idle");

    const move = (e: PointerEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (!t?.closest) return;
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      if (labelled) return setState("label", labelled.dataset.cursor ?? "");
      if (t.closest(TEXT)) return setState("text");
      if (t.closest(INTERACTIVE)) return setState("hover");
      setState("idle");
    };
    const down = () => gsap.to(r, { scale: 0.85, duration: 0.2 });
    const up = () => gsap.to(r, { scale: 1, duration: 0.3 });
    const leave = () => gsap.to([d, r], { autoAlpha: 0, duration: 0.2 });
    const enter = () => gsap.to([d, r], { autoAlpha: 1, duration: 0.2 });

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);

    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="no-print pointer-events-none fixed top-0 left-0 z-[100] flex items-center justify-center border border-text/30 mix-blend-normal"
        style={{ width: 36, height: 36, borderRadius: 999 }}
      >
        <span className="label-mono text-[0.65rem] font-medium text-signature-ink">{label}</span>
      </div>
      <div
        ref={dot}
        aria-hidden
        className="no-print pointer-events-none fixed top-0 left-0 z-[100] h-1.5 w-1.5 rounded-full bg-signature"
      />
    </>
  );
}
