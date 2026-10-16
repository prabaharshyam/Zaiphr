"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/hooks";
import { onReady } from "@/lib/ready";
import { cn } from "@/lib/utils";

interface Props {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** lines = masked line slide, chars = per-character rise, words = soft word fade. */
  split?: "lines" | "chars" | "words";
  /** "scroll" plays when in view; "ready" plays after the preloader. */
  trigger?: "scroll" | "ready";
  delay?: number;
  stagger?: number;
}

export function RevealText({
  as: Tag = "div",
  children,
  className,
  split = "lines",
  trigger = "scroll",
  delay = 0,
  stagger,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const reveal = () => el.classList.add("is-revealed");

      if (prefersReducedMotion()) {
        reveal();
        gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, delay });
        return;
      }

      let cleanupReady = () => {};
      const s = SplitText.create(el, {
        type: split === "chars" ? "lines,chars" : split === "words" ? "lines,words" : "lines",
        mask: "lines",
        linesClass: "split-line",
        autoSplit: true,
        onSplit(self) {
          const targets = split === "chars" ? self.chars : split === "words" ? self.words : self.lines;
          gsap.set(targets, { yPercent: 110 });
          reveal();
          const play = () =>
            gsap.to(targets, {
              yPercent: 0,
              duration: split === "chars" ? 0.9 : 1.1,
              ease: "expo.out",
              stagger: stagger ?? (split === "chars" ? 0.018 : split === "words" ? 0.03 : 0.08),
              delay,
              scrollTrigger:
                trigger === "scroll" ? { trigger: el, start: "top 88%", once: true } : undefined,
            });
          if (trigger === "ready") {
            cleanupReady();
            let tween: gsap.core.Tween | undefined;
            cleanupReady = onReady(() => {
              tween = play();
            });
            return tween;
          }
          return play();
        },
      });
      return () => {
        cleanupReady();
        s.revert();
      };
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} data-reveal className={cn(className)}>
      {children}
    </Tag>
  );
}
