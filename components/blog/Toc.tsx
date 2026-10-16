"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Sticky contents list; highlights the section being read. */
export function Toc({ headings }: { headings: { id: string; text: string; level: 2 | 3 }[] }) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [headings]);

  const h2s = headings.filter((h) => h.level === 2);
  if (h2s.length < 3) return null;
  return (
    <nav aria-label="On this page">
      <p className="label-mono text-muted">On this page</p>
      <ol className="mt-5 space-y-2.5 border-l border-line">
        {h2s.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              aria-current={active === h.id ? "location" : undefined}
              className={cn(
                "-ml-px block border-l py-0.5 pl-4 text-sm leading-snug transition-colors",
                active === h.id ? "border-signature text-text" : "border-transparent text-muted hover:text-text",
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
