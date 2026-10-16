/**
 * Curated catalog of real AI & automation tools used by the AI Stack Finder and the
 * /ai-tools SEO pages. Recommendations can ONLY come from this list — add a tool here
 * to make it recommendable.
 *
 * Pricing is deliberately coarse (plans change often): "free" = genuinely free to use,
 * "freemium" = useful free plan + paid tiers, "trial" = free trial then paid,
 * "usage" = pay-as-you-go, "paid" = paid only, "open-source" = free to self-host.
 * Always link users to the vendor for current pricing.
 */

export type Pricing = "free" | "freemium" | "trial" | "usage" | "paid" | "open-source";
export type Difficulty = "easy" | "medium" | "advanced";

export const toolCategories = {
  assistants: "AI assistants & research",
  writing: "Writing & content",
  design: "Design & images",
  video: "Video & audio",
  voice: "Voice agents & calling",
  chat: "Chatbots & WhatsApp",
  automation: "Automation & integrations",
  crm: "CRM & sales",
  outreach: "Prospecting & outreach",
  email: "Email marketing",
  social: "Social media",
  seo: "SEO & analytics",
  meetings: "Meetings & notes",
  support: "Customer support",
  finance: "Finance, billing & payments",
  documents: "Documents & data extraction",
  hr: "HR, hiring & payroll",
  web: "Websites & no-code",
  apps: "App building & coding",
  ecommerce: "E-commerce & logistics",
  productivity: "Productivity & projects",
  scheduling: "Scheduling & forms",
} as const;
export type ToolCategory = keyof typeof toolCategories;

export interface AiTool {
  id: string;
  name: string;
  url: string;
  category: ToolCategory;
  tagline: string;
  pricing: Pricing;
  difficulty: Difficulty;
  /** Indian-market relevance: INR billing, GST, UPI, WhatsApp, Indian languages/telephony. */
  india?: string;
  tags: string[];
}

export const pricingLabel: Record<Pricing, string> = {
  free: "Free",
  freemium: "Free plan",
  trial: "Free trial",
  usage: "Pay as you go",
  paid: "Paid",
  "open-source": "Open source",
};

export const aiTools: AiTool[] = [
  // ── Assistants & research ──
  { id: "chatgpt", name: "ChatGPT", url: "https://chatgpt.com", category: "assistants", tagline: "General-purpose AI assistant for drafting, analysis and brainstorming.", pricing: "freemium", difficulty: "easy", tags: ["writing", "research", "ideas", "analysis", "custom gpts"] },
  { id: "claude", name: "Claude", url: "https://claude.ai", category: "assistants", tagline: "AI assistant strong at long documents, careful writing and analysis.", pricing: "freemium", difficulty: "easy", tags: ["writing", "documents", "analysis", "coding", "research"] },
  { id: "gemini", name: "Google Gemini", url: "https://gemini.google.com", category: "assistants", tagline: "Google's assistant, built into Gmail, Docs and Sheets.", pricing: "freemium", difficulty: "easy", tags: ["google workspace", "email", "sheets", "research"] },
  { id: "perplexity", name: "Perplexity", url: "https://www.perplexity.ai", category: "assistants", tagline: "AI search engine with cited sources for market and competitor research.", pricing: "freemium", difficulty: "easy", tags: ["research", "competitors", "market research", "sources"] },
  { id: "copilot", name: "Microsoft Copilot", url: "https://copilot.microsoft.com", category: "assistants", tagline: "AI assistant across Word, Excel, Outlook and Teams.", pricing: "freemium", difficulty: "easy", tags: ["microsoft 365", "excel", "email", "documents"] },
  { id: "notebooklm", name: "NotebookLM", url: "https://notebooklm.google.com", category: "assistants", tagline: "Upload your documents and get answers, summaries and audio overviews grounded in them.", pricing: "free", difficulty: "easy", tags: ["knowledge base", "training", "sops", "documents", "research"] },
  { id: "sarvam", name: "Sarvam AI", url: "https://www.sarvam.ai", category: "assistants", tagline: "Indian AI models for Indic languages — chat, translation, speech.", pricing: "usage", difficulty: "medium", india: "Built for Indian languages (Hindi, Tamil, Telugu, Kannada and more)", tags: ["indian languages", "translation", "speech", "hindi"] },

  // ── Writing & content ──
  { id: "grammarly", name: "Grammarly", url: "https://www.grammarly.com", category: "writing", tagline: "Writing assistant for clear, error-free emails and documents.", pricing: "freemium", difficulty: "easy", tags: ["email", "proofreading", "tone"] },
  { id: "jasper", name: "Jasper", url: "https://www.jasper.ai", category: "writing", tagline: "AI marketing copy with brand voice controls for teams.", pricing: "trial", difficulty: "easy", tags: ["marketing copy", "brand voice", "blogs", "ads"] },
  { id: "copyai", name: "Copy.ai", url: "https://www.copy.ai", category: "writing", tagline: "AI workflows for sales and marketing copy at scale.", pricing: "freemium", difficulty: "easy", tags: ["sales copy", "marketing", "workflows", "product descriptions"] },
  { id: "notion-ai", name: "Notion AI", url: "https://www.notion.com/product/ai", category: "writing", tagline: "AI inside your Notion wiki — summarise, draft and search your workspace.", pricing: "paid", difficulty: "easy", tags: ["wiki", "notes", "sops", "knowledge base"] },
  { id: "gamma", name: "Gamma", url: "https://gamma.app", category: "writing", tagline: "Generate polished presentations, one-pagers and simple sites from a prompt.", pricing: "freemium", difficulty: "easy", tags: ["presentations", "pitch deck", "proposals", "slides"] },

  // ── Design & images ──
  { id: "canva", name: "Canva", url: "https://www.canva.com", category: "design", tagline: "Design anything with templates and Magic Studio AI tools.", pricing: "freemium", difficulty: "easy", india: "INR pricing; widely used by Indian SMBs", tags: ["social posts", "graphics", "branding", "presentations", "background removal"] },
  { id: "firefly", name: "Adobe Firefly", url: "https://firefly.adobe.com", category: "design", tagline: "Commercially safe AI image generation and editing.", pricing: "freemium", difficulty: "easy", tags: ["images", "ads", "product shots", "generative fill"] },
  { id: "midjourney", name: "Midjourney", url: "https://www.midjourney.com", category: "design", tagline: "High-end AI image generation for creative visuals.", pricing: "paid", difficulty: "medium", tags: ["images", "creative", "concept art", "ads"] },
  { id: "ideogram", name: "Ideogram", url: "https://ideogram.ai", category: "design", tagline: "AI images that render text accurately — posters, logos, ads.", pricing: "freemium", difficulty: "easy", tags: ["posters", "text in images", "logos", "ads"] },
  { id: "photoroom", name: "Photoroom", url: "https://www.photoroom.com", category: "design", tagline: "Studio-quality product photos from your phone in seconds.", pricing: "freemium", difficulty: "easy", india: "Popular with Meesho, Flipkart and Amazon India sellers", tags: ["product photos", "background removal", "e-commerce", "catalog"] },
  { id: "looka", name: "Looka", url: "https://looka.com", category: "design", tagline: "AI logo and brand kit generator for new businesses.", pricing: "paid", difficulty: "easy", tags: ["logo", "branding", "brand kit"] },

  // ── Video & audio ──
  { id: "capcut", name: "CapCut", url: "https://www.capcut.com", category: "video", tagline: "Fast short-form video editing with auto-captions and templates.", pricing: "freemium", difficulty: "easy", tags: ["reels", "shorts", "captions", "video editing"] },
  { id: "descript", name: "Descript", url: "https://www.descript.com", category: "video", tagline: "Edit video and podcasts by editing the transcript.", pricing: "freemium", difficulty: "easy", tags: ["podcasts", "video editing", "transcription", "repurposing"] },
  { id: "opusclip", name: "OpusClip", url: "https://www.opus.pro", category: "video", tagline: "Turn long videos into viral short clips automatically.", pricing: "freemium", difficulty: "easy", tags: ["shorts", "repurposing", "youtube", "clips"] },
  { id: "heygen", name: "HeyGen", url: "https://www.heygen.com", category: "video", tagline: "AI avatar videos and translation with lip-sync.", pricing: "freemium", difficulty: "easy", tags: ["avatars", "video translation", "explainers", "training videos"] },
  { id: "synthesia", name: "Synthesia", url: "https://www.synthesia.io", category: "video", tagline: "Professional AI-presenter videos for training and explainers.", pricing: "freemium", difficulty: "easy", tags: ["training videos", "avatars", "explainers", "onboarding"] },
  { id: "runway", name: "Runway", url: "https://runwayml.com", category: "video", tagline: "Generative video for creative ad and content production.", pricing: "freemium", difficulty: "medium", tags: ["video generation", "ads", "creative", "b-roll"] },
  { id: "elevenlabs", name: "ElevenLabs", url: "https://elevenlabs.io", category: "video", tagline: "Realistic AI voiceovers and dubbing in many languages.", pricing: "freemium", difficulty: "easy", india: "Supports Hindi and other Indian languages", tags: ["voiceover", "dubbing", "text to speech", "audio"] },
  { id: "murf", name: "Murf", url: "https://murf.ai", category: "video", tagline: "Studio-quality AI voiceovers for videos and presentations.", pricing: "freemium", difficulty: "easy", tags: ["voiceover", "text to speech", "presentations"] },

  // ── Voice agents & calling ──
  { id: "vapi", name: "Vapi", url: "https://vapi.ai", category: "voice", tagline: "Developer platform to build and deploy AI voice agents.", pricing: "usage", difficulty: "advanced", tags: ["voice agent", "phone calls", "receptionist", "outbound calls", "appointment booking"] },
  { id: "retell", name: "Retell AI", url: "https://www.retellai.com", category: "voice", tagline: "Build human-like AI phone agents for inbound and outbound calls.", pricing: "usage", difficulty: "medium", tags: ["voice agent", "phone calls", "receptionist", "lead qualification", "appointment booking"] },
  { id: "bland", name: "Bland AI", url: "https://www.bland.ai", category: "voice", tagline: "Enterprise AI phone calling at scale.", pricing: "usage", difficulty: "advanced", tags: ["outbound calls", "voice agent", "call center"] },
  { id: "bolna", name: "Bolna", url: "https://www.bolna.ai", category: "voice", tagline: "Voice AI agents built for Indian languages and accents.", pricing: "usage", difficulty: "medium", india: "Indian languages, Indian telephony integrations", tags: ["voice agent", "hindi", "phone calls", "lead qualification", "reminders"] },
  { id: "exotel", name: "Exotel", url: "https://exotel.com", category: "voice", tagline: "Indian cloud telephony — virtual numbers, IVR, call tracking.", pricing: "paid", difficulty: "medium", india: "Indian virtual numbers and compliant telephony", tags: ["ivr", "virtual number", "call tracking", "telephony"] },
  { id: "twilio", name: "Twilio", url: "https://www.twilio.com", category: "voice", tagline: "Programmable phone numbers, SMS and WhatsApp APIs.", pricing: "usage", difficulty: "advanced", tags: ["sms", "phone numbers", "api", "whatsapp api"] },

  // ── Chatbots & WhatsApp ──
  { id: "wati", name: "WATI", url: "https://www.wati.io", category: "chat", tagline: "WhatsApp Business API inbox, broadcasts and chatbots.", pricing: "trial", difficulty: "easy", india: "WhatsApp-first, INR pricing", tags: ["whatsapp", "broadcasts", "chatbot", "shared inbox"] },
  { id: "interakt", name: "Interakt", url: "https://www.interakt.shop", category: "chat", tagline: "WhatsApp commerce, catalogs and automated notifications.", pricing: "trial", difficulty: "easy", india: "Indian WhatsApp commerce platform (Jio Haptik)", tags: ["whatsapp", "catalog", "order updates", "broadcasts"] },
  { id: "aisensy", name: "AiSensy", url: "https://aisensy.com", category: "chat", tagline: "WhatsApp marketing, chatbots and click-to-WhatsApp ads.", pricing: "freemium", difficulty: "easy", india: "Indian WhatsApp marketing platform", tags: ["whatsapp", "marketing", "chatbot", "ads"] },
  { id: "gallabox", name: "Gallabox", url: "https://gallabox.com", category: "chat", tagline: "WhatsApp-first conversational CRM with bots and payments.", pricing: "trial", difficulty: "easy", india: "Indian, supports UPI payment links on WhatsApp", tags: ["whatsapp", "crm", "chatbot", "payments"] },
  { id: "tidio", name: "Tidio", url: "https://www.tidio.com", category: "chat", tagline: "Website live chat with an AI agent (Lyro) for FAQs.", pricing: "freemium", difficulty: "easy", tags: ["website chat", "faq", "support", "chatbot"] },
  { id: "chatbase", name: "Chatbase", url: "https://www.chatbase.co", category: "chat", tagline: "Train a support chatbot on your website and documents.", pricing: "freemium", difficulty: "easy", tags: ["chatbot", "website chat", "faq", "knowledge base"] },
  { id: "botpress", name: "Botpress", url: "https://botpress.com", category: "chat", tagline: "Build advanced AI chatbots for web, WhatsApp and more.", pricing: "freemium", difficulty: "medium", tags: ["chatbot", "whatsapp", "custom bots", "automation"] },
  { id: "manychat", name: "ManyChat", url: "https://manychat.com", category: "chat", tagline: "Automate Instagram DMs, comments and WhatsApp conversations.", pricing: "freemium", difficulty: "easy", tags: ["instagram", "dm automation", "comments", "lead capture"] },

  // ── Automation & integrations ──
  { id: "zapier", name: "Zapier", url: "https://zapier.com", category: "automation", tagline: "Connect 7,000+ apps and automate workflows without code.", pricing: "freemium", difficulty: "easy", tags: ["integrations", "workflows", "no-code", "ai agents"] },
  { id: "make", name: "Make", url: "https://www.make.com", category: "automation", tagline: "Visual automation builder for complex, multi-step workflows.", pricing: "freemium", difficulty: "medium", tags: ["integrations", "workflows", "visual builder"] },
  { id: "n8n", name: "n8n", url: "https://n8n.io", category: "automation", tagline: "Open-source workflow automation with AI agents; self-host or cloud.", pricing: "open-source", difficulty: "advanced", tags: ["workflows", "ai agents", "self-hosted", "data privacy"] },
  { id: "pabbly", name: "Pabbly Connect", url: "https://www.pabbly.com/connect/", category: "automation", tagline: "Affordable app integrations and automation.", pricing: "trial", difficulty: "easy", india: "Indian company; INR pricing", tags: ["integrations", "workflows", "budget"] },

  // ── CRM & sales ──
  { id: "hubspot", name: "HubSpot CRM", url: "https://www.hubspot.com/products/crm", category: "crm", tagline: "Free CRM with pipelines, email tracking and marketing tools.", pricing: "freemium", difficulty: "easy", tags: ["crm", "pipeline", "lead tracking", "email tracking"] },
  { id: "zoho-crm", name: "Zoho CRM", url: "https://www.zoho.com/crm/", category: "crm", tagline: "Flexible CRM with Zia AI, part of the Zoho suite.", pricing: "freemium", difficulty: "medium", india: "Indian company; INR pricing and GST invoices", tags: ["crm", "pipeline", "lead management", "zoho"] },
  { id: "freshsales", name: "Freshsales", url: "https://www.freshworks.com/crm/sales/", category: "crm", tagline: "AI-powered CRM with built-in phone and email.", pricing: "freemium", difficulty: "easy", india: "Freshworks (Indian-origin); INR pricing", tags: ["crm", "pipeline", "calling", "lead scoring"] },
  { id: "pipedrive", name: "Pipedrive", url: "https://www.pipedrive.com", category: "crm", tagline: "Simple, visual sales pipeline CRM.", pricing: "trial", difficulty: "easy", tags: ["crm", "pipeline", "deals"] },
  { id: "leadsquared", name: "LeadSquared", url: "https://www.leadsquared.com", category: "crm", tagline: "High-velocity sales CRM for education, healthcare and real estate.", pricing: "paid", difficulty: "medium", india: "Indian; strong in edtech, healthcare, real estate", tags: ["crm", "lead management", "field sales", "education", "real estate"] },

  // ── Prospecting & outreach ──
  { id: "apollo", name: "Apollo.io", url: "https://www.apollo.io", category: "outreach", tagline: "B2B contact database with email sequences.", pricing: "freemium", difficulty: "easy", tags: ["prospecting", "b2b leads", "email sequences", "contact data"] },
  { id: "clay", name: "Clay", url: "https://www.clay.com", category: "outreach", tagline: "Enrich leads from many data sources and personalise outreach with AI.", pricing: "freemium", difficulty: "advanced", tags: ["lead enrichment", "personalisation", "prospecting"] },
  { id: "instantly", name: "Instantly", url: "https://instantly.ai", category: "outreach", tagline: "Cold email at scale with warm-up and deliverability tools.", pricing: "trial", difficulty: "medium", tags: ["cold email", "deliverability", "outreach"] },
  { id: "lemlist", name: "lemlist", url: "https://www.lemlist.com", category: "outreach", tagline: "Personalised multichannel outreach (email + LinkedIn).", pricing: "trial", difficulty: "medium", tags: ["cold email", "linkedin", "outreach", "personalisation"] },

  // ── Email marketing ──
  { id: "brevo", name: "Brevo", url: "https://www.brevo.com", category: "email", tagline: "Email, SMS and WhatsApp campaigns with automation.", pricing: "freemium", difficulty: "easy", tags: ["email marketing", "newsletters", "sms", "automation"] },
  { id: "mailchimp", name: "Mailchimp", url: "https://mailchimp.com", category: "email", tagline: "Email marketing with AI content and segmentation.", pricing: "freemium", difficulty: "easy", tags: ["email marketing", "newsletters", "segmentation"] },
  { id: "klaviyo", name: "Klaviyo", url: "https://www.klaviyo.com", category: "email", tagline: "E-commerce email and SMS automation, deep Shopify integration.", pricing: "freemium", difficulty: "medium", tags: ["e-commerce", "abandoned cart", "email flows", "shopify"] },
  { id: "beehiiv", name: "beehiiv", url: "https://www.beehiiv.com", category: "email", tagline: "Newsletter platform with growth and monetisation tools.", pricing: "freemium", difficulty: "easy", tags: ["newsletter", "audience growth", "content"] },

  // ── Social media ──
  { id: "buffer", name: "Buffer", url: "https://buffer.com", category: "social", tagline: "Plan, schedule and analyse social posts with an AI assistant.", pricing: "freemium", difficulty: "easy", tags: ["scheduling", "social media", "instagram", "linkedin"] },
  { id: "metricool", name: "Metricool", url: "https://metricool.com", category: "social", tagline: "Social scheduling, analytics and ad reporting in one place.", pricing: "freemium", difficulty: "easy", tags: ["scheduling", "analytics", "social media", "reporting"] },
  { id: "hootsuite", name: "Hootsuite", url: "https://www.hootsuite.com", category: "social", tagline: "Social management for teams with listening and inbox.", pricing: "trial", difficulty: "medium", tags: ["social media", "team", "listening", "inbox"] },

  // ── SEO & analytics ──
  { id: "google-business-profile", name: "Google Business Profile", url: "https://www.google.com/business/", category: "seo", tagline: "Manage your Google Maps listing, posts and replies to reviews.", pricing: "free", difficulty: "easy", tags: ["reviews", "google maps", "local seo", "listing"] },
  { id: "gsc", name: "Google Search Console", url: "https://search.google.com/search-console", category: "seo", tagline: "See how Google indexes your site and which searches bring traffic.", pricing: "free", difficulty: "easy", tags: ["seo", "google", "indexing", "keywords"] },
  { id: "ga4", name: "Google Analytics 4", url: "https://analytics.google.com", category: "seo", tagline: "Website traffic and conversion analytics.", pricing: "free", difficulty: "medium", tags: ["analytics", "conversions", "traffic"] },
  { id: "clarity", name: "Microsoft Clarity", url: "https://clarity.microsoft.com", category: "seo", tagline: "Free heatmaps and session recordings to find UX problems.", pricing: "free", difficulty: "easy", tags: ["heatmaps", "session recording", "conversion", "ux"] },
  { id: "semrush", name: "Semrush", url: "https://www.semrush.com", category: "seo", tagline: "Keyword research, competitor SEO and site audits.", pricing: "trial", difficulty: "medium", tags: ["keywords", "competitors", "site audit", "seo"] },
  { id: "ahrefs", name: "Ahrefs", url: "https://ahrefs.com", category: "seo", tagline: "Backlinks, keywords and content gaps; free webmaster tools.", pricing: "freemium", difficulty: "medium", tags: ["backlinks", "keywords", "seo", "competitors"] },
  { id: "surfer", name: "Surfer SEO", url: "https://surferseo.com", category: "seo", tagline: "Write content that ranks with on-page SEO guidance.", pricing: "paid", difficulty: "easy", tags: ["content seo", "blogs", "on-page"] },
  { id: "looker-studio", name: "Looker Studio", url: "https://lookerstudio.google.com", category: "seo", tagline: "Free dashboards from Sheets, Ads, Analytics and more.", pricing: "free", difficulty: "medium", tags: ["dashboards", "reporting", "kpis"] },
  { id: "julius", name: "Julius AI", url: "https://julius.ai", category: "seo", tagline: "Chat with your spreadsheets — analysis and charts in plain English.", pricing: "freemium", difficulty: "easy", tags: ["data analysis", "excel", "charts", "reports"] },

  // ── Meetings & notes ──
  { id: "fireflies", name: "Fireflies.ai", url: "https://fireflies.ai", category: "meetings", tagline: "Records, transcribes and summarises your meetings.", pricing: "freemium", difficulty: "easy", tags: ["meeting notes", "transcription", "action items", "crm sync"] },
  { id: "otter", name: "Otter.ai", url: "https://otter.ai", category: "meetings", tagline: "Real-time meeting transcription and summaries.", pricing: "freemium", difficulty: "easy", tags: ["meeting notes", "transcription"] },
  { id: "fathom", name: "Fathom", url: "https://fathom.video", category: "meetings", tagline: "Free AI notetaker for Zoom, Meet and Teams.", pricing: "freemium", difficulty: "easy", tags: ["meeting notes", "summaries", "sales calls"] },
  { id: "tldv", name: "tl;dv", url: "https://tldv.io", category: "meetings", tagline: "Meeting recorder with AI notes and CRM updates.", pricing: "freemium", difficulty: "easy", tags: ["meeting notes", "crm sync", "sales calls"] },

  // ── Customer support ──
  { id: "freshdesk", name: "Freshdesk", url: "https://www.freshworks.com/freshdesk/", category: "support", tagline: "Helpdesk with ticketing, email and AI suggestions.", pricing: "freemium", difficulty: "easy", india: "Freshworks (Indian-origin); INR pricing", tags: ["helpdesk", "tickets", "support", "email support"] },
  { id: "intercom", name: "Intercom", url: "https://www.intercom.com", category: "support", tagline: "Customer service platform with the Fin AI agent.", pricing: "trial", difficulty: "medium", tags: ["support", "ai agent", "chat", "helpdesk"] },
  { id: "zendesk", name: "Zendesk", url: "https://www.zendesk.com", category: "support", tagline: "Enterprise-grade support suite with AI agents.", pricing: "trial", difficulty: "medium", tags: ["helpdesk", "tickets", "support"] },
  { id: "gorgias", name: "Gorgias", url: "https://www.gorgias.com", category: "support", tagline: "Helpdesk built for e-commerce with order context.", pricing: "trial", difficulty: "easy", tags: ["e-commerce", "support", "shopify", "returns"] },

  // ── Finance, billing & payments ──
  { id: "zoho-books", name: "Zoho Books", url: "https://www.zoho.com/in/books/", category: "finance", tagline: "GST-ready accounting, invoicing and payment reminders.", pricing: "freemium", difficulty: "easy", india: "GST compliant, e-invoicing, INR pricing", tags: ["accounting", "gst", "invoicing", "payment reminders"] },
  { id: "vyapar", name: "Vyapar", url: "https://vyaparapp.in", category: "finance", tagline: "Simple GST billing, inventory and accounting for small shops.", pricing: "freemium", difficulty: "easy", india: "Indian; GST billing, works offline on mobile", tags: ["billing", "gst", "inventory", "retail"] },
  { id: "tally", name: "TallyPrime", url: "https://tallysolutions.com", category: "finance", tagline: "India's most used accounting software for GST and compliance.", pricing: "paid", difficulty: "medium", india: "Indian standard for accountants and CAs", tags: ["accounting", "gst", "compliance", "inventory"] },
  { id: "razorpay", name: "Razorpay", url: "https://razorpay.com", category: "finance", tagline: "Payment links, UPI, subscriptions and payment pages.", pricing: "usage", difficulty: "easy", india: "UPI, cards, netbanking; payment links on WhatsApp", tags: ["payments", "upi", "payment links", "subscriptions"] },
  { id: "cashfree", name: "Cashfree Payments", url: "https://www.cashfree.com", category: "finance", tagline: "Payments, payouts and payment links for Indian businesses.", pricing: "usage", difficulty: "easy", india: "UPI, payouts, Indian compliance", tags: ["payments", "upi", "payouts", "payment links"] },
  { id: "quickbooks", name: "QuickBooks", url: "https://quickbooks.intuit.com", category: "finance", tagline: "Accounting and invoicing for small businesses (outside India).", pricing: "paid", difficulty: "easy", tags: ["accounting", "invoicing", "international"] },

  // ── Documents & data extraction ──
  { id: "nanonets", name: "Nanonets", url: "https://nanonets.com", category: "documents", tagline: "AI extraction from invoices, receipts and forms into your systems.", pricing: "usage", difficulty: "medium", tags: ["invoice extraction", "ocr", "documents", "accounts payable"] },
  { id: "docsumo", name: "Docsumo", url: "https://www.docsumo.com", category: "documents", tagline: "Document AI for bank statements, invoices and KYC.", pricing: "trial", difficulty: "medium", tags: ["ocr", "bank statements", "kyc", "documents"] },
  { id: "pdf-ai", name: "Adobe Acrobat AI Assistant", url: "https://www.adobe.com/acrobat/generative-ai-pdf.html", category: "documents", tagline: "Ask questions of PDFs and contracts, get summaries.", pricing: "paid", difficulty: "easy", tags: ["pdf", "contracts", "summaries"] },

  // ── HR, hiring & payroll ──
  { id: "keka", name: "Keka", url: "https://www.keka.com", category: "hr", tagline: "HR, payroll and performance for Indian companies.", pricing: "paid", difficulty: "medium", india: "Indian payroll compliance (PF, ESI, TDS)", tags: ["payroll", "hr", "attendance", "performance"] },
  { id: "greythr", name: "greytHR", url: "https://www.greythr.com", category: "hr", tagline: "Payroll, leave and attendance for small Indian teams.", pricing: "freemium", difficulty: "easy", india: "Indian payroll compliance; free plan for small teams", tags: ["payroll", "attendance", "leave", "hr"] },
  { id: "workable", name: "Workable", url: "https://www.workable.com", category: "hr", tagline: "Hiring software with AI job descriptions and candidate screening.", pricing: "trial", difficulty: "easy", tags: ["hiring", "recruitment", "ats", "screening"] },

  // ── Websites & no-code ──
  { id: "framer", name: "Framer", url: "https://www.framer.com", category: "web", tagline: "Design-led websites with AI generation and built-in CMS.", pricing: "freemium", difficulty: "easy", tags: ["website", "landing page", "design"] },
  { id: "webflow", name: "Webflow", url: "https://webflow.com", category: "web", tagline: "Professional visual web builder with CMS.", pricing: "freemium", difficulty: "medium", tags: ["website", "cms", "marketing site"] },
  { id: "wix", name: "Wix", url: "https://www.wix.com", category: "web", tagline: "Easy website builder with bookings and stores.", pricing: "freemium", difficulty: "easy", tags: ["website", "bookings", "small business"] },
  { id: "durable", name: "Durable", url: "https://durable.co", category: "web", tagline: "AI website builder that creates a site in seconds.", pricing: "trial", difficulty: "easy", tags: ["website", "ai builder", "local business"] },
  { id: "wordpress", name: "WordPress.com", url: "https://wordpress.com", category: "web", tagline: "The world's most used website and blog platform.", pricing: "freemium", difficulty: "medium", tags: ["website", "blog", "seo"] },

  // ── App building & coding ──
  { id: "lovable", name: "Lovable", url: "https://lovable.dev", category: "apps", tagline: "Describe an app and get a working web app you can edit.", pricing: "freemium", difficulty: "medium", tags: ["mvp", "web app", "prototype", "no-code"] },
  { id: "bolt", name: "Bolt.new", url: "https://bolt.new", category: "apps", tagline: "Prompt-to-full-stack web apps in the browser.", pricing: "freemium", difficulty: "medium", tags: ["mvp", "web app", "prototype"] },
  { id: "v0", name: "v0", url: "https://v0.app", category: "apps", tagline: "Generate UI and full-stack Next.js apps from prompts.", pricing: "freemium", difficulty: "medium", tags: ["ui", "web app", "prototype", "next.js"] },
  { id: "bubble", name: "Bubble", url: "https://bubble.io", category: "apps", tagline: "No-code platform for real web apps with databases and logic.", pricing: "freemium", difficulty: "advanced", tags: ["no-code", "web app", "saas", "marketplace"] },
  { id: "glide", name: "Glide", url: "https://www.glideapps.com", category: "apps", tagline: "Turn spreadsheets into internal apps in minutes.", pricing: "freemium", difficulty: "easy", tags: ["internal tools", "spreadsheets", "no-code", "mobile app"] },
  { id: "flutterflow", name: "FlutterFlow", url: "https://www.flutterflow.io", category: "apps", tagline: "Visual builder for native mobile apps.", pricing: "freemium", difficulty: "advanced", tags: ["mobile app", "ios", "android", "low-code"] },
  { id: "cursor", name: "Cursor", url: "https://cursor.com", category: "apps", tagline: "AI code editor for developers.", pricing: "freemium", difficulty: "advanced", tags: ["coding", "developers", "ai coding"] },
  { id: "replit", name: "Replit", url: "https://replit.com", category: "apps", tagline: "Build and host apps with an AI agent in the browser.", pricing: "freemium", difficulty: "medium", tags: ["web app", "hosting", "ai coding", "prototype"] },

  // ── E-commerce & logistics ──
  { id: "shopify", name: "Shopify", url: "https://www.shopify.com", category: "ecommerce", tagline: "Online store platform with AI product descriptions (Shopify Magic).", pricing: "trial", difficulty: "easy", india: "INR plans; Indian payment gateways", tags: ["online store", "e-commerce", "d2c"] },
  { id: "shiprocket", name: "Shiprocket", url: "https://www.shiprocket.in", category: "ecommerce", tagline: "Shipping aggregator with courier recommendations and tracking.", pricing: "usage", difficulty: "easy", india: "Indian courier aggregator; COD and NDR management", tags: ["shipping", "logistics", "cod", "order tracking"] },
  { id: "dukaan", name: "Dukaan", url: "https://mydukaan.io", category: "ecommerce", tagline: "Quick online store setup for small sellers.", pricing: "trial", difficulty: "easy", india: "Indian; built for small sellers", tags: ["online store", "e-commerce", "small business"] },

  // ── Productivity & projects ──
  { id: "notion", name: "Notion", url: "https://www.notion.com", category: "productivity", tagline: "Docs, wikis and project tracking in one workspace.", pricing: "freemium", difficulty: "easy", tags: ["wiki", "sops", "projects", "notes"] },
  { id: "clickup", name: "ClickUp", url: "https://clickup.com", category: "productivity", tagline: "Project management with AI summaries and automations.", pricing: "freemium", difficulty: "medium", tags: ["projects", "tasks", "team"] },
  { id: "asana", name: "Asana", url: "https://asana.com", category: "productivity", tagline: "Team work management with AI-assisted workflows.", pricing: "freemium", difficulty: "easy", tags: ["projects", "tasks", "team"] },
  { id: "trello", name: "Trello", url: "https://trello.com", category: "productivity", tagline: "Simple Kanban boards for small teams.", pricing: "freemium", difficulty: "easy", tags: ["kanban", "tasks", "simple"] },
  { id: "slack", name: "Slack", url: "https://slack.com", category: "productivity", tagline: "Team chat with AI search and huddles.", pricing: "freemium", difficulty: "easy", tags: ["team chat", "communication", "alerts"] },

  // ── Scheduling & forms ──
  { id: "calendly", name: "Calendly", url: "https://calendly.com", category: "scheduling", tagline: "Booking links that sync with your calendar.", pricing: "freemium", difficulty: "easy", tags: ["appointments", "booking", "calendar", "demos"] },
  { id: "calcom", name: "Cal.com", url: "https://cal.com", category: "scheduling", tagline: "Open-source scheduling with team routing.", pricing: "freemium", difficulty: "easy", tags: ["appointments", "booking", "routing", "open source"] },
  { id: "zoho-bookings", name: "Zoho Bookings", url: "https://www.zoho.com/bookings/", category: "scheduling", tagline: "Appointment booking with payments and reminders.", pricing: "freemium", difficulty: "easy", india: "INR pricing; Zoho suite", tags: ["appointments", "clinics", "booking", "payments"] },
  { id: "typeform", name: "Typeform", url: "https://www.typeform.com", category: "scheduling", tagline: "Conversational forms and quizzes that convert.", pricing: "freemium", difficulty: "easy", tags: ["forms", "quizzes", "lead capture", "surveys"] },
  { id: "tally-forms", name: "Tally", url: "https://tally.so", category: "scheduling", tagline: "Generous free form builder that feels like a doc.", pricing: "freemium", difficulty: "easy", tags: ["forms", "surveys", "lead capture"] },
];

export const getTool = (id: string) => aiTools.find((t) => t.id === id);

/** Industries used for SEO pages + the finder's industry selector. */
export const finderIndustries = [
  { slug: "real-estate", label: "Real estate", keywords: ["real estate", "property", "broker", "site visit", "builder"] },
  { slug: "d2c-ecommerce", label: "D2C & e-commerce", keywords: ["d2c", "ecommerce", "e-commerce", "shopify", "store", "orders", "products"] },
  { slug: "clinics-healthcare", label: "Clinics & healthcare", keywords: ["clinic", "doctor", "patient", "dental", "hospital", "appointment"] },
  { slug: "education-coaching", label: "Education & coaching", keywords: ["school", "students", "coaching", "course", "admission", "parents", "edtech"] },
  { slug: "saas-startups", label: "SaaS & startups", keywords: ["saas", "startup", "trial", "users", "product", "churn"] },
  { slug: "restaurants-cafes", label: "Restaurants & cafés", keywords: ["restaurant", "cafe", "food", "kitchen", "orders", "reservations"] },
  { slug: "agencies-services", label: "Agencies & services", keywords: ["agency", "clients", "consulting", "freelance", "projects"] },
  { slug: "retail-local", label: "Retail & local business", keywords: ["shop", "retail", "store", "local", "billing", "inventory"] },
] as const;

/** Hand-picked tools per industry for the /ai-tools/for/[industry] pages. */
export const industryPicks: Record<string, { intro: string; picks: { toolId: string; useFor: string }[] }> = {
  "real-estate": {
    intro: "Real-estate teams win on response speed. These tools capture every enquiry, qualify it automatically and keep site visits on the calendar.",
    picks: [
      { toolId: "aisensy", useFor: "Instant WhatsApp replies to ad leads, with qualifying questions" },
      { toolId: "retell", useFor: "AI callbacks to new leads within a minute, 24/7" },
      { toolId: "leadsquared", useFor: "Pipeline and follow-up tracking for site visits" },
      { toolId: "zapier", useFor: "Connect Meta lead ads to your CRM and WhatsApp" },
      { toolId: "heygen", useFor: "Project walkthrough videos and multilingual explainers" },
      { toolId: "canva", useFor: "Brochures, hoardings and social creatives" },
    ],
  },
  "d2c-ecommerce": {
    intro: "D2C brands live and die by content, conversion and repeat purchase. This stack covers product visuals, recovery flows and post-purchase support.",
    picks: [
      { toolId: "shopify", useFor: "Your store, with AI product descriptions" },
      { toolId: "photoroom", useFor: "Studio-grade product photos from a phone" },
      { toolId: "klaviyo", useFor: "Abandoned cart, win-back and replenishment flows" },
      { toolId: "interakt", useFor: "WhatsApp order updates, COD confirmation and catalog" },
      { toolId: "shiprocket", useFor: "Shipping, COD and NDR management" },
      { toolId: "capcut", useFor: "Reels and UGC-style ad edits" },
    ],
  },
  "clinics-healthcare": {
    intro: "Clinics lose revenue to missed calls and no-shows. These tools answer every call, book appointments and remind patients automatically.",
    picks: [
      { toolId: "retell", useFor: "AI receptionist that answers and books calls" },
      { toolId: "zoho-bookings", useFor: "Online booking with payments and reminders" },
      { toolId: "aisensy", useFor: "WhatsApp reminders and post-visit care messages" },
      { toolId: "chatbase", useFor: "Website assistant for treatment FAQs" },
      { toolId: "gsc", useFor: "See which treatments patients search for" },
      { toolId: "notebooklm", useFor: "Train staff on SOPs and treatment protocols" },
    ],
  },
  "education-coaching": {
    intro: "Institutes juggle admissions spikes, parent communication and content. Automate the repetitive parts and keep counsellors on high-intent leads.",
    picks: [
      { toolId: "bolna", useFor: "Answer admission calls in Hindi and English" },
      { toolId: "leadsquared", useFor: "Admission funnel and counsellor follow-ups" },
      { toolId: "wati", useFor: "Fee reminders and parent broadcasts on WhatsApp" },
      { toolId: "synthesia", useFor: "Explainer and training videos with AI presenters" },
      { toolId: "notebooklm", useFor: "Study guides and audio overviews from notes" },
      { toolId: "typeform", useFor: "Engaging enquiry and scholarship forms" },
    ],
  },
  "saas-startups": {
    intro: "Early-stage teams need leverage everywhere: shipping product, finding customers and supporting them without hiring yet.",
    picks: [
      { toolId: "lovable", useFor: "Prototype and ship an MVP fast" },
      { toolId: "hubspot", useFor: "Free CRM for your first hundred customers" },
      { toolId: "apollo", useFor: "Find and email your ideal customers" },
      { toolId: "intercom", useFor: "In-app support with an AI agent" },
      { toolId: "fathom", useFor: "Record and summarise every customer call" },
      { toolId: "clarity", useFor: "Watch where users get stuck — free" },
    ],
  },
  "restaurants-cafes": {
    intro: "Restaurants need direct orders, full tables and steady reviews. These tools cut aggregator dependence and keep regulars coming back.",
    picks: [
      { toolId: "wix", useFor: "Website with menu, reservations and ordering" },
      { toolId: "razorpay", useFor: "Direct online payments via UPI" },
      { toolId: "aisensy", useFor: "WhatsApp offers and review requests" },
      { toolId: "retell", useFor: "Take reservations by phone during the rush" },
      { toolId: "capcut", useFor: "Kitchen-to-table reels" },
      { toolId: "google-business-profile", useFor: "Reply to every Google review and keep hours and menu current" },
    ],
  },
  "agencies-services": {
    intro: "Service businesses sell time. Automate admin, meetings and reporting so more hours go to billable work.",
    picks: [
      { toolId: "fireflies", useFor: "Meeting notes and action items, automatically" },
      { toolId: "zoho-books", useFor: "GST invoices and automatic payment reminders" },
      { toolId: "make", useFor: "Client onboarding and reporting workflows" },
      { toolId: "clickup", useFor: "Projects, tasks and client portals" },
      { toolId: "gamma", useFor: "Proposals and pitch decks in minutes" },
      { toolId: "calendly", useFor: "Discovery-call booking" },
    ],
  },
  "retail-local": {
    intro: "Local businesses need simple tools that work on a phone: billing, WhatsApp marketing and being found on Google.",
    picks: [
      { toolId: "vyapar", useFor: "GST billing and inventory on mobile" },
      { toolId: "aisensy", useFor: "WhatsApp offers to your customer list" },
      { toolId: "canva", useFor: "Posters, offers and social posts" },
      { toolId: "chatgpt", useFor: "Write product descriptions, replies and ads" },
      { toolId: "razorpay", useFor: "UPI payment links and QR" },
      { toolId: "gsc", useFor: "Get found by people searching nearby" },
    ],
  },
};
