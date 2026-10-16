import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { services } from "@/config/services";
import { getProjects, toCard } from "@/lib/work";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";
import { WorkGrid } from "@/components/work/WorkGrid";

export const metadata: Metadata = pageMeta({
  title: "Work",
  description: "Concept projects and showcase builds across AI automation, voice agents, websites, apps, branding, media and influencer marketing.",
  path: "/work",
  image: "/og/work.jpg",
});

export default function WorkPage() {
  const projects = getProjects().map((p) => ({ ...toCard(p), services: p.services }));
  return (
    <section className="relative overflow-hidden pt-[calc(var(--nav-h)+12vh)] pb-28">
      <div className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-[80vh] opacity-70" aria-hidden />
      <div className="container-x relative">
        <Eyebrow>Work</Eyebrow>
        <RevealText as="h1" trigger="ready" className="font-display-wide mt-8 text-[length:var(--text-giga)]">
          Selected builds.
        </RevealText>
        <div className="mt-10 grid grid-cols-1 gap-8 border-t border-line pt-8 md:grid-cols-12">
          <p className="text-xl leading-relaxed text-muted md:col-span-7">
            We&apos;re a new studio, so this is our thinking made visible: concept projects and showcase builds for fictional
            brands, each with a full case study.
          </p>
          <p className="text-sm leading-relaxed text-muted md:col-span-4 md:col-start-9">
            Every card is labelled. Metrics are design targets, never claimed client results. Real client work will appear
            here, marked as such, as it ships.
          </p>
        </div>
        <div className="mt-16">
          <h2 className="sr-only">Projects</h2>
          <WorkGrid projects={projects} filters={services.map((s) => ({ slug: s.slug, label: s.title }))} />
        </div>
      </div>
    </section>
  );
}
