import { cn } from "@/lib/utils";
import { MARK_PATHS, WORD_PATHS } from "@/lib/brand";

/**
 * The Zaiphr mark: two brackets split by a lit slash.
 * `mono` draws the slash in currentColor too (for use on a signature-coloured background).
 */
export function LogoMark({ className, title, mono = false }: { className?: string; title?: string; mono?: boolean }) {
  return (
    <svg
      viewBox="0 -69 661 661"
      className={cn("h-7 w-7", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d={MARK_PATHS.brackets} fill="currentColor" />
      <path d={MARK_PATHS.slash} fill={mono ? "currentColor" : "var(--signature)"} />
    </svg>
  );
}

/** The ZAIPHR wordmark, with the signature "I". */
export function Wordmark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 927 117"
      className={cn("h-4 w-auto", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d={WORD_PATHS.letters} fill="currentColor" fillRule="evenodd" />
      <path d={WORD_PATHS.i} fill="var(--signature)" />
    </svg>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark className="h-8 w-8" />
      {!compact && <Wordmark className="h-[0.9rem]" />}
    </span>
  );
}
