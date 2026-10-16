import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { services } from "@/config/services";
import { getProjects } from "@/lib/work";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";
import { ServicesList } from "@/components/sections/ServicesList";

export const metadata: Metadata = pageMeta({
  title: "Services",
  description: "AI automations, voice agents, websites, apps, branding, media and influencer marketing. Seven engines from one AI-native studio.",
  path: "/services",
  image: "/og/services.jpg",
});

export default function ServicesPage() {
  const projects = getProjects();
  const rows = services.map((s) => ({
    slug: s.slug,
    index: s.index,
    title: s.title,
    summary: s.summary,
    capabilities: s.capabilities,
    cover: projects.find((p) => p.service === s.slug)?.cover ?? projects.find((p) => p.services.includes(s.slug))?.cover,
  }));
  return (
    <section className="relative overflow-hidden pt-[calc(var(--nav-h)+12vh)] pb-28">
      <div className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-[80vh] opacity-70" aria-hidden />
      <div className="container-x relative">
        <Eyebrow>Services</Eyebrow>
        <RevealText as="h1" trigger="ready" className="font-display-wide mt-8 text-[length:var(--text-giga)]">
          Seven engines.
        </RevealText>
        <RevealText as="p" split="words" trigger="ready" delay={0.3} className="mt-8 max-w-2xl text-xl leading-relaxed text-muted">
          AI, product, brand and growth under one roof, wired together so every engine makes the others stronger.
        </RevealText>
        <div className="mt-20">
          <ServicesList rows={rows} />
        </div>
      </div>
    </section>
  );
}
