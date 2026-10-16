import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { services } from "@/config/services";
import { toolCategories, finderIndustries } from "@/config/ai-tools";
import { getPosts } from "@/lib/blog";
import { getProjects } from "@/lib/work";
import { legalSlugs } from "@/lib/legal";
import { getBriefDates } from "@/lib/server/news/queries";

export const revalidate = 3600;

/** Every public, indexable page. Private routes (admin, auth, saved, unsubscribe) are left out on purpose. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const u = (path: string) => `${site.url}${path}`;
  const now = new Date();
  const posts = getPosts();
  const briefs = await getBriefDates(60);

  return [
    { url: u("/"), lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: u("/services"), changeFrequency: "monthly", priority: 0.9 },
    ...services.map((s) => ({ url: u(`/services/${s.slug}`), changeFrequency: "monthly" as const, priority: 0.9 })),
    { url: u("/tools/ai-stack-finder"), changeFrequency: "monthly", priority: 0.9 },
    { url: u("/tools"), changeFrequency: "monthly", priority: 0.7 },
    { url: u("/ai-tools"), changeFrequency: "weekly", priority: 0.8 },
    ...Object.keys(toolCategories).map((c) => ({ url: u(`/ai-tools/${c}`), changeFrequency: "weekly" as const, priority: 0.7 })),
    ...finderIndustries.map((i) => ({ url: u(`/ai-tools/for/${i.slug}`), changeFrequency: "weekly" as const, priority: 0.7 })),
    { url: u("/news"), lastModified: now, changeFrequency: "daily", priority: 0.8 },
    ...briefs.map((d) => ({ url: u(`/news/${d}`), lastModified: new Date(`${d}T06:00:00+05:30`), changeFrequency: "never" as const, priority: 0.4 })),
    { url: u("/blog"), lastModified: posts[0] ? new Date(posts[0].date) : now, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((p) => ({ url: u(`/blog/${p.slug}`), lastModified: new Date(p.updated ?? p.date), changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: u("/work"), changeFrequency: "monthly", priority: 0.6 },
    ...getProjects().map((p) => ({ url: u(`/work/${p.slug}`), changeFrequency: "yearly" as const, priority: 0.5 })),
    { url: u("/use-cases"), changeFrequency: "monthly", priority: 0.7 },
    { url: u("/about"), changeFrequency: "monthly", priority: 0.6 },
    { url: u("/contact"), changeFrequency: "yearly", priority: 0.7 },
    ...legalSlugs().map((s) => ({ url: u(`/legal/${s}`), changeFrequency: "yearly" as const, priority: 0.2 })),
  ];
}
