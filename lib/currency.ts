"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";

export type Currency = "INR" | "USD";
const KEY = "zl-currency";

/** Currency preference shared across pricing UIs (₹ default for India, $ elsewhere). */
export function useCurrency() {
  const [currency, setCurrency] = useState<Currency>(site.currency.default);
  // Read the saved preference after mount so server and client HTML match.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY) as Currency | null;
      if (saved === "INR" || saved === "USD") return setCurrency(saved);
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz && tz !== "Asia/Kolkata" && tz !== "Asia/Calcutta") setCurrency("USD");
    } catch {}
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */
  const set = (c: Currency) => {
    setCurrency(c);
    try {
      localStorage.setItem(KEY, c);
    } catch {}
  };
  return [currency, set] as const;
}

export function formatMoney(amount: number, currency: Currency) {
  return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
