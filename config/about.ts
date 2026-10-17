export const about = {
  mission:
    "Big companies have teams for everything: ops, data, design, growth, support. Small teams have ambition and not enough hours. We build the AI-powered engines that close that gap, so a team of ten can move like a team of a hundred.",
  values: [
    { title: "Ship weekly", text: "Momentum beats perfect plans. You'll see something working every week, not a big reveal at the end." },
    { title: "Honest by default", text: "Clear pricing, realistic timelines, labelled concept work, and a straight answer when something isn't worth building." },
    { title: "Systems over hacks", text: "We build engines that compound: documented, monitored and owned by you, not duct-taped growth tricks." },
    { title: "Own the outcome", text: "We measure success in hours saved, leads won and revenue moved, not in deliverables shipped." },
    { title: "Taste matters", text: "AI makes average easy. We care about craft, so what we ship feels unmistakably premium." },
  ],
  principles: [
    ["Your accounts, your code", "Everything is built in tools and repositories you own from day one."],
    ["Fixed-scope sprints", "Clear scope and price per sprint. No open-ended hourly surprises."],
    ["Senior hands only", "The people you meet on the call are the people who build."],
    ["Privacy-first AI", "Minimal data to models, no training on your data and DPDP-aware handling."],
  ],
  team: {
    headline: "A crew of builders, not a chain of handoffs.",
    body: "We're a tight-knit group of tech nerds, creative heads and camera geeks who'd rather build than talk about building. Engineers sit next to designers, editors sit next to automation tinkerers, and everyone obsesses over the same thing: shipping products that solve real problems for startups and growing businesses. No account managers relaying messages. You work directly with the people making your thing.",
    crews: [
      {
        title: "Tech nerds",
        text: "Engineers who live in code, APIs and AI models. They build the apps, agents and automations, and make sure they actually work.",
        tags: ["Full-stack", "AI agents", "Automation"],
      },
      {
        title: "Creative heads",
        text: "Designers, strategists and writers who make young brands look and sound like category leaders, with taste that AI can't fake.",
        tags: ["Brand", "UI/UX", "Copy"],
      },
      {
        title: "Camera geeks",
        text: "Shooters, editors and motion artists who know exactly what makes a thumb stop scrolling, and how to get there in 48 hours.",
        tags: ["Shoots", "Editing", "Motion"],
      },
      {
        title: "Growth tinkerers",
        text: "Performance marketers and creator wranglers who turn attention into pipeline, then measure everything to do it better next month.",
        tags: ["Ads", "Creators", "Analytics"],
      },
    ],
  },
  /** The "Taste" manifesto on /about. */
  taste: {
    eyebrow: "Taste",
    headline: "Anyone can build now. Taste decides what's worth building.",
    body: [
      "AI has made code, copy and design almost free to produce. A few prompts get you a website, an app, a logo or an ad by lunchtime. Across the industry, the people building the most-used AI products keep landing on the same word for what's left: taste.",
      "Taste is knowing which feature to cut, which word lands, which frame holds attention for one more second, and when \"good enough\" is quietly costing you customers. It's the hundred small decisions nobody notices and everybody feels.",
      "It's what we hire for, argue about and refuse to compromise on. We use AI to move fast. We use taste to decide where to go.",
    ],
    contrast: [
      { easy: "Generate a hundred logos", taste: "Pick the one people still remember next year" },
      { easy: "Ship a website in a day", taste: "Know why visitors leave in the first three seconds" },
      { easy: "Write a thousand words", taste: "Find the ten that actually get read" },
      { easy: "Build every feature", taste: "Choose the three that matter, and cut the rest" },
      { easy: "Automate any process", taste: "Know which ones should stay human" },
    ],
    practices: [
      { title: "Opinions, out loud", text: "We tell you what we'd do and why, including when your first idea isn't the strongest one." },
      { title: "The first draft is never the work", text: "AI gives us a fast starting point. Editing, rethinking and refining is where the value is." },
      { title: "Details are the product", text: "Spacing, timing, tone, the way a button responds. Small things add up to whether something feels premium." },
      { title: "Study the best", text: "We pull apart great products, films and brands to understand why they work, not just what they look like." },
      { title: "Taste with a purpose", text: "Beautiful work that doesn't convert is decoration. Everything we make has a job to do, and we measure it." },
    ],
    closing: "Everyone has the same tools now. What you do with them is the difference.",
  },
  stack: [
    { group: "AI & agents", items: ["Claude", "OpenAI", "Whisper / STT", "Neural TTS voices", "Vector search"] },
    { group: "Automation", items: ["n8n", "Make", "Zapier", "WhatsApp Business API", "Twilio"] },
    { group: "Product", items: ["Next.js", "React Native", "TypeScript", "Supabase", "Postgres"] },
    { group: "Commerce & growth", items: ["Shopify", "Razorpay", "Stripe", "Meta Ads", "Google Ads"] },
    { group: "Design & media", items: ["Figma", "After Effects", "Premiere Pro", "CapCut", "Runway"] },
  ],
};
