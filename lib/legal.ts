import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const DIR = path.join(process.cwd(), "content/legal");

export const legalSlugs = () => fs.readdirSync(DIR).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));

export function getLegal(slug: string) {
  const file = path.join(DIR, `${slug}.mdx`);
  if (!legalSlugs().includes(slug)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return { title: data.title as string, updated: data.updated as string, summary: data.summary as string, body: content };
}
