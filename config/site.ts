/**
 * Global business info. Edit freely - components read from here.
 */
export const site = {
  name: "Zaiphr Labs",
  shortName: "Zaiphr",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zaiphr.in",
  tagline: "AI-native engines for ambitious teams",
  positioning:
    "We build the AI-powered engines that let small teams move like big companies.",
  description:
    "Zaiphr Labs is an AI-native tech studio. We design and ship AI automations, voice agents, websites, apps, brands and campaigns for founders, startups and growing businesses.",
  email: "shyam@zaiphr.in",
  phone: "+91 86087 61359",
  whatsapp: "918608761359", // digits only, used for wa.me links
  calendlyUrl: "https://calendly.com/prabaharshyam/30min",
  location: "India · Working globally",
  currency: { default: "INR" as "INR" | "USD", usdToInr: 84 },
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/zaiphr.ai/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/zaiphr-lab/" },
    { label: "X", href: "https://x.com/shyamprabahar" },
    { label: "YouTube", href: "https://www.youtube.com/@Shyamspeakz" },
  ],
} as const;

export type Site = typeof site;
