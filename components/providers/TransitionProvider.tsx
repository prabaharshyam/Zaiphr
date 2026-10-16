"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/hooks";
import { LogoMark } from "@/components/ui/Logo";
import { useLenis } from "./SmoothScroll";

interface TransitionCtx {
  navigate: (href: string) => void;
}

const Ctx = createContext<TransitionCtx>({ navigate: () => {} });
export const usePageTransition = () => useContext(Ctx);

/**
 * Route transitions: a dark panel with a signature light-edge wipes up over the page,
 * the route changes underneath, then the panel continues up and out.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const overlay = useRef<HTMLDivElement>(null);
  const pending = useRef<string | null>(null);
  const busy = useRef(false);

  const reveal = useCallback(() => {
    const el = overlay.current;
    if (!el) return;
    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    const reduced = prefersReducedMotion();
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(el, { yPercent: 100, autoAlpha: 0 });
        busy.current = false;
        lenis?.start();
        ScrollTrigger.refresh();
      },
    });
    if (reduced) tl.to(el, { autoAlpha: 0, duration: 0.25 });
    else
      tl.to(el, { yPercent: -100, duration: 0.8, ease: "expo.inOut", delay: 0.05 }).to(
        el.querySelector("[data-mark]"),
        { autoAlpha: 0, duration: 0.2 },
        0,
      );
  }, [lenis]);

  // Route changed → finish the transition.
  useEffect(() => {
    if (pending.current && pending.current === pathname) {
      pending.current = null;
      reveal();
    }
  }, [pathname, reveal]);

  const navigate = useCallback(
    (href: string) => {
      const target = href.split("#")[0].split("?")[0] || "/";
      if (busy.current) return;
      if (target === pathname) {
        router.push(href);
        return;
      }
      const el = overlay.current;
      if (!el) {
        router.push(href);
        return;
      }
      busy.current = true;
      pending.current = target;
      lenis?.stop();
      router.prefetch(href);
      const reduced = prefersReducedMotion();
      const mark = el.querySelector("[data-mark]");
      gsap.set(el, { autoAlpha: 1, yPercent: reduced ? 0 : 100 });
      const tl = gsap.timeline({
        onComplete: () => {
          router.push(href);
          // Safety: never leave the overlay stuck if navigation stalls.
          window.setTimeout(() => {
            if (pending.current === target) {
              pending.current = null;
              reveal();
            }
          }, 4000);
        },
      });
      if (reduced) tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 });
      else
        tl.to(el, { yPercent: 0, duration: 0.65, ease: "expo.inOut" }).fromTo(
          mark,
          { autoAlpha: 0, scale: 0.8 },
          { autoAlpha: 1, scale: 1, duration: 0.3, ease: "power2.out" },
          "-=0.25",
        );
    },
    [pathname, router, lenis, reveal],
  );

  return (
    <Ctx.Provider value={{ navigate }}>
      {children}
      <div
        ref={overlay}
        aria-hidden
        className="pointer-events-none invisible fixed inset-0 z-[95] flex translate-y-full items-center justify-center bg-bg-2"
      >
        <span className="absolute inset-x-0 top-0 h-px bg-signature shadow-[0_0_40px_6px_var(--signature-glow)]" />
        <span className="absolute inset-x-0 bottom-0 h-px bg-line-strong" />
        <span data-mark className="text-text">
          <LogoMark className="h-12 w-12" />
        </span>
      </div>
    </Ctx.Provider>
  );
}
