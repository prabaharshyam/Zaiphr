"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav } from "@/config/navigation";
import { services } from "@/config/services";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { MobileMenu } from "./MobileMenu";
import { LocalTime } from "./LocalTime";

export function Nav() {
  const pathname = usePathname();
  const bar = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    let hidden = false;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const goingDown = y > last && y > 160;
      if (goingDown !== hidden && !menuOpen) {
        hidden = goingDown;
        gsap.to(bar.current, { yPercent: hidden ? -110 : 0, duration: 0.6, ease: "expo.out" });
        if (hidden) setMegaOpen(false);
      }
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  // Close menus on route change.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync UI with route
    setMegaOpen(false);
    setMenuOpen(false);
    gsap.set(bar.current, { yPercent: 0 });
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <a
        href="#main"
        className="label-mono fixed top-3 left-3 z-[120] -translate-y-20 rounded-full bg-signature px-4 py-2 text-signature-ink focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        ref={bar}
        className="fixed inset-x-0 top-0 z-[70]"
        onPointerLeave={() => setMegaOpen(false)}
      >
        <div
          className={cn(
            "absolute inset-0 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
            scrolled || megaOpen
              ? "border-line bg-bg/70 backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
          aria-hidden
        />
        <nav
          aria-label="Main"
          className="container-x relative flex h-[var(--nav-h)] items-center justify-between gap-6"
        >
          <TransitionLink href="/" aria-label="Zaiphr Labs" className="relative z-10 shrink-0">
            <Logo />
          </TransitionLink>

          <ul className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => {
              const isServices = item.href === "/services";
              return (
                <li
                  key={item.href}
                  onPointerEnter={() => setMegaOpen(isServices)}
                >
                  <TransitionLink
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    aria-haspopup={isServices ? "true" : undefined}
                    aria-expanded={isServices ? megaOpen : undefined}
                    onFocus={() => setMegaOpen(isServices)}
                    className={cn(
                      "relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.85rem] transition-colors",
                      isActive(item.href) ? "text-text" : "text-muted hover:text-text",
                    )}
                  >
                    {isActive(item.href) && (
                      <span className="h-1 w-1 rounded-full bg-signature" aria-hidden />
                    )}
                    <ScrambleText text={item.label} duration={450} />
                    {isServices && (
                      <svg
                        viewBox="0 0 10 10"
                        aria-hidden
                        className={cn("h-2 w-2 transition-transform", megaOpen && "rotate-180")}
                      >
                        <path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                    )}
                  </TransitionLink>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4">
            <LocalTime className="hidden xl:flex" />
            <div className="hidden sm:block">
              <Button href="/contact" size="sm">
                Start a project
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="relative z-[90] flex h-10 items-center gap-3 rounded-full border border-line-strong px-4 lg:hidden"
            >
              <span className="label-mono">{menuOpen ? "Close" : "Menu"}</span>
              <span className="relative block h-2.5 w-4" aria-hidden>
                <span
                  className={cn(
                    "absolute left-0 h-px w-full bg-text transition-all duration-500",
                    menuOpen ? "top-1/2 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-px w-full bg-text transition-all duration-500",
                    menuOpen ? "top-1/2 -rotate-45" : "top-full",
                  )}
                />
              </span>
            </button>
          </div>
        </nav>

        {/* Services mega panel (desktop) */}
        <div
          className={cn(
            "absolute inset-x-0 top-full hidden overflow-hidden border-b border-line bg-bg/85 backdrop-blur-xl transition-[clip-path,opacity] duration-500 ease-[var(--ease-out)] lg:block",
            megaOpen
              ? "visible [clip-path:inset(0_0_0_0)] opacity-100"
              : "invisible [clip-path:inset(0_0_100%_0)] opacity-0",
          )}
        >
          <div className="container-x grid grid-cols-12 gap-8 py-10">
            <div className="col-span-3 flex flex-col justify-between gap-6">
              <p className="label-mono text-muted">Capabilities / 07</p>
              <p className="font-display-tight text-3xl">
                Seven engines.
                <br />
                <span className="text-muted">One studio.</span>
              </p>
              <TransitionLink
                href="/services"
                className="label-mono text-signature underline-offset-4 hover:underline"
              >
                All services →
              </TransitionLink>
            </div>
            <ul className="col-span-9 grid grid-cols-2 gap-x-8 xl:grid-cols-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <TransitionLink
                    href={`/services/${s.slug}`}
                    tabIndex={megaOpen ? 0 : -1}
                    className="group flex items-start gap-4 border-t border-line py-4 transition-colors hover:border-signature/60"
                  >
                    <span className="label-mono pt-1 text-muted group-hover:text-signature">{s.index}</span>
                    <span>
                      <span className="block text-base font-medium">{s.title}</span>
                      <span className="mt-1 line-clamp-2 block text-sm text-muted">{s.summary}</span>
                    </span>
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
