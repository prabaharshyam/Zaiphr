/**
 * Global business info. Edit freely - components read from here.
 */
export const site = {
  name: "Zaiphr Labs",
  shortName: "Zaiphr",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zaiphr.in",
  tagline: "AI Automation, Websites & Apps for Businesses",
  /** The line under the logo lockup. */
  slogan: "Intelligence, encoded.",
  /** One sentence on what we do, in plain words. */
  category: "AI agency for startups and small businesses",
  positioning:
    "We help startups and small businesses grow with AI. We automate the busywork, set up AI assistants that answer calls and WhatsApp messages, and build the websites, apps and marketing that bring in customers.",
  description:
    "Zaiphr Labs is an AI agency in India. We build AI automations, AI voice agents, websites, mobile apps, branding and marketing for startups and small businesses.",
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
