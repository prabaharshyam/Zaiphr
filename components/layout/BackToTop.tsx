"use client";

import { useLenis } from "@/components/providers/SmoothScroll";

export function BackToTop() {
  const lenis = useLenis();
  return (
    <button
      type="button"
      onClick={() => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
      className="label-mono self-start transition-colors hover:text-signature md:self-auto"
    >
      Back to top ↑
    </button>
  );
}
