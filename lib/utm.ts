"use client";

const KEY = "zl-utm";
const TTL = 90 * 24 * 60 * 60 * 1000;

export interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing?: string;
  ts: number;
}

/** First-touch attribution: stored on the first visit that carries UTM tags or an external referrer. */
export function captureAttribution() {
  try {
    const existing = getAttribution();
    if (existing) return;
    const params = new URLSearchParams(window.location.search);
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
    const data: Attribution = { ts: Date.now(), landing: window.location.pathname };
    keys.forEach((k) => {
      const v = params.get(k);
      if (v) data[k] = v.slice(0, 120);
    });
    const ref = document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : "";
    if (ref) data.referrer = ref.slice(0, 300);
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {}
}

export function getAttribution(): Attribution | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Attribution;
    if (Date.now() - data.ts > TTL) {
      localStorage.removeItem(KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}
