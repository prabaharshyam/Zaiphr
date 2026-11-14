/**
 * The seven Zaiphr Labs practice areas. Order here = order on the site.
 * `form` names the shape the 3D core morphs into for this service.
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
    slug: "ai-strategy",
    index: "01",
    title: "AI Strategy & Advisory",
    short: "Strategy",
    summary:
      "Find where AI creates real value in your business, then turn it into a prioritised, costed roadmap your leadership can act on.",
    form: "orbit",
    capabilities: ["AI opportunity assessment", "Use-case prioritisation", "Business case & ROI", "AI operating model"],
  },
  {
    slug: "ai-agents-automation",
    index: "02",
    title: "AI Agents & Automation",
    short: "Agents",
    summary:
      "Agentic workflows and automation that take on real operational work inside the systems your teams already use.",
    form: "graph",
    capabilities: ["Agentic workflows", "Process automation", "Document intelligence", "Systems integration"],
  },
  {
    slug: "conversational-ai",
    index: "03",
    title: "Conversational & Voice AI",
    short: "Voice",
    summary:
      "Voice and chat agents that answer, qualify, book and resolve across phone, WhatsApp and web, in your customers' languages.",
    form: "wave",
    capabilities: ["Voice agents", "WhatsApp & chat agents", "Contact-centre AI", "Multilingual support"],
  },
  {
    slug: "data-knowledge-ai",
    index: "04",
    title: "Data & Knowledge AI",
    short: "Data",
    summary:
      "The data foundations and retrieval systems that let AI answer from your own knowledge, accurately and with sources.",
    form: "grid",
    capabilities: ["Data foundations", "Enterprise search & RAG", "Analytics & forecasting", "Model evaluation"],
  },
  {
    slug: "ai-product-engineering",
    index: "05",
    title: "AI Product Engineering",
    short: "Products",
    summary:
      "AI-native web platforms, mobile apps and digital experiences, designed and engineered to production standard.",
    form: "phone",
    capabilities: ["AI-native products", "Web & mobile apps", "Digital platforms", "Cloud & MLOps"],
  },
  {
    slug: "ai-enablement",
    index: "06",
    title: "AI Enablement & Governance",
    short: "Enablement",
    summary:
      "Training, adoption and responsible-AI guardrails, so your people use AI well and your AI stays safe, compliant and accountable.",
    form: "glyph",
    capabilities: ["Team training", "Adoption programmes", "Responsible AI", "DPDP & data privacy"],
  },
  {
    slug: "brand-growth",
    index: "07",
    title: "AI-Powered Brand & Growth",
    short: "Growth",
    summary:
      "Brand, content and growth marketing produced with AI-assisted workflows, to take what you build to market.",
    form: "film",
    capabilities: ["Brand & positioning", "AI-assisted content", "Performance marketing", "Creator programmes"],
  },
];

/** Old service URLs, kept as permanent redirects so links and search results keep working. */
export const legacyServiceSlugs: Record<string, string> = {
  "ai-automations": "ai-agents-automation",
  "ai-voice-agents": "conversational-ai",
  websites: "ai-product-engineering",
  "mobile-web-apps": "ai-product-engineering",
  "branding-marketing": "brand-growth",
  "media-ads": "brand-growth",
  "influencer-marketing": "brand-growth",
};

export const getService = (slug: string) => services.find((s) => s.slug === slug);
