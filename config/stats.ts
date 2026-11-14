/**
 * Home "impact" counters. Keep these honest - capabilities and commitments,
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
  { value: 7, label: "Practice areas", note: "Strategy, engineering, enablement and growth in one team" },
  { value: 3, label: "Weeks to a costed AI roadmap", note: "Our Opportunity Sprint, from kickoff to plan" },
  { value: 6, label: "Weeks to a working prototype", note: "Labs Prototype on your own data" },
  { value: 7, label: "Industries we design for", note: "From financial services to hospitality" },
];
