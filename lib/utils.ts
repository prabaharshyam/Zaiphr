import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

/** Lowercase a label for mid-sentence use, keeping words like "AI", "CRM", "WhatsApp" and "SaaS" intact. */
export function lowerLabel(label: string) {
  return label
    .split(" ")
    .map((w) => (/[A-Z]/.test(w.slice(1)) ? w : w.toLowerCase()))
    .join(" ");
}
