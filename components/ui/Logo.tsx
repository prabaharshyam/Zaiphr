import { cn } from "@/lib/utils";

/** The Zaiphr mark: a chamfered Z with a lit "signal" pixel. */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("h-7 w-7", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path
        d="M5 6.5h19.5l2 2V11L12.2 23H27v3.5H7.5l-2-2V22L19.8 10H5z"
        fill="currentColor"
      />
      <rect x="27" y="2" width="3.2" height="3.2" fill="var(--signature)" />
    </svg>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      {!compact && (
        <span className="flex items-baseline gap-1.5">
          <span className="font-display text-[1.05rem] font-extrabold tracking-[-0.02em] [font-stretch:125%]">
            ZAIPHR
          </span>
          <span className="label-mono text-[0.6rem] text-muted">Labs</span>
        </span>
      )}
    </span>
  );
}
