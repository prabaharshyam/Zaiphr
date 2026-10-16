/**
 * The seven Zaiphr Labs services. Order here = order on the site.
 * `form` names the shape the 3D core morphs into for this service (Phase 2).
 */
export type ServiceForm =
  | "graph"
  | "wave"
  | "grid"
  | "phone"
  | "glyph"
  | "film"
  | "orbit";

export interface Service {
  slug: string;
  index: string;
  title: string;
  short: string;
  summary: string;
  form: ServiceForm;
  capabilities: string[];
}

export const services: Service[] = [
  {
    slug: "ai-automations",
    index: "01",
    title: "AI Automations",
    short: "Automations",
    summary:
      "Workflows, CRM and ops automation, and AI agents that run your internal busywork while your team sleeps.",
    form: "graph",
    capabilities: ["Workflow automation", "CRM & ops", "Internal AI agents", "Document processing"],
  },
  {
    slug: "ai-voice-agents",
    index: "02",
    title: "AI Voice Agents",
    short: "Voice Agents",
    summary:
      "Inbound and outbound voice AI that answers, qualifies and books — plus WhatsApp and website chat agents.",
    form: "wave",
    capabilities: ["Inbound reception", "Outbound qualification", "WhatsApp bots", "Support agents"],
  },
  {
    slug: "websites",
    index: "03",
    title: "Websites",
    short: "Websites",
    summary:
      "High-end marketing sites, landing pages and e-commerce built to load fast and convert harder.",
    form: "grid",
    capabilities: ["Marketing sites", "Landing pages", "E-commerce", "CMS & SEO"],
  },
  {
    slug: "mobile-web-apps",
    index: "04",
    title: "Mobile & Web Apps",
    short: "Apps",
    summary:
      "MVPs, SaaS products and internal tools — designed, engineered and shipped in weeks, not quarters.",
    form: "phone",
    capabilities: ["MVPs", "SaaS products", "Internal tools", "iOS & Android"],
  },
  {
    slug: "branding-marketing",
    index: "05",
    title: "Branding & Marketing",
    short: "Brand",
    summary:
      "Identity systems, positioning and digital marketing that make a young company look inevitable.",
    form: "glyph",
    capabilities: ["Brand identity", "Positioning", "Digital marketing", "Performance strategy"],
  },
  {
    slug: "media-ads",
    index: "06",
    title: "Media & Ads",
    short: "Media",
    summary:
      "Short-form reels, YouTube, ad creatives and AI-assisted production — content that stops the scroll.",
    form: "film",
    capabilities: ["Ad creatives", "Reels & shorts", "YouTube", "AI-assisted production"],
  },
  {
    slug: "influencer-marketing",
    index: "07",
    title: "Influencer Marketing",
    short: "Influencers",
    summary:
      "Creator discovery, campaign design and performance tracking that turns attention into revenue.",
    form: "orbit",
    capabilities: ["Creator discovery", "Campaign design", "UGC programs", "Performance tracking"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
