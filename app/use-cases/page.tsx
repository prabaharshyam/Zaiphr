import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { useCases } from "@/config/use-cases";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";
import { UseCaseExplorer } from "@/components/sections/UseCaseExplorer";

export const metadata: Metadata = pageMeta({
  title: "AI use cases by industry",
  description: "Practical AI and automation use cases for real estate, D2C, clinics, education, SaaS and restaurants, with how they work, the tools used and estimated time saved.",
  path: "/use-cases",
  image: "/og/use-cases.jpg",
});

export default function UseCasesPage() {
  return (
    <section className="relative overflow-hidden pt-[calc(var(--nav-h)+12vh)] pb-28">
      <div className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-[80vh] opacity-70" aria-hidden />
      <div className="container-x relative">
        <Eyebrow>Use cases</Eyebrow>
        <RevealText as="h1" trigger="ready" className="font-display-wide mt-8 max-w-[14ch] text-[length:var(--text-giga)]">
          What AI can do for you, this quarter.
        </RevealText>
        <RevealText as="p" split="words" trigger="ready" delay={0.3} className="mt-8 max-w-2xl text-xl leading-relaxed text-muted">
          {`${useCases.length} practical builds, filtered by industry and service. Open any card to see how it works, the tools involved and the time it typically saves.`}
        </RevealText>
        <div className="mt-16">
          <UseCaseExplorer items={useCases} />
        </div>
      </div>
    </section>
  );
}
