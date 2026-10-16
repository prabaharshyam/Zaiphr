import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { headingId } from "@/lib/blog-shared";

/**
 * Posts live in content/blog/*.mdx — add a file to publish a post.
 * Covers are generated into public/blog/<slug>/cover.jpg by `node scripts/blog-covers/render.mjs`.
 */
export const BLOG_CATEGORIES = ["AI for Business", "Automation", "Websites & Apps", "Marketing & Growth"] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: BlogCategory;
  tags: string[];
  service: string;
  featured: boolean;
  faq: { q: string; a: string }[];
  minutes: number;
  cover: string;
  headings: { id: string; text: string; level: 2 | 3 }[];
  body: string;
}

const DIR = path.join(process.cwd(), "content/blog");

function readPost(file: string): Post {
  const { data, content } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
  const slug = file.replace(/\.mdx$/, "");
  const words = content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  const headings = [...content.matchAll(/^(##|###) (.+)$/gm)].map((m) => {
    const text = m[2].replace(/[*_`]/g, "").trim();
    return { id: headingId(text), text, level: (m[1] === "##" ? 2 : 3) as 2 | 3 };
  });
  return {
    slug,
    title: String(data.title),
    description: String(data.description),
    date: String(data.date),
    updated: data.updated ? String(data.updated) : undefined,
    category: data.category as BlogCategory,
    tags: (data.tags as string[]) ?? [],
    service: String(data.service ?? "ai-automations"),
    featured: Boolean(data.featured),
    faq: (data.faq as Post["faq"]) ?? [],
    minutes: Math.max(1, Math.round(words / 220)),
    cover: (data.cover as string) ?? `/blog/${slug}/cover.jpg`,
    headings,
    body: content,
  };
}

/** Newest first. Posts dated in the future stay hidden until their day. */
export function getPosts(): Post[] {
  if (!fs.existsSync(DIR)) return [];
  const today = new Date().toISOString().slice(0, 10);
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(readPost)
    .filter((p) => p.date <= today)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug);

/** Same service first, then same category, then newest. */
export function relatedPosts(post: Post, n = 3) {
  const score = (p: Post) => (p.service === post.service ? 2 : 0) + (p.category === post.category ? 1 : 0);
  return getPosts()
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => score(b) - score(a) || b.date.localeCompare(a.date))
    .slice(0, n);
}

export const formatPostDate = (d: string) =>
  new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${d}T00:00:00Z`));
