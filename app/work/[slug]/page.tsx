import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { mdxOptions } from "@/lib/mdx";
import { getProject, getProjects, isConcept } from "@/lib/work";
import { services } from "@/config/services";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";
import { Button } from "@/components/ui/Button";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { workMdxComponents } from "@/components/work/mdx";

export const generateStaticParams = () => getProjects().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMeta({
    title: `${p.client}: ${p.title}`,
    description: p.summary,
    path: `/work/${p.slug}`,
    image: p.cover,
    imageSize: { width: 2000, height: 1250 },
  });
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const all = getProjects();
  const next = all[(all.findIndex((x) => x.slug === p.slug) + 1) % all.length];
  const serviceNames = p.services.map((s) => services.find((x) => x.slug === s)?.title ?? s);
  const concept = isConcept(p);
  const facts = [
    ["Client", p.client],
    ["Industry", p.industry],
    ["Services", serviceNames.join(", ")],
    ["Year", String(p.year)],
    ...(p.timeline ? [["Timeline", p.timeline]] : []),
  ];

  return (
    <article className="relative">
      <header className="container-x pt-[calc(var(--nav-h)+10vh)] pb-14">
        <div className="flex flex-wrap items-center gap-3">
          <Eyebrow>{p.client}</Eyebrow>
          <span className="label-mono rounded-full border border-signature/50 px-2.5 py-1 text-[0.6rem] text-signature">{p.label}</span>
        </div>
        <RevealText as="h1" trigger="ready" className="font-display-wide mt-8 max-w-[16ch] text-[length:var(--text-giga)]">
          {p.title}
        </RevealText>
        <div className="mt-12 grid gap-10 border-t border-line pt-8 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="text-lg leading-relaxed text-muted">{p.summary}</p>
            {p.live && (
              <div className="mt-8">
                <Button href={p.live} external>
                  Visit {p.live.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                </Button>
              </div>
            )}
          </div>
          <dl className="grid grid-cols-2 gap-6 md:col-span-6 md:grid-cols-3">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="label-mono text-muted">{k}</dt>
                <dd className="mt-2 text-sm">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="container-x">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line md:rounded-3xl">
          <Image
            src={p.cover}
            alt={concept ? `${p.client} concept design shown on desktop and mobile` : `${p.client} live site on desktop and mobile`}
            fill
            priority
            sizes="(min-width: 1440px) 1360px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <section aria-label={concept ? "Design targets" : "At a glance"} className="container-x mt-20 grid gap-6 md:grid-cols-3">
        {p.metrics.map((m) => (
          <div key={m.label} className="glass rounded-2xl p-6">
            <p className="font-display-wide text-5xl" style={{ color: p.accent }}>
              {m.value}
            </p>
            <p className="mt-3 text-sm text-muted">{m.label}</p>
          </div>
        ))}
        <p className="label-mono text-[0.62rem] text-muted md:col-span-3">
          {concept
            ? "* Concept project for a fictional brand. Figures are design targets and projections, not client results."
            : `* Live at ${p.live?.replace(/^https?:\/\//, "") ?? "launch"}. Figures describe what shipped, not traffic or sales.`}
        </p>
      </section>

      <div className="container-x mt-12">
        <div className="case prose-zl">
          <MDXRemote source={p.body} options={mdxOptions} components={workMdxComponents} />
        </div>
      </div>

      <section className="container-x mt-24 grid gap-12 border-t border-line pt-12 md:grid-cols-12">
        {p.deliverables && (
          <div className="md:col-span-6">
            <h2 className="label-mono text-muted">What we delivered</h2>
            <ul className="mt-5 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
              {p.deliverables.map((d) => (
                <li key={d} className="flex gap-3 border-b border-line pb-3">
                  <span aria-hidden className="text-signature">
                    ✓
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className={p.deliverables ? "md:col-span-5 md:col-start-8" : "md:col-span-12"}>
          <h2 className="label-mono text-muted">Tools &amp; stack</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {p.stack.map((t) => (
              <li key={t} className="label-mono rounded-full border border-line-strong px-3 py-1.5 text-[0.62rem]">
                {t}
              </li>
            ))}
          </ul>
          {concept && <p className="mt-6 text-xs text-muted">Photography: Unsplash. Brands, people and data shown are fictional.</p>}
        </div>
      </section>

      <section className="container-x mt-24 border-t border-line py-20">
        <p className="label-mono text-muted">Next project</p>
        <TransitionLink href={`/work/${next.slug}`} className="group mt-4 block" data-cursor="Next">
          <span className="font-display-wide block text-[clamp(2.4rem,7vw,6rem)] transition-colors group-hover:text-signature">
            {next.client}
          </span>
          <span className="mt-2 block text-muted">{next.title}</span>
        </TransitionLink>
        <div className="mt-12">
          <Button href="/contact">Build something like this</Button>
        </div>
      </section>
    </article>
  );
}
