"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/** Accessible accordion (button + region). One open at a time. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="border-t border-line">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <li key={f.q} className="border-b border-line">
            <h3>
              <button
                type="button"
                id={`faq-btn-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium md:text-xl"
              >
                {f.q}
                <span
                  aria-hidden
                  className={cn(
                    "relative grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors duration-300",
                    isOpen ? "border-signature bg-signature text-signature-ink" : "border-line-strong",
                  )}
                >
                  <span className="absolute h-px w-3.5 bg-current" />
                  <span className={cn("absolute h-3.5 w-px bg-current transition-transform duration-300", isOpen && "scale-y-0")} />
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-btn-${i}`}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out)]",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-7 leading-relaxed text-muted">{f.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
