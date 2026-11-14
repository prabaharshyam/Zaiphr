/**
 * Long-form content for each practice-area page. Edit freely.
 * We don't publish prices: engagements are scoped and priced after a discovery conversation
 * (see config/engagements.ts).
 */

export const industries = {
  finance: "Financial services",
  healthcare: "Healthcare",
  retail: "Retail & e-commerce",
  realEstate: "Real estate",
  education: "Education",
  technology: "Technology & SaaS",
  hospitality: "Hospitality",
} as const;
export type Industry = keyof typeof industries;

export interface ServiceDetail {
  headline: string;
  intro: string;
  /** What leaders are up against. */
  problems: string[];
  /** How we approach it. */
  solutions: string[];
  deliverables: { title: string; text: string }[];
  useCases: Record<Industry, string>;
  process: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
}

export const serviceDetails: Record<string, ServiceDetail> = {
  "ai-strategy": {
    headline: "Know where AI pays off, before you spend on it.",
    intro:
      "We help leadership teams find the handful of AI opportunities that matter, size their value honestly and turn them into a sequenced, costed roadmap, so investment goes where the return is.",
    problems: [
      "Dozens of AI ideas, no clear way to choose between them",
      "Pilots that impress in a demo and stall before production",
      "No shared view of cost, risk or expected return",
      "Teams experimenting with AI tools in ways no one has signed off",
    ],
    solutions: [
      "A ranked portfolio of use cases scored on value, feasibility and risk",
      "Business cases with assumptions you can check and numbers you can defend",
      "A 12-month roadmap that sequences quick wins ahead of bigger bets",
      "An operating model: who owns AI, how it's governed and how it's measured",
    ],
    deliverables: [
      { title: "AI opportunity assessment", text: "Interviews and process walkthroughs across functions to find where time, cost and revenue are actually lost." },
      { title: "Use-case prioritisation", text: "Every idea scored on business value, data readiness, technical feasibility and risk, then ranked." },
      { title: "Business cases", text: "Cost, benefit and payback for the top use cases, with the assumptions written down." },
      { title: "Data & technology readiness", text: "A clear view of what your data, systems and security posture can support today, and what's missing." },
      { title: "AI roadmap", text: "A sequenced plan of pilots and production builds, with owners, milestones and budgets." },
      { title: "Operating model & governance", text: "Decision rights, policies and success metrics, so AI is run as a capability, not a series of experiments." },
    ],
    useCases: {
      finance: "Prioritised AI roadmap for a lender: document-heavy credit operations first, then collections and customer service.",
      healthcare: "Assessment of patient-access, scheduling and clinical-documentation workflows, with a privacy-first sequencing plan.",
      retail: "Value map across merchandising, customer service and marketing, focused on margin and repeat purchase.",
      realEstate: "Roadmap from lead handling to site-visit conversion and post-sale service, with a business case for each step.",
      education: "Admissions, student support and academic operations assessed for AI impact and data-protection risk.",
      technology: "Product and operations review identifying where AI features differentiate and where they only add cost.",
      hospitality: "Guest experience, reservations and back-of-house operations ranked by labour saved and revenue protected.",
    },
    process: [
      { title: "Align", text: "Leadership interviews to agree objectives, constraints and what success looks like." },
      { title: "Assess", text: "Function-by-function discovery of processes, data and systems, with the people who run them." },
      { title: "Prioritise", text: "Use cases scored, business cases built and trade-offs made explicit." },
      { title: "Plan", text: "A roadmap, operating model and the first pilot scoped and ready to start." },
    ],
    faqs: [
      { q: "How long does an AI strategy engagement take?", a: "Our Opportunity Sprint runs 2 to 3 weeks and ends with a prioritised, costed roadmap. Larger organisations with several business units usually take 4 to 6 weeks." },
      { q: "Do you only recommend projects you can build?", a: "No. Some of the best recommendations are configuring tools you already own, or not using AI at all. We say so plainly." },
      { q: "Who needs to be involved from our side?", a: "A senior sponsor, the leads of the functions in scope and someone who can grant access to systems and data. We keep the time we ask for to a few hours per person." },
      { q: "What do we get at the end?", a: "A ranked use-case portfolio, business cases for the top opportunities, a 12-month roadmap, a governance outline and a scoped first pilot." },
      { q: "Is the strategy vendor-neutral?", a: "Yes. We work across OpenAI, Anthropic, Google, open-source models and the major clouds, and recommend what fits your constraints." },
    ],
  },

  "ai-agents-automation": {
    headline: "Agents that do the work, not just the demo.",
    intro:
      "We design and build agentic workflows and automation that take on real operational work: reading documents, updating systems, following up and escalating to people when judgement is needed.",
    problems: [
      "Skilled people spend hours a day moving data between systems",
      "Work waits in queues because a step depends on someone remembering",
      "Automation built in silos breaks quietly and no one owns it",
      "Agent pilots that can't be trusted with real customer data",
    ],
    solutions: [
      "Agents with clear scope, tool permissions and human approval where it matters",
      "Workflows that connect CRM, ERP, finance, messaging and document systems",
      "Monitoring, logging and alerts so every run is observable and auditable",
      "Measured outcomes: hours returned, cycle time cut, errors avoided",
    ],
    deliverables: [
      { title: "Process discovery", text: "We map how work really flows, then rank automation candidates by value, volume and risk." },
      { title: "Agent design", text: "Scope, tools, guardrails, escalation paths and evaluation criteria defined before a line of code." },
      { title: "Workflow engineering", text: "Production workflows on n8n, cloud functions or custom services, whatever your security and scale require." },
      { title: "Document intelligence", text: "Extraction, classification and validation for invoices, contracts, forms and correspondence." },
      { title: "Systems integration", text: "Salesforce, HubSpot, Zoho, SAP, Tally, Google Workspace, Microsoft 365, WhatsApp and more." },
      { title: "Operations & monitoring", text: "Dashboards, alerting, run logs and runbooks, so your team can operate what we build." },
    ],
    useCases: {
      finance: "Loan applications read, verified against policy and summarised for credit officers, with exceptions routed for review.",
      healthcare: "Referral letters and lab reports extracted into the patient system, with scheduling and follow-ups triggered automatically.",
      retail: "Order exceptions, returns and supplier invoices handled end to end across the store, ERP and courier systems.",
      realEstate: "Enquiries from every channel qualified, scored and written into the CRM with a site-visit slot booked.",
      education: "Admissions documents checked, fee reminders sent and weekly progress summaries generated for families.",
      technology: "Trial sign-ups enriched and routed, support tickets triaged and churn-risk signals raised to account teams.",
      hospitality: "Daily sales, inventory and channel payouts reconciled into one morning report, with variances flagged.",
    },
    process: [
      { title: "Map", text: "Workshops with process owners to document steps, systems, volumes and failure points." },
      { title: "Prototype", text: "The highest-value workflow built first and run on real data inside our Labs within weeks." },
      { title: "Harden", text: "Security review, error handling, permissions, logging and evaluation before go-live." },
      { title: "Scale", text: "Further workflows rolled out in priority order, with impact measured at each step." },
    ],
    faqs: [
      { q: "What is the difference between automation and an AI agent?", a: "Automation follows fixed rules. An agent can read unstructured inputs, decide which step comes next and use tools, within limits we define. Most production systems combine both." },
      { q: "How do you keep agents safe with real data?", a: "Narrow permissions, approval steps for consequential actions, full run logs, evaluation before release and model tiers that don't train on your data." },
      { q: "Can you work inside our cloud and security policies?", a: "Yes. We can deploy in your AWS, Azure or Google Cloud account, use your identity provider and follow your change-management process." },
      { q: "How do you measure success?", a: "We agree baseline metrics up front (hours, cycle time, error rate, backlog) and report against them after launch." },
      { q: "What happens after go-live?", a: "You get documentation and runbooks. Many clients keep us on a Run & Evolve engagement to monitor, tune and extend the system." },
    ],
  },

  "conversational-ai": {
    headline: "Every customer answered, in their language, at any hour.",
    intro:
      "We build voice and chat agents that handle real conversations across phone, WhatsApp and web: answering questions, qualifying, booking and resolving, and handing over to your team with full context when needed.",
    problems: [
      "Calls and messages go unanswered outside office hours or at peak times",
      "Customers repeat themselves across channels and agents",
      "Contact-centre costs rise faster than service quality",
      "Customers expect to be served in their own language",
    ],
    solutions: [
      "Voice and chat agents live on your existing numbers and channels",
      "Natural conversations in English, Hindi and regional languages",
      "Direct integration with calendars, CRM, order and ticketing systems",
      "Clean handover to people, with a summary of everything said",
    ],
    deliverables: [
      { title: "Conversation design", text: "Intents, flows, tone of voice and escalation rules, designed with your service team." },
      { title: "Voice agents", text: "Inbound and outbound calling with low-latency speech, interruption handling and call recording." },
      { title: "WhatsApp & web agents", text: "Messaging agents that share the same knowledge and logic as your voice channel." },
      { title: "System integrations", text: "Bookings, orders, tickets and customer records read and updated in real time." },
      { title: "Quality & analytics", text: "Transcripts, resolution rates, sentiment and containment, reviewed weekly." },
      { title: "Compliance", text: "Disclosure, consent, data retention and call-recording practices set up correctly." },
    ],
    useCases: {
      finance: "Inbound service line that handles balance, EMI and document queries, and verifies callers before escalating.",
      healthcare: "Appointment booking, rescheduling and reminders by phone and WhatsApp, with clinical questions sent to staff.",
      retail: "Order status, returns and cash-on-delivery confirmation calls that cut failed deliveries.",
      realEstate: "Every enquiry called back within minutes, qualified and booked for a site visit.",
      education: "Admission enquiries answered in Hindi and English, with counsellor callbacks scheduled automatically.",
      technology: "Tier-1 support across chat and phone, grounded in your documentation, with tickets created on handover.",
      hospitality: "Reservations, modifications and guest requests handled around the clock across phone and WhatsApp.",
    },
    process: [
      { title: "Design", text: "Call and chat reviews with your team to design flows, tone and escalation." },
      { title: "Pilot", text: "One channel and one use case live with a controlled share of traffic." },
      { title: "Tune", text: "Transcript reviews, prompt and flow updates, and latency optimisation." },
      { title: "Expand", text: "More use cases, languages and channels as quality targets are met." },
    ],
    faqs: [
      { q: "Will customers know they're speaking to AI?", a: "Yes. We recommend a short disclosure at the start of every conversation, and customers can ask for a person at any time." },
      { q: "Which languages do you support?", a: "English and Hindi in production, with Tamil, Kannada, Telugu, Marathi and others depending on the speech providers your use case needs." },
      { q: "Can it use our existing phone numbers?", a: "Yes. We connect through your telephony provider or SIP trunk, or provision new numbers if you prefer." },
      { q: "How do you control what the agent says?", a: "Answers are grounded in approved knowledge, sensitive topics are routed to people, and every conversation is logged for review." },
      { q: "How is quality measured?", a: "Resolution rate, containment, handover quality, customer satisfaction and latency, reviewed with your team every week during tuning." },
    ],
  },

  "data-knowledge-ai": {
    headline: "AI that answers from your knowledge, and shows its sources.",
    intro:
      "We build the data foundations and retrieval systems that ground AI in your own documents, records and metrics, so answers are accurate, current, permission-aware and traceable.",
    problems: [
      "Critical knowledge is scattered across drives, wikis, email and systems",
      "General-purpose chatbots give confident answers that are wrong",
      "Data is too fragmented or messy for reliable AI",
      "No way to test whether an AI system is getting better or worse",
    ],
    solutions: [
      "Retrieval systems that cite the source of every answer",
      "Access controls that respect who is allowed to see what",
      "Data pipelines that keep knowledge current and clean",
      "Evaluation suites that measure accuracy before and after every change",
    ],
    deliverables: [
      { title: "Knowledge assistants", text: "Search and Q&A over policies, contracts, manuals and tickets, with citations." },
      { title: "Data foundations", text: "Ingestion, cleaning and modelling of the data your AI and analytics depend on." },
      { title: "Retrieval engineering", text: "Chunking, embeddings, hybrid search and re-ranking tuned to your content." },
      { title: "Analytics & forecasting", text: "Dashboards and forecasts for demand, cash flow, capacity and risk." },
      { title: "Evaluation", text: "Test sets and automated scoring for accuracy, faithfulness and safety." },
      { title: "Security & access", text: "Document-level permissions, audit logs and data residency choices." },
    ],
    useCases: {
      finance: "Policy and product assistant for relationship managers, answering from current circulars with references.",
      healthcare: "Protocol and formulary search for staff, restricted by role and kept current from the source documents.",
      retail: "Catalogue and supplier knowledge assistant for buying teams, plus demand forecasts by store and season.",
      realEstate: "Project documents, approvals and inventory searchable in one place for sales and legal teams.",
      education: "Curriculum and policy assistant for teachers and counsellors, grounded in approved material.",
      technology: "Support and engineering knowledge base that answers from docs, tickets and code, with links to sources.",
      hospitality: "Standard operating procedures and property information available to every shift, in any language.",
    },
    process: [
      { title: "Audit", text: "Inventory of sources, formats, owners, sensitivity and update frequency." },
      { title: "Foundations", text: "Pipelines, cleaning and access rules for the content in scope." },
      { title: "Build & evaluate", text: "Retrieval and generation tuned against a test set agreed with your experts." },
      { title: "Operate", text: "Monitoring, feedback loops and scheduled re-evaluation as content changes." },
    ],
    faqs: [
      { q: "What is RAG?", a: "Retrieval-augmented generation: the system first finds the relevant passages in your content, then writes an answer from them and cites where they came from." },
      { q: "How do you prevent wrong answers?", a: "Grounding in retrieved sources, refusing when evidence is missing, citations on every answer and evaluation against expert-written test questions." },
      { q: "Will it respect our access permissions?", a: "Yes. Permissions are enforced at retrieval, so people only get answers from documents they're allowed to see." },
      { q: "Can our data stay in India?", a: "Yes. We can deploy storage and models in Indian cloud regions and choose providers that meet your residency requirements." },
      { q: "Which data sources do you connect to?", a: "Google Drive, SharePoint, Confluence, Notion, databases, ticketing systems, CRMs and file stores, plus custom APIs." },
    ],
  },

  "ai-product-engineering": {
    headline: "AI-native products, engineered to production standard.",
    intro:
      "We design and engineer web platforms, mobile apps and digital experiences with AI built into their core, taking them from first prototype to a secure, scalable product your customers rely on.",
    problems: [
      "AI features bolted on as an afterthought, not designed into the product",
      "Prototypes that can't survive real users, real data or real load",
      "Separate agencies for design, engineering and AI that never quite connect",
      "Websites and apps that look dated next to the competition",
    ],
    solutions: [
      "Product strategy, design and engineering in one senior team",
      "AI capabilities designed into workflows from day one",
      "Modern, scalable architecture with security and observability built in",
      "A working release every sprint, so progress is always visible",
    ],
    deliverables: [
      { title: "Product discovery", text: "Users, jobs, risks and scope agreed through research and rapid prototypes." },
      { title: "Experience design", text: "Interaction design and design systems built for web and mobile." },
      { title: "Web platforms", text: "Customer portals, marketplaces, internal tools and high-performance websites." },
      { title: "Mobile apps", text: "iOS and Android apps from a shared codebase, with offline support where needed." },
      { title: "AI features", text: "Assistants, recommendations, search and generation, evaluated and monitored in production." },
      { title: "Cloud & MLOps", text: "CI/CD, infrastructure as code, observability and model operations." },
    ],
    useCases: {
      finance: "Customer onboarding app with document capture, AI verification and a human review console.",
      healthcare: "Patient app for booking, records and follow-ups, with an assistant for pre-visit questions.",
      retail: "Headless storefront with AI search and recommendations, built for speed on mobile networks.",
      realEstate: "Buyer portal with inventory, payment schedules and construction updates in one place.",
      education: "Learning platform with adaptive practice and an AI tutor that gives hints before answers.",
      technology: "SaaS product built from MVP to scale, with AI features shipped behind evaluation gates.",
      hospitality: "Direct-booking platform with menus, ordering and loyalty, connected to point-of-sale systems.",
    },
    process: [
      { title: "Discover", text: "Research, scope and a clickable prototype to align stakeholders quickly." },
      { title: "Design", text: "Experience and design system defined, with AI interactions prototyped early." },
      { title: "Engineer", text: "Two-week sprints with a demo every sprint and continuous delivery." },
      { title: "Launch & evolve", text: "Release, measure and iterate on real usage data." },
    ],
    faqs: [
      { q: "What technology do you build with?", a: "Typically Next.js and React for the web, React Native for mobile, Node.js or Python services, PostgreSQL, and AWS, Azure or Google Cloud. We adapt to your standards." },
      { q: "Do we own the code?", a: "Yes. Everything is built in repositories and cloud accounts you own from the first day." },
      { q: "How long does a first release take?", a: "A focused first release usually ships in 8 to 12 weeks, depending on scope and integrations." },
      { q: "Can you work with our in-house team?", a: "Yes. We can lead delivery, embed alongside your engineers or hand over to them with documentation and pairing." },
      { q: "Do you build websites as well?", a: "Yes. Marketing sites and digital experiences are part of this practice, built for performance, accessibility and search visibility." },
    ],
  },

  "ai-enablement": {
    headline: "Make AI part of how your people work, safely.",
    intro:
      "We help organisations adopt AI with confidence: training teams on their real work, designing adoption programmes that stick, and putting responsible-AI policies and controls in place.",
    problems: [
      "Licences bought, but usage low and value unclear",
      "Employees using AI tools in ways that expose data",
      "No policy for what AI can and can't be used for",
      "Uncertainty about regulation, including India's DPDP Act",
    ],
    solutions: [
      "Role-based training built around each team's actual tasks",
      "Adoption programmes with champions, playbooks and usage tracking",
      "Clear AI policies, approved tools and data-handling rules",
      "Governance processes for reviewing, approving and monitoring AI systems",
    ],
    deliverables: [
      { title: "Leadership briefings", text: "What AI can and can't do for your organisation, without the hype." },
      { title: "Team training", text: "Hands-on workshops for sales, operations, finance, HR and engineering, using their own workflows." },
      { title: "Prompt & workflow playbooks", text: "Tested prompts and step-by-step guides for each team's recurring tasks." },
      { title: "AI policy", text: "Acceptable use, approved tools, data classification and escalation, written for real people." },
      { title: "Governance framework", text: "Risk assessment, approval, monitoring and incident processes for AI systems." },
      { title: "Privacy & compliance", text: "DPDP-aware data handling, consent, retention and vendor due diligence." },
    ],
    useCases: {
      finance: "AI policy and controls for a regulated lender, plus training for credit and service teams.",
      healthcare: "Staff training on safe use of AI for documentation, with patient-data rules built in.",
      retail: "Marketing and merchandising teams trained on AI content and analysis workflows.",
      realEstate: "Sales teams trained on AI-assisted follow-up, proposals and market research.",
      education: "Faculty programme on using AI in teaching and assessment, with academic-integrity guidelines.",
      technology: "Engineering enablement on AI-assisted development, code review and security.",
      hospitality: "Front-office and operations staff trained on AI tools in multiple languages.",
    },
    process: [
      { title: "Baseline", text: "Survey current AI use, skills, tools and risks across teams." },
      { title: "Design", text: "Curriculum, playbooks and policy drafted with each function." },
      { title: "Deliver", text: "Workshops, office hours and champions in each team." },
      { title: "Govern", text: "Policies adopted, usage measured and controls reviewed on a schedule." },
    ],
    faqs: [
      { q: "Is the training generic or tailored?", a: "Tailored. Every session uses examples and exercises from the team's own work, and leaves them with playbooks they keep using." },
      { q: "Do you cover the DPDP Act?", a: "Yes. We help you apply India's Digital Personal Data Protection Act to AI use: lawful purpose, consent, data minimisation, retention and vendor obligations. We work alongside your legal counsel rather than replacing it." },
      { q: "Which tools do you train on?", a: "Whatever you've licensed or plan to: ChatGPT, Claude, Gemini, Microsoft Copilot and specialist tools for each function." },
      { q: "How do you measure adoption?", a: "Usage data where tools allow it, before-and-after task timings, and short surveys at 30 and 90 days." },
      { q: "Can this run alongside a build project?", a: "Yes. Enablement often runs in parallel with a pilot so teams are ready to use the system the day it launches." },
    ],
  },

  "brand-growth": {
    headline: "Take what you build to market, with AI in the workflow.",
    intro:
      "Our growth practice brings brand, content and marketing into the same team that builds your AI and products. AI-assisted production lets us create more, test faster and learn what actually moves customers.",
    problems: [
      "A strong product with a brand and story that undersell it",
      "Content production that can't keep pace with channels",
      "Campaigns judged on reach rather than revenue",
      "Creative, media and product working from different briefs",
    ],
    solutions: [
      "Positioning and identity that make the offer clear and credible",
      "AI-assisted content workflows that multiply output without losing craft",
      "Performance marketing with creative testing built in",
      "Creator and partnership programmes tracked to sales",
    ],
    deliverables: [
      { title: "Brand & positioning", text: "Strategy, messaging, naming and identity systems with full guidelines." },
      { title: "Content production", text: "Video, short-form, photography and design, produced with AI-assisted workflows." },
      { title: "Performance marketing", text: "Search, social and programmatic campaigns with weekly creative testing." },
      { title: "Creator programmes", text: "Discovery, briefs, logistics and attribution for creator and partner campaigns." },
      { title: "Launch campaigns", text: "Integrated go-to-market for new products, features and markets." },
      { title: "Measurement", text: "Attribution, dashboards and monthly reviews tied to pipeline and revenue." },
    ],
    useCases: {
      finance: "Brand refresh and digital acquisition for a lending product, with compliance-reviewed creative.",
      healthcare: "Patient-acquisition campaigns and educational content, reviewed for medical accuracy.",
      retail: "Always-on content and creator programme, with every post tracked to sales.",
      realEstate: "Project launch campaign: naming, identity, film and lead-generation media.",
      education: "Admissions campaign across search, social and video, measured to enrolments.",
      technology: "Category positioning and demand generation for a B2B software product.",
      hospitality: "Brand and launch campaign for a new property or restaurant group.",
    },
    process: [
      { title: "Position", text: "Audience, message and proof points agreed before anything is made." },
      { title: "Create", text: "Brand and content produced in batches with AI-assisted workflows." },
      { title: "Launch", text: "Campaigns live across channels, with tracking in place from the first day." },
      { title: "Optimise", text: "Monthly reviews of what drove pipeline, with creative and spend adjusted." },
    ],
    faqs: [
      { q: "Why does an AI consultancy offer brand and growth?", a: "Because products and systems create value only when people use them. Keeping go-to-market in the same team means launches reflect what was actually built." },
      { q: "Do you use AI to generate creative?", a: "We use AI to speed up research, scripting, editing, versioning and testing. Strategy, taste and final craft stay with people." },
      { q: "Do you manage media budgets?", a: "Yes. We plan and run paid media; ad spend is billed at cost and kept separate from our fees." },
      { q: "How do you measure results?", a: "Against pipeline, revenue or acquisition cost agreed at the start, not impressions alone." },
      { q: "Can you work with our existing agency?", a: "Yes. We often handle AI-assisted production or the digital product while an existing agency leads the brand." },
    ],
  },
};
