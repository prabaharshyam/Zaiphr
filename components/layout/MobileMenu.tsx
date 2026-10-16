"use client";

import { useEffect, useRef } from "react";
import { mainNav } from "@/config/navigation";
import { site } from "@/config/site";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { useLenis } from "@/components/providers/SmoothScroll";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Button } from "@/components/ui/Button";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const items = el.querySelectorAll("[data-mm-item]");
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      gsap.set(el, { visibility: "visible" });
      gsap.fromTo(
        el,
        { clipPath: "circle(0% at calc(100% - 3rem) 2.25rem)" },
        { clipPath: "circle(150% at calc(100% - 3rem) 2.25rem)", duration: 0.9, ease: "expo.inOut" },
      );
      gsap.fromTo(
        items,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, ease: "expo.out", stagger: 0.05, delay: 0.3 },
      );
      el.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
      gsap.to(el, {
        clipPath: "circle(0% at calc(100% - 3rem) 2.25rem)",
        duration: 0.6,
        ease: "expo.inOut",
        onComplete: () => {
          gsap.set(el, { visibility: "hidden" });
        },
      });
    }
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      className="invisible fixed inset-0 z-[65] flex flex-col bg-bg-2 pt-[var(--nav-h)] lg:hidden"
      style={{ clipPath: "circle(0% at calc(100% - 3rem) 2.25rem)" }}
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <nav aria-label="Mobile" className="container-x relative flex flex-1 flex-col justify-center">
        <ul className="flex flex-col">
          {[...mainNav, { label: "Contact", href: "/contact" }].map((item, i) => (
            <li key={item.href} className="overflow-hidden border-b border-line">
              <TransitionLink
                href={item.href}
                tabIndex={open ? 0 : -1}
                onClick={onClose}
                data-mm-item
                className="flex items-baseline justify-between py-3.5"
              >
                <span className="font-display-tight text-[clamp(2.4rem,11vw,4.5rem)]">{item.label}</span>
                <span className="label-mono text-muted">0{i + 1}</span>
              </TransitionLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className={cn("container-x relative flex flex-col gap-6 pb-8")}>
        <div data-mm-item>
          <Button href="/contact" size="lg" className="w-full justify-between" magnetic={false}>
            Start a project
          </Button>
        </div>
        <div data-mm-item className="label-mono flex flex-wrap gap-x-5 gap-y-2 text-muted">
          {site.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
