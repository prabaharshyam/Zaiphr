"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/hooks";

const GLYPHS = "ZAIPHR0123456789#%&*+=<>/\\$@";

interface Props {
  text: string;
  className?: string;
  /** "hover" listens on the nearest interactive ancestor (or itself). */
  trigger?: "hover" | "mount" | "manual";
  duration?: number;
  delay?: number;
  /** Increment to replay when trigger="manual". */
  play?: number;
}

/**
 * Cipher-style decode: characters cycle through glyphs and lock in left → right.
 * Screen readers get the plain text; the animated layer is aria-hidden.
 */
export function ScrambleText({
  text,
  className,
  trigger = "hover",
  duration = 600,
  delay = 0,
  play = 0,
}: Props) {
  const el = useRef<HTMLSpanElement>(null);
  const raf = useRef(0);

  const run = useCallback(() => {
    const node = el.current;
    if (!node || prefersReducedMotion()) return;
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    const chars = [...text];
    const frame = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      let out = "";
      for (let i = 0; i < chars.length; i++) {
        const c = chars[i];
        if (c === " ") out += " ";
        else if (i / chars.length < p) out += c;
        else out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      node.textContent = out;
      if (p < 1) raf.current = requestAnimationFrame(frame);
      else node.textContent = text;
    };
    raf.current = requestAnimationFrame(frame);
  }, [text, duration]);

  useEffect(() => {
    if (trigger !== "mount") return;
    const t = window.setTimeout(run, delay);
    return () => window.clearTimeout(t);
  }, [trigger, run, delay]);

  useEffect(() => {
    if (trigger === "manual" && play > 0) run();
  }, [trigger, play, run]);

  useEffect(() => {
    if (trigger !== "hover" || !el.current) return;
    const host = el.current.closest("a, button") ?? el.current;
    host.addEventListener("pointerenter", run);
    host.addEventListener("focus", run);
    return () => {
      host.removeEventListener("pointerenter", run);
      host.removeEventListener("focus", run);
    };
  }, [trigger, run]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <span className={cn("relative inline-block", className)}>
      <span className="sr-only">{text}</span>
      <span ref={el} aria-hidden className="whitespace-pre-wrap">
        {text}
      </span>
    </span>
  );
}
