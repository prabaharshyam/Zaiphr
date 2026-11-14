/**
 * Global business info. Edit freely - components read from here.
 */
export const site = {
  name: "Zaiphr Labs",
  shortName: "Zaiphr",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zaiphr.in",
  tagline: "AI Consulting & Labs",
  /** The line under the logo lockup. */
  slogan: "Intelligence, encoded.",
  /** One sentence on what we do, in plain words. */
  category: "AI consulting and engineering firm",
  positioning:
    "We help organisations find where AI creates real value, prove it quickly in our labs, and build production systems that run, scale and pay back.",
  description:
    "Zaiphr Labs is an AI consulting and engineering firm in India. We shape AI strategy and build AI agents, automation and AI products that run in production.",
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
