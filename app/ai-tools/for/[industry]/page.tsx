import { lowerLabel } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { finderIndustries, getTool, industryPicks } from "@/config/ai-tools";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ToolTile } from "@/components/directory/ToolTile";
import { FinderCta } from "@/components/directory/FinderCta";

export const generateStaticParams = () => finderIndustries.map((i) => ({ industry: i.slug }));

export async function generateMetadata({ params }: PageProps<"/ai-tools/for/[industry]">): Promise<Metadata> {
  const { industry } = await params;
  const ind = finderIndustries.find((i) => i.slug === industry);
  if (!ind) return {};
  return {
    title: `Best AI tools for ${lowerLabel(ind.label)} (${new Date().getFullYear()})`,
    description: industryPicks[industry]?.intro,
    alternates: { canonical: `/ai-tools/for/${industry}` },
  };
}

export default async function IndustryPage({ params }: PageProps<"/ai-tools/for/[industry]">) {
  const { industry } = await params;
  const ind = finderIndustries.find((i) => i.slug === industry);
  const data = industryPicks[industry];
  if (!ind || !data) notFound();
  return (
    <section className="pt-[calc(var(--nav-h)+10vh)] pb-28">
      <div className="container-x">
        <Link href="/ai-tools" className="label-mono text-muted hover:text-text">← All AI tools</Link>
        <div className="mt-8">
          <Eyebrow>{ind.label}</Eyebrow>
        </div>
        <h1 className="font-display-wide mt-6 max-w-[18ch] text-[clamp(2.6rem,6vw,6rem)]">Best AI tools for {lowerLabel(ind.label)}</h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">{data.intro}</p>
        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.picks.map((p, i) => {
            const t = getTool(p.toolId);
            return t ? (
              <li key={p.toolId} className="relative">
                <span className="label-mono absolute -top-2.5 left-5 z-10 rounded-full bg-signature px-2 py-0.5 text-[0.56rem] text-signature-ink">#{i + 1}</span>
                <ToolTile tool={t} note={p.useFor} />
              </li>
            ) : null;
          })}
        </ol>
        <FinderCta title={`Get a stack tailored to your ${lowerLabel(ind.label)} business`} />
      </div>
    </section>
  );
}
