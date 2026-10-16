/**
 * Global business info. Edit freely — components read from here.
 */
export const site = {
  name: "Zaiphr Labs",
  shortName: "Zaiphr",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://zaiphr.com",
  tagline: "AI-native engines for ambitious teams",
  positioning:
    "We build the AI-powered engines that let small teams move like big companies.",
  description:
    "Zaiphr Labs is an AI-native tech studio. We design and ship AI automations, voice agents, websites, apps, brands and campaigns for founders, startups and growing businesses.",
  email: "hello@zaiphr.com",
  phone: "+91 00000 00000", // TODO: replace with real number
  whatsapp: "910000000000", // TODO: digits only, used for wa.me links
  calendlyUrl: "https://calendly.com/zaiphr/strategy-call", // TODO: replace
  location: "India · Working globally",
  currency: { default: "INR" as "INR" | "USD", usdToInr: 84 },
  socials: [
    { label: "Instagram", href: "https://instagram.com/zaiphrlabs" },
    { label: "LinkedIn", href: "https://linkedin.com/company/zaiphrlabs" },
    { label: "X", href: "https://x.com/zaiphrlabs" },
    { label: "YouTube", href: "https://youtube.com/@zaiphrlabs" },
  ],
} as const;

export type Site = typeof site;
