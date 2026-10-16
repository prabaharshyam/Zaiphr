import { lowerLabel } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { aiTools, finderIndustries, toolCategories, type ToolCategory } from "@/config/ai-tools";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";
import { Directory } from "@/components/directory/Directory";
import { FinderCta } from "@/components/directory/FinderCta";

export const metadata: Metadata = {
  title: "AI tools directory for small businesses",
  description: `A curated directory of ${aiTools.length} AI and automation tools for founders and small businesses — by category and industry, with free plans and India-ready picks flagged.`,
  alternates: { canonical: "/ai-tools" },
};

export default function AiToolsPage() {
  return (
    <section className="relative overflow-hidden pt-[calc(var(--nav-h)+12vh)] pb-28">
      <div className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-[70vh] opacity-70" aria-hidden />
      <div className="container-x relative">
        <Eyebrow>AI tools directory</Eyebrow>
        <RevealText as="h1" trigger="ready" className="font-display-wide mt-8 max-w-[14ch] text-[length:var(--text-giga)]">
          {`${aiTools.length} AI tools worth your time.`}
        </RevealText>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          Hand-picked for founders and small teams. No sponsored listings and no affiliate links: just tools we&apos;d actually recommend.
        </p>
        <nav aria-label="By industry" className="mt-10 flex flex-wrap gap-2">
          {finderIndustries.map((i) => (
            <Link key={i.slug} href={`/ai-tools/for/${i.slug}`} className="rounded-full border border-line-strong px-3.5 py-1.5 text-sm hover:border-signature hover:text-signature">
              For {lowerLabel(i.label)}
            </Link>
          ))}
        </nav>
        <div className="mt-16">
          <Directory />
        </div>
        <nav aria-label="Categories" className="mt-20 border-t border-line pt-10">
          <p className="label-mono text-muted">Browse by category</p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {(Object.keys(toolCategories) as ToolCategory[]).map((c) => (
              <li key={c}>
                <Link href={`/ai-tools/${c}`} className="text-text/80 hover:text-signature">
                  Best AI tools for {lowerLabel(toolCategories[c])} →
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <FinderCta />
      </div>
    </section>
  );
}
