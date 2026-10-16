import { lowerLabel } from "@/lib/utils";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { aiTools, toolCategories, type ToolCategory } from "@/config/ai-tools";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ToolTile } from "@/components/directory/ToolTile";
import { FinderCta } from "@/components/directory/FinderCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/config/site";

const isCat = (c: string): c is ToolCategory => c in toolCategories;

export const generateStaticParams = () => Object.keys(toolCategories).map((category) => ({ category }));

export async function generateMetadata({ params }: PageProps<"/ai-tools/[category]">): Promise<Metadata> {
  const { category } = await params;
  if (!isCat(category)) return {};
  const label = toolCategories[category];
  const n = aiTools.filter((t) => t.category === category).length;
  return pageMeta({
    title: `Best AI tools for ${lowerLabel(label)} (${new Date().getFullYear()})`,
    description: `${n} hand-picked AI tools for ${lowerLabel(label)}: what each is best for, free plans, and India-ready options.`,
    path: `/ai-tools/${category}`,
    image: "/og/ai-tools.jpg",
  });
}

export default async function CategoryPage({ params }: PageProps<"/ai-tools/[category]">) {
  const { category } = await params;
  if (!isCat(category)) notFound();
  const label = toolCategories[category];
  const tools = aiTools.filter((t) => t.category === category);
  return (
    <section className="pt-[calc(var(--nav-h)+10vh)] pb-28">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `Best AI tools for ${label}`,
          url: `${site.url}/ai-tools/${category}`,
          itemListElement: tools.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, url: t.url })),
        }}
      />
      <div className="container-x">
        <Link href="/ai-tools" className="label-mono text-muted hover:text-text">← All AI tools</Link>
        <div className="mt-8">
          <Eyebrow>{`${tools.length} tools`}</Eyebrow>
        </div>
        <h1 className="font-display-wide mt-6 max-w-[18ch] text-[clamp(2.6rem,6vw,6rem)]">Best AI tools for {lowerLabel(label)}</h1>
        <h2 className="sr-only">Tools</h2>
        <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <li key={t.id}>
              <ToolTile tool={t} />
            </li>
          ))}
        </ul>
        <FinderCta title={`Which ${lowerLabel(label)} tool fits your business?`} />
      </div>
    </section>
  );
}
