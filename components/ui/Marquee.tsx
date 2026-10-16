import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** CSS-only infinite marquee (content duplicated once, second copy hidden from AT). */
export function Marquee({
  children,
  duration = 40,
  className,
  reverse = false,
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
  reverse?: boolean;
}) {
  return (
    <div data-clip-ok className={cn("group relative flex overflow-hidden", className)}>
      <div
        className="animate-marquee flex w-max shrink-0 group-hover:[animation-play-state:paused]"
        style={{ ["--marquee-duration" as string]: `${duration}s`, animationDirection: reverse ? "reverse" : undefined }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
