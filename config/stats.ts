/**
 * Home "impact" counters. Keep these honest — capabilities and commitments,
 * not invented client results. Swap in real numbers as they accrue.
 */
export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  note?: string;
}

export const stats: Stat[] = [
  { value: 7, label: "Service engines", note: "AI, product, brand and growth under one roof" },
  { value: 20, suffix: "+", label: "AI use cases mapped", note: "Ready-to-build playbooks by industry" },
  { value: 24, suffix: "/7", label: "Agents on duty", note: "Voice and chat agents never clock out" },
  { value: 14, label: "Days to a first working prototype", note: "Our target for most automation builds" },
];
