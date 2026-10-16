"use client";

import { toggleSave, useAccount } from "@/lib/news/account";
import { cn } from "@/lib/utils";

export function SaveButton({ id, headline, className }: { id: string; headline: string; className?: string }) {
  const { saved, available } = useAccount();
  if (!available) return null;
  const on = saved.has(id);
  return (
    <button
      type="button"
      onClick={() => void toggleSave(id)}
      aria-pressed={on}
      aria-label={on ? `Remove “${headline}” from saved` : `Save “${headline}”`}
      className={cn(
        "label-mono inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-[0.62rem] transition-colors",
        on ? "border-signature bg-signature text-signature-ink" : "border-line-strong text-muted hover:border-text hover:text-text",
        className,
      )}
    >
      <svg viewBox="0 0 16 16" aria-hidden className="h-3.5 w-3.5" fill={on ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
        <path d="M4 2.5h8v11l-4-2.8-4 2.8z" strokeLinejoin="round" />
      </svg>
      {on ? "Saved" : "Save"}
    </button>
  );
}
