import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { services } from "@/config/services";
import type { ProjectCardData } from "@/components/work/ProjectCard";
/**
 * Case studies live in content/work/*.mdx. Add a file to add a project -
 * frontmatter drives cards, filters and the case-study page.
 * Images go in public/work/<slug>/ (hero.jpg, 2000×1250, is required).
 */
export interface Project {
  slug: string;
  title: string;
  client: string;
  /** Live Project / Client Project = real, shipped work. Concept Project / Showcase Build = fictional brands. */
  label: "Concept Project" | "Showcase Build" | "Client Project" | "Live Project";
  service: string;
  services: string[];
  industry: string;
  year: number;
  order: number;
  featured: boolean;
  accent: string;
  summary: string;
  metrics: { value: string; label: string }[];
  stack: string[];
  /** What we delivered, shown as a list on the case study. */
  deliverables?: string[];
  timeline?: string;
  /** Public URL for live work. */
  live?: string;
  cover: string;
  body: string;
}

const DIR = path.join(process.cwd(), "content/work");

export function getProjects(): Project[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
      const slug = (data.slug as string) ?? file.replace(/\.mdx$/, "");
      return {
        ...(data as Omit<Project, "slug" | "cover" | "body">),
        slug,
        cover: (data.cover as string) ?? `/work/${slug}/hero.jpg`,
        body: content,
      };
    })
    .sort((a, b) => a.order - b.order);
}

export const getProject = (slug: string) => getProjects().find((p) => p.slug === slug);

/** True for fictional-brand work, whose figures are design targets rather than results. */
export const isConcept = (p: Pick<Project, "label">) => p.label === "Concept Project" || p.label === "Showcase Build";

export const toCard = (p: Project): ProjectCardData => ({
  slug: p.slug,
  client: p.client,
  title: p.title,
  label: p.label,
  industry: p.industry,
  cover: p.cover,
  accent: p.accent,
  service: services.find((s) => s.slug === p.service)?.title ?? p.service,
});
