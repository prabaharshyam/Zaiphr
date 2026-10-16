/**
 * Long-form content for each service page. Edit freely.
 * Pricing is "starting from" guidance — excl. GST and third-party/usage costs.
 */

export const industries = {
  realEstate: "Real estate",
  d2c: "D2C",
  clinics: "Clinics",
  education: "Education",
  saas: "SaaS",
  restaurants: "Restaurants",
} as const;
export type Industry = keyof typeof industries;

export interface Package {
  name: string;
  inr: number;
  usd: number;
  per?: "project" | "month";
  description: string;
  features: string[];
  highlight?: boolean;
}

export interface ServiceDetail {
  headline: string;
  intro: string;
  problems: string[];
  solutions: string[];
  deliverables: { title: string; text: string }[];
  useCases: Record<Industry, string>;
  process: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  packages: Package[];
}

export const serviceDetails: Record<string, ServiceDetail> = {
  "ai-automations": {
    headline: "Your busywork, running on autopilot.",
    intro:
      "We design workflows and AI agents that move data, follow up with leads, draft documents and report back — so your team spends its hours on work only humans can do.",
    problems: [
      "Leads sit in inboxes and spreadsheets for hours before anyone replies",
      "The same data is typed into three tools by three people",
      "Invoices, reports and follow-ups depend on someone remembering",
      "You've tried Zapier, but the flows break and nobody owns them",
    ],
    solutions: [
      "Every lead captured, enriched and routed in seconds",
      "One source of truth synced across CRM, sheets, accounting and chat",
      "AI agents that draft, summarise, classify and chase — with a human in the loop",
      "Documented, monitored workflows with alerts when anything fails",
    ],
    deliverables: [
      { title: "Process audit", text: "We map how work actually flows today and rank automations by hours saved and revenue impact." },
      { title: "Workflow builds", text: "n8n, Make or custom code — whatever fits your stack, budget and data-privacy needs." },
      { title: "AI agents", text: "Claude- or GPT-powered agents for triage, drafting, research and data extraction, with guardrails." },
      { title: "CRM & ops wiring", text: "HubSpot, Zoho, Salesforce, Google Workspace, Tally, Razorpay, WhatsApp and more, connected properly." },
      { title: "Dashboards & alerts", text: "Live views of pipeline, operations and automation health, with Slack, email or WhatsApp alerts." },
      { title: "Docs & handover", text: "Every flow documented, plus a Loom walkthrough so your team can own it." },
    ],
    useCases: {
      realEstate: "Meta lead ads → WhatsApp qualification → lead score → CRM deal + site-visit booking, with zero manual entry.",
      d2c: "Shopify orders → Tally invoices → courier booking → WhatsApp delivery updates → review request on day 7.",
      clinics: "Appointment confirmations, no-show follow-ups and post-visit care instructions sent automatically from your calendar.",
      education: "Enquiry → counsellor assignment → fee reminders → attendance and progress reports to parents every Friday.",
      saas: "Trial sign-ups enriched, scored and routed to sales, with usage-based nudges and churn-risk alerts.",
      restaurants: "Daily sales, inventory and aggregator payout reconciliation compiled into a 9 AM WhatsApp summary.",
    },
    process: [
      { title: "Map", text: "A 60-minute ops session plus tool access. We return an automation map with hours saved per flow." },
      { title: "Prototype", text: "The highest-impact flow is built first and running on real data within 1–2 weeks." },
      { title: "Harden", text: "Error handling, retries, logging, alerts and permissions, built to be production-grade." },
      { title: "Scale", text: "We roll out the rest of the map in priority order, measuring hours saved as we go." },
    ],
    faqs: [
      { q: "Which tools do you use — n8n, Make or Zapier?", a: "Whatever fits. We default to n8n (self-hostable, cheaper at scale) or Make for speed, and write custom code when reliability or data privacy demands it." },
      { q: "Is my data safe with AI agents?", a: "We use API tiers that don't train on your data, minimise what's sent to models, mask personal data where possible and can self-host the workflow engine in your cloud." },
      { q: "What happens when a flow breaks?", a: "Every workflow has error branches and alerts. On a support plan we monitor, fix and improve flows for you; otherwise your team gets docs and a runbook." },
      { q: "How fast will we see results?", a: "Most teams see the first automation live within 2 weeks. We pick the first flow specifically for quick, visible wins." },
      { q: "Do I need technical people on my side?", a: "No. You need someone who knows the process and can give us tool access. We handle the rest and train your team." },
    ],
    packages: [
      { name: "Starter flow", inr: 40000, usd: 500, description: "One high-impact workflow, built and documented.", features: ["Process mapping session", "1 production workflow", "Error alerts", "Loom handover"] },
      { name: "Automation sprint", inr: 120000, usd: 1500, description: "A 4-week sprint across your top 3–5 workflows.", features: ["Full ops audit", "3–5 workflows + 1 AI agent", "Dashboard", "30 days of support"], highlight: true },
      { name: "Ops partner", inr: 60000, usd: 750, per: "month", description: "An ongoing automation team on call.", features: ["New flows every month", "Monitoring & fixes", "Monthly hours-saved report", "Priority support"] },
    ],
  },

  "ai-voice-agents": {
    headline: "A receptionist that never misses a call.",
    intro:
      "Human-sounding voice agents that answer, qualify, book and follow up in English, Hindi and regional languages — plus WhatsApp and website chat agents that share the same brain.",
    problems: [
      "Calls go unanswered at peak hours, at night and on weekends",
      "Staff repeat the same 20 answers all day",
      "Outbound follow-up calls never happen at scale",
      "Chatbots feel robotic and customers abandon them",
    ],
    solutions: [
      "Every call answered in under a second, around the clock",
      "Bookings, reschedules and FAQs handled end-to-end",
      "Outbound qualification and reminder calls in hundreds per hour",
      "Natural conversations with clean hand-off to a human when needed",
    ],
    deliverables: [
      { title: "Conversation design", text: "Call flows, persona, tone, objection handling and escalation rules, tested on real scenarios." },
      { title: "Voice agent build", text: "Low-latency speech pipeline with natural voices, interruption handling and multilingual support." },
      { title: "Telephony", text: "Indian and international numbers, call routing, recording and transfer to your team." },
      { title: "Tool integrations", text: "Live calendar booking, CRM updates, payment links and WhatsApp confirmations during the call." },
      { title: "WhatsApp & web chat", text: "The same knowledge and tools on WhatsApp and your website, so customers get one consistent experience." },
      { title: "Analytics", text: "Call summaries, outcomes, sentiment and conversion dashboards, so you can see what's working." },
    ],
    useCases: {
      realEstate: "Instant callback to every ad lead within 60 seconds: qualify budget and timeline, then book a site visit.",
      d2c: "Order-status, returns and COD-confirmation calls handled automatically, cutting RTO and support load.",
      clinics: "24/7 appointment booking and reminders, with emergencies transferred straight to the on-call doctor.",
      education: "Admission enquiries answered in Hindi or English, counselling slots booked and fee reminders sent.",
      saas: "Tier-1 support and demo booking over phone and chat, with tickets created in your helpdesk.",
      restaurants: "Table reservations and large-order enquiries taken by phone, even during the dinner rush.",
    },
    process: [
      { title: "Script", text: "We design call flows from your real call recordings and FAQs." },
      { title: "Pilot", text: "A working agent on a test number within 7–10 days for you to call and break." },
      { title: "Integrate", text: "Calendar, CRM, payments and WhatsApp wired in; human-transfer rules set." },
      { title: "Launch & tune", text: "Go live on a share of traffic, review transcripts weekly and improve." },
    ],
    faqs: [
      { q: "Will callers know it's an AI?", a: "We recommend a short disclosure at the start. Modern voices are natural, and transparency builds trust. Your agent can always transfer to a human." },
      { q: "Which languages are supported?", a: "English, Hindi and Hinglish work well, and most major Indian languages are supported. We test quality in your language before launch." },
      { q: "What does it cost per minute?", a: "Usage typically runs ₹4–10 ($0.05–0.12) per minute depending on voice, model and telephony, billed at cost or bundled into a managed plan." },
      { q: "Can it book into our existing calendar or software?", a: "Yes. Google Calendar, Calendly, Zoho, HubSpot and most practice or CRM software with an API. If yours has no API, we work around it." },
      { q: "What about call recordings and privacy?", a: "Recordings are optional, stored in your region where possible and governed by a clear retention policy aligned with DPDP." },
    ],
    packages: [
      { name: "Pilot agent", inr: 60000, usd: 750, description: "One inbound or outbound use case, live in 2 weeks.", features: ["Conversation design", "1 voice agent", "Calendar or CRM integration", "Usage billed at cost"] },
      { name: "Production agent", inr: 150000, usd: 1900, description: "Voice + WhatsApp agents with full integrations.", features: ["Voice + WhatsApp + web chat", "Up to 3 integrations", "Analytics dashboard", "60 days of tuning"], highlight: true },
      { name: "Managed agents", inr: 35000, usd: 450, per: "month", description: "We run, monitor and improve your agents.", features: ["Weekly transcript reviews", "Prompt & flow updates", "Uptime monitoring", "Monthly report"] },
    ],
  },

  websites: {
    headline: "Websites that load fast and close faster.",
    intro:
      "Premium marketing sites, landing pages and e-commerce stores, designed to make you look like the category leader and engineered to convert on a mid-range phone on 4G.",
    problems: [
      "Your site looks like a template and undersells what you do",
      "Mobile pages are slow, so paid traffic bounces",
      "Updating a page needs a developer every time",
      "You can't tell which pages and campaigns actually drive leads",
    ],
    solutions: [
      "A distinctive design system built around your positioning",
      "Under 2-second loads, Core Web Vitals in the green",
      "A CMS your team can actually use",
      "Analytics, events and lead routing built in from day one",
    ],
    deliverables: [
      { title: "Strategy & copy", text: "Positioning, page architecture and conversion-focused copy, not lorem ipsum." },
      { title: "Design system", text: "Custom UI with motion and interaction that feels premium, with reusable components." },
      { title: "Development", text: "Next.js or Shopify, deployed on Vercel or Shopify, with clean code you own." },
      { title: "CMS", text: "Sanity, Shopify or Webflow, so marketing can publish without tickets." },
      { title: "SEO foundations", text: "Technical SEO, schema, sitemaps, metadata and fast pages that rank." },
      { title: "Analytics & CRO", text: "GA4 or Plausible events, heatmaps and an A/B-ready setup." },
    ],
    useCases: {
      realEstate: "Project microsites with floor plans, walkthroughs, EMI calculators and WhatsApp lead capture.",
      d2c: "Headless Shopify stores with UPI-first checkout, bundles, subscriptions and routine finders.",
      clinics: "Doctor-led sites with treatment pages, online booking and location pages that rank locally.",
      education: "Course catalogues, admission funnels and fee-payment pages that turn visits into enrolments.",
      saas: "Product marketing sites with interactive demos, pricing pages and docs that convert trials.",
      restaurants: "Cinematic sites with direct ordering, reservations and region-led menus.",
    },
    process: [
      { title: "Strategy", text: "Audience, positioning, sitemap and copy direction agreed in week one." },
      { title: "Design", text: "Homepage and key templates designed and prototyped for your feedback." },
      { title: "Build", text: "Component-driven development with a staging link you can review daily." },
      { title: "Launch", text: "Performance, SEO and analytics checks, then go live with zero downtime." },
    ],
    faqs: [
      { q: "How long does a website take?", a: "Landing pages take 1–2 weeks, marketing sites 4–6 weeks and e-commerce stores 6–8 weeks, depending on content readiness." },
      { q: "Do you write the copy?", a: "Yes. Copy is part of our process because design without the right words doesn't convert. We work from a short interview with you." },
      { q: "Will I be able to edit the site myself?", a: "Yes. Every site ships with a CMS and a walkthrough. Most edits need no developer." },
      { q: "Do you do WordPress?", a: "We prefer Next.js, Shopify or Webflow for speed and security, but we can work with an existing WordPress site where it makes sense." },
      { q: "What about hosting and maintenance?", a: "We deploy to Vercel, Shopify or your preferred host and offer optional care plans for updates, monitoring and improvements." },
    ],
    packages: [
      { name: "Landing page", inr: 35000, usd: 450, description: "One high-converting page for a launch or campaign.", features: ["Copy + design + build", "Mobile-first, <2s load", "Form + WhatsApp + analytics", "1 round of revisions"] },
      { name: "Marketing site", inr: 120000, usd: 1500, description: "A premium 5–10 page site with CMS.", features: ["Strategy & copy", "Custom design system", "CMS + SEO setup", "Motion & interactions"], highlight: true },
      { name: "E-commerce", inr: 200000, usd: 2500, description: "Shopify or headless store built to sell.", features: ["Custom storefront", "UPI-first checkout", "Email/WhatsApp flows", "Product & SEO setup"] },
    ],
  },

  "mobile-web-apps": {
    headline: "From idea to app store in weeks, not quarters.",
    intro:
      "We design and engineer MVPs, SaaS products and internal tools with a small senior team, shipping a working product every week and building on a stack that scales.",
    problems: [
      "Agencies quote 6 months for a v1 you need in 6 weeks",
      "Freelancer code that nobody can maintain",
      "Internal teams buried in spreadsheets and manual approvals",
      "No clarity on what to build first",
    ],
    solutions: [
      "A ruthlessly scoped MVP that tests your riskiest assumption",
      "One modern codebase for web, iOS and Android",
      "Internal tools that replace spreadsheets in days",
      "Weekly demos, transparent roadmaps and code you own",
    ],
    deliverables: [
      { title: "Product discovery", text: "User flows, feature scoping and a clickable prototype before any code is written." },
      { title: "UI/UX design", text: "A design system and screens in Figma, tested with real users where possible." },
      { title: "Web apps", text: "Next.js + TypeScript front-ends with Supabase or Postgres back-ends." },
      { title: "Mobile apps", text: "React Native (Expo) apps for iOS and Android from a single codebase." },
      { title: "AI features", text: "Search, assistants, document understanding and recommendations, built in rather than bolted on." },
      { title: "Launch & ops", text: "App Store and Play Store submission, analytics, crash reporting and CI/CD." },
    ],
    useCases: {
      realEstate: "A broker app for listings, site visits, commissions and client documents.",
      d2c: "A loyalty and subscription app with personalised reorders and referral rewards.",
      clinics: "A patient app for bookings, prescriptions, reports and teleconsults.",
      education: "A learning app with an AI tutor, progress tracking and parent reports.",
      saas: "A multi-tenant SaaS MVP with auth, billing, admin and usage analytics.",
      restaurants: "A kitchen-display and inventory tool that replaces the whiteboard and the WhatsApp group.",
    },
    process: [
      { title: "Scope", text: "A 1-week discovery that ends in a prioritised backlog and a clickable prototype." },
      { title: "Design", text: "UI system and key screens validated with you and, ideally, real users." },
      { title: "Sprint", text: "Two-week sprints, each ending in a working demo on staging." },
      { title: "Ship", text: "Store submission, monitoring and a post-launch improvement sprint." },
    ],
    faqs: [
      { q: "How much does an MVP cost?", a: "Most MVPs land between ₹3L and ₹10L ($3.5k–12k) depending on scope. Discovery gives you a fixed quote before you commit to the build." },
      { q: "Who owns the code?", a: "You do. Everything lives in your GitHub, deployed to accounts you own, from day one." },
      { q: "Native or cross-platform?", a: "React Native covers most products with a single codebase. We recommend native only when hardware or performance demands it." },
      { q: "Can you take over an existing app?", a: "Yes. We start with a code audit and a stabilisation sprint before adding features." },
      { q: "Do you help after launch?", a: "Yes. Retainers cover improvements, maintenance, monitoring and new features." },
    ],
    packages: [
      { name: "MVP", inr: 300000, usd: 3800, description: "A focused v1 for web or mobile in 6–8 weeks.", features: ["Discovery + prototype", "Core features + auth", "Admin panel", "Launch support"], highlight: true },
      { name: "Product build", inr: 700000, usd: 8500, description: "Web + mobile product with AI features.", features: ["Web + iOS + Android", "Payments & integrations", "AI features", "Analytics & CI/CD"] },
      { name: "Product team", inr: 150000, usd: 1900, per: "month", description: "A senior team on retainer.", features: ["Design + engineering", "Bi-weekly releases", "Roadmap planning", "Monitoring & fixes"] },
    ],
  },

  "branding-marketing": {
    headline: "Look inevitable from day one.",
    intro:
      "Positioning, identity and digital marketing for young companies that need to look established, sound distinct and grow predictably.",
    problems: [
      "Your brand looks like everyone else in your category",
      "Messaging changes depending on who is writing it",
      "Marketing is random acts of posting, not a system",
      "Ad spend goes up while results stay flat",
    ],
    solutions: [
      "A sharp positioning that makes the choice obvious",
      "A flexible identity system your team can use without a designer",
      "A channel plan built around where your customers actually are",
      "Performance marketing with clear testing and reporting",
    ],
    deliverables: [
      { title: "Positioning", text: "Audience, category, proof and a messaging hierarchy, written down and agreed." },
      { title: "Identity system", text: "Logo, type, colour, iconography, imagery direction and usage rules." },
      { title: "Brand toolkit", text: "Figma templates for social, decks, ads and documents." },
      { title: "Go-to-market", text: "Launch plan, channel mix, content pillars and a 90-day calendar." },
      { title: "Performance ads", text: "Meta and Google campaigns, creative testing and landing-page optimisation." },
      { title: "Reporting", text: "A single dashboard for spend, leads, CAC and ROAS, with monthly insights." },
    ],
    useCases: {
      realEstate: "A project brand with naming, launch campaign, hoardings and a lead-gen ad engine.",
      d2c: "A full brand system with packaging and a launch funnel for marketplaces and your own store.",
      clinics: "A trustworthy, modern clinic brand with local SEO and Google Ads for high-intent searches.",
      education: "Admission-season campaigns with clear outcomes-led messaging and parent-friendly creatives.",
      saas: "Category positioning, website messaging and a LinkedIn + search demand engine.",
      restaurants: "A distinctive restaurant identity, menu design and Instagram-first launch.",
    },
    process: [
      { title: "Discover", text: "Workshops, competitor review and customer interviews." },
      { title: "Position", text: "Positioning and messaging, agreed before any visuals." },
      { title: "Design", text: "Identity explorations, refined into one complete system." },
      { title: "Launch", text: "Assets, campaigns and a plan to keep the momentum going." },
    ],
    faqs: [
      { q: "How long does a brand identity take?", a: "A brand sprint takes about 3 weeks. A full identity system with packaging or signage takes 5–8 weeks." },
      { q: "Do we get the source files?", a: "Yes. You get all logos, fonts (where licensable), Figma files and a brand guidelines document." },
      { q: "Do you also run our ads?", a: "Yes. We can manage Meta and Google ads, or train your team and audit monthly." },
      { q: "What's the minimum ad budget you recommend?", a: "Around ₹50k–1L ($600–1,200) per month is enough to learn meaningfully. Below that, we focus on organic and conversion fixes first." },
      { q: "Can you work with our existing logo?", a: "Absolutely. Many projects are a refresh: stronger positioning and a sharper system around what you already have." },
    ],
    packages: [
      { name: "Brand sprint", inr: 75000, usd: 950, description: "Positioning + logo + core identity in 3 weeks.", features: ["Positioning workshop", "Logo + colour + type", "Mini guidelines", "Social templates"] },
      { name: "Identity system", inr: 180000, usd: 2200, description: "A complete brand system with toolkit.", features: ["Messaging framework", "Full identity system", "Brand guidelines", "Figma toolkit + launch kit"], highlight: true },
      { name: "Growth retainer", inr: 60000, usd: 750, per: "month", description: "Ongoing marketing and performance ads.", features: ["Channel strategy", "Ad management", "Monthly creative tests", "KPI dashboard"] },
    ],
  },

  "media-ads": {
    headline: "Content that earns the first three seconds.",
    intro:
      "Short-form reels, YouTube, UGC-style ads and creative testing, produced with AI-assisted workflows so you get more, better content at a predictable monthly cost.",
    problems: [
      "Posting is inconsistent because content takes too long to make",
      "Reels look polished but nobody stops scrolling",
      "Ad creatives fatigue in a week and there's nothing to replace them",
      "Long videos never get repurposed",
    ],
    solutions: [
      "A monthly content engine with batched shoots and fast edits",
      "Hook-first formats tested against real performance data",
      "A steady pipeline of fresh ad creatives in every aspect ratio",
      "One long video turned into 10–20 short assets",
    ],
    deliverables: [
      { title: "Content strategy", text: "Formats, pillars, hooks and a monthly calendar mapped to your funnel." },
      { title: "Shoots", text: "Batched production days, on location or in studio, with scripts and shot lists." },
      { title: "Editing", text: "Reels, shorts, YouTube long-form and stories, with captions, sound design and motion graphics." },
      { title: "Ad creatives", text: "Static, motion and UGC-style ads in 9:16, 4:5 and 1:1, built for testing." },
      { title: "AI-assisted production", text: "AI transcription, cut-downs, voice-overs, b-roll and localisation to multiply output." },
      { title: "Performance loop", text: "Hook-rate and hold-rate tracking that tells us what to make next." },
    ],
    useCases: {
      realEstate: "Walkthrough reels, neighbourhood guides and founder-led videos that build trust before a site visit.",
      d2c: "UGC-style product demos, before-and-after reels and a constant supply of fresh ad creatives.",
      clinics: "Doctor-explainer shorts that answer common questions and rank on YouTube search.",
      education: "Faculty-led micro-lessons and student stories for admission campaigns.",
      saas: "Product demos, feature launches and founder clips for LinkedIn and YouTube.",
      restaurants: "Kitchen-to-table reels, chef stories and menu-launch content.",
    },
    process: [
      { title: "Plan", text: "Monthly calendar, scripts and hooks approved in one session." },
      { title: "Shoot", text: "One batched shoot day per month, or remote creator-led capture." },
      { title: "Edit", text: "48-hour turnaround on drafts with a simple review link." },
      { title: "Learn", text: "Monthly performance review that informs next month's formats." },
    ],
    faqs: [
      { q: "Do you shoot, or only edit?", a: "Both. We plan and run shoots in your city or coordinate remote creator-led capture, and we also edit footage you send." },
      { q: "How many assets do we get?", a: "Plans range from 12 to 30+ assets per month, mixing reels, ads and long-form edits." },
      { q: "Will AI make our content look generic?", a: "No. AI speeds up the boring parts (transcripts, captions, cut-downs). The ideas, taste and final edit are human." },
      { q: "Do you post and manage our accounts?", a: "We can schedule and publish, with community management as an add-on." },
      { q: "Do you run the ads too?", a: "Yes. Creative and media buying work best together, so we can do both or partner with your media team." },
    ],
    packages: [
      { name: "Content starter", inr: 40000, usd: 500, per: "month", description: "A consistent short-form presence.", features: ["12 short-form assets", "Scripts & hooks", "Captions & thumbnails", "Monthly review"] },
      { name: "Content engine", inr: 90000, usd: 1100, per: "month", description: "Shoots, edits and ad creatives.", features: ["30 assets incl. ads", "1 shoot day / month", "3 aspect ratios", "Creative testing"], highlight: true },
      { name: "Ads + creative", inr: 35000, usd: 450, per: "month", description: "Media buying with creative refreshes (plus ad spend).", features: ["Meta + Google ads", "Weekly creative refresh", "Landing page tweaks", "ROAS reporting"] },
    ],
  },

  "influencer-marketing": {
    headline: "Creators who move product, not just likes.",
    intro:
      "We find the right creators, brief them well, handle the logistics and track every post to revenue — from 10-creator pilots to always-on programmes.",
    problems: [
      "Celebrity posts cost a lot and sell little",
      "Finding authentic creators in your niche takes weeks",
      "Briefs, contracts, shipping and follow-ups eat your team's time",
      "No way to tell which creators actually drove sales",
    ],
    solutions: [
      "Micro and nano creators chosen for engagement quality and audience fit",
      "A creator pipeline managed end-to-end",
      "Unique codes, UTMs and dashboards for every creator",
      "Top performers turned into always-on ads and long-term partners",
    ],
    deliverables: [
      { title: "Creator discovery", text: "Shortlists vetted for audience location, authenticity, engagement and brand fit." },
      { title: "Campaign design", text: "Concepts, briefs and content guidelines that keep each creator's voice intact." },
      { title: "Outreach & contracts", text: "Negotiation, agreements, usage rights and ASCI-compliant disclosures." },
      { title: "Seeding & logistics", text: "Product shipping, tracking and deadline management." },
      { title: "Tracking", text: "Codes, UTMs and a live dashboard of reach, clicks, sales and ROI per creator." },
      { title: "Amplification", text: "Whitelisting and Spark/partnership ads to scale the winners." },
    ],
    useCases: {
      realEstate: "Local lifestyle creators hosting project walkthroughs and neighbourhood guides.",
      d2c: "50-creator launch waves for new products, with UGC reused in ads.",
      clinics: "Wellness creators sharing honest treatment experiences, with care for medical-advertising rules.",
      education: "Student and educator creators driving admissions and app installs.",
      saas: "LinkedIn and YouTube creators in your niche explaining real workflows with your product.",
      restaurants: "Food creators for opening weeks, new menus and city-specific campaigns.",
    },
    process: [
      { title: "Plan", text: "Goals, budget, creator criteria and campaign concept." },
      { title: "Recruit", text: "Discovery, vetting, outreach and contracts." },
      { title: "Run", text: "Briefing, seeding, content review and publishing schedule." },
      { title: "Measure", text: "Per-creator ROI report and recommendations for the next wave." },
    ],
    faqs: [
      { q: "Are creator fees included?", a: "No. Our fee covers strategy and management. Creator fees are passed through at cost, or you pay creators directly." },
      { q: "Micro or macro influencers?", a: "For most brands, many micro-creators (10k–100k followers) beat one macro creator on trust, cost and sales. We test and shift budget to what works." },
      { q: "How do you avoid fake followers?", a: "We check audience quality, engagement patterns, location and growth history before shortlisting anyone." },
      { q: "Is it ASCI compliant?", a: "Yes. Every post carries the required disclosures, and briefs include ASCI guidelines." },
      { q: "Can we reuse creator content in ads?", a: "Yes. We negotiate usage rights up front, so the best content can be amplified with paid media." },
    ],
    packages: [
      { name: "Creator pilot", inr: 50000, usd: 650, description: "10 creators to test fit and messaging (plus creator fees).", features: ["Discovery & vetting", "Brief + outreach", "Tracking links & codes", "ROI report"] },
      { name: "Launch wave", inr: 150000, usd: 1900, description: "30–50 creators for a product or brand launch.", features: ["Campaign concept", "Contracts & logistics", "Live dashboard", "Ad whitelisting setup"], highlight: true },
      { name: "Always-on", inr: 75000, usd: 950, per: "month", description: "A continuous creator programme.", features: ["New creators monthly", "UGC library", "Paid amplification", "Monthly optimisation"] },
    ],
  },
};
