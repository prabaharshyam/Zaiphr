/**
 * Where the daily AI brief reads from. Public RSS/Atom feeds and the Hacker News API only -
 * no scraping. Add, remove or reweight freely; a broken feed is skipped and shown in /admin.
 *
 * authority (1–10) nudges ranking when the AI curator isn't available, and is shown to it as a hint.
 * aiOnly: false means the feed covers more than AI, so items must mention AI to qualify.
 */
export interface NewsSource {
  id: string;
  name: string;
  kind: "rss" | "hn";
  url: string;
  authority: number;
  aiOnly: boolean;
  india?: boolean;
}

export const newsSources: NewsSource[] = [
  // AI labs & platforms (primary sources)
  { id: "openai", name: "OpenAI", kind: "rss", url: "https://openai.com/news/rss.xml", authority: 9, aiOnly: true },
  { id: "google-ai", name: "Google AI", kind: "rss", url: "https://blog.google/technology/ai/rss/", authority: 9, aiOnly: true },
  { id: "microsoft-ai", name: "Microsoft AI", kind: "rss", url: "https://blogs.microsoft.com/ai/feed/", authority: 7, aiOnly: true },
  { id: "huggingface", name: "Hugging Face", kind: "rss", url: "https://huggingface.co/blog/feed.xml", authority: 7, aiOnly: true },
  { id: "nvidia", name: "NVIDIA", kind: "rss", url: "https://blogs.nvidia.com/feed/", authority: 6, aiOnly: false },

  // Tech press
  { id: "techcrunch", name: "TechCrunch", kind: "rss", url: "https://techcrunch.com/category/artificial-intelligence/feed/", authority: 8, aiOnly: true },
  { id: "the-verge", name: "The Verge", kind: "rss", url: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml", authority: 8, aiOnly: true },
  { id: "venturebeat", name: "VentureBeat", kind: "rss", url: "https://venturebeat.com/category/ai/feed/", authority: 7, aiOnly: true },
  { id: "ars-technica", name: "Ars Technica", kind: "rss", url: "https://arstechnica.com/ai/feed/", authority: 7, aiOnly: true },
  { id: "mit-tr", name: "MIT Technology Review", kind: "rss", url: "https://www.technologyreview.com/topic/artificial-intelligence/feed", authority: 8, aiOnly: true },

  // India startup press
  { id: "inc42", name: "Inc42", kind: "rss", url: "https://inc42.com/feed/", authority: 6, aiOnly: false, india: true },
  { id: "yourstory", name: "YourStory", kind: "rss", url: "https://yourstory.com/feed", authority: 6, aiOnly: false, india: true },

  // Community signal
  { id: "hacker-news", name: "Hacker News", kind: "hn", url: "https://hn.algolia.com/api/v1/search", authority: 6, aiOnly: false },
];
