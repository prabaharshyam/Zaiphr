"use client";

import { cn } from "@/lib/utils";
import type { Currency } from "@/lib/currency";

export function CurrencyToggle({ value, onChange }: { value: Currency; onChange: (c: Currency) => void }) {
  return (
    <div role="radiogroup" aria-label="Currency" className="relative inline-flex rounded-full border border-line-strong p-1">
      <span
        aria-hidden
        className={cn(
          "absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-signature transition-transform duration-500 ease-[var(--ease-out)]",
          value === "USD" ? "translate-x-full" : "translate-x-0",
        )}
      />
      {(["INR", "USD"] as Currency[]).map((c) => (
        <button
          key={c}
          role="radio"
          aria-checked={value === c}
          onClick={() => onChange(c)}
          className={cn("label-mono relative z-10 w-16 rounded-full py-2 transition-colors", value === c ? "text-signature-ink" : "text-muted")}
        >
          {c === "INR" ? "₹ INR" : "$ USD"}
        </button>
      ))}
    </div>
  );
}
