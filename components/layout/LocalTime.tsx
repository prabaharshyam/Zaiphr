"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Live studio clock (IST) — a small "the lab is on" signal. */
export function LocalTime({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={cn("label-mono items-center gap-2 text-muted", className)}>
      <span
        className="h-1.5 w-1.5 rounded-full bg-signature"
        style={{ animation: "pulse-dot 2.4s ease-in-out infinite" }}
        aria-hidden
      />
      <span>IND</span>
      <span className="text-text tabular-nums" suppressHydrationWarning>
        {time ?? "--:--"}
      </span>
      <span>IST</span>
    </span>
  );
}
