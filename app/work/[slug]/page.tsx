import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { getProject, getProjects } from "@/lib/work";
import { services } from "@/config/services";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";
import { Button } from "@/components/ui/Button";
import { TransitionLink } from "@/components/ui/TransitionLink";

export const generateStaticParams = () => getProjects().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.client} — ${p.title}`,
    description: p.summary,
    openGraph: { images: [p.cover] },
  };
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const all = getProjects();
  const next = all[(all.findIndex((x) => x.slug === p.slug) + 1) % all.length];
  const serviceNames = p.services.map((s) => services.find((x) => x.slug === s)?.title ?? s);

  return (
    <article className="relative">
      <header className="container-x pt-[calc(var(--nav-h)+10vh)] pb-14">
        <div className="flex flex-wrap items-center gap-3">
          <Eyebrow>{p.client}</Eyebrow>
          <span className="label-mono rounded-full border border-signature/50 px-2.5 py-1 text-[0.6rem] text-signature">
            {p.label}
          </span>
        </div>
        <RevealText as="h1" trigger="ready" className="font-display-wide mt-8 max-w-[16ch] text-[length:var(--text-giga)]">
          {p.title}
        </RevealText>
        <div className="mt-12 grid gap-10 border-t border-line pt-8 md:grid-cols-12">
          <p className="text-lg leading-relaxed text-muted md:col-span-6">{p.summary}</p>
          <dl className="grid grid-cols-2 gap-6 md:col-span-6 md:grid-cols-3">
            <div>
              <dt className="label-mono text-muted">Services</dt>
              <dd className="mt-2 text-sm">{serviceNames.join(", ")}</dd>
            </div>
            <div>
              <dt className="label-mono text-muted">Industry</dt>
              <dd className="mt-2 text-sm">{p.industry}</dd>
            </div>
            <div>
              <dt className="label-mono text-muted">Year</dt>
              <dd className="mt-2 text-sm">{p.year}</dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="container-x">
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-line">
          <Image src={p.cover} alt={`${p.client} concept mockup`} fill priority sizes="100vw" className="object-cover" />
        </div>
      </div>

      <section aria-label="Projected impact" className="container-x mt-20 grid gap-6 md:grid-cols-3">
        {p.metrics.map((m) => (
          <div key={m.label} className="glass rounded-2xl p-6">
            <p className="font-display-wide text-5xl" style={{ color: p.accent }}>
              {m.value}
            </p>
            <p className="mt-3 text-sm text-muted">{m.label}</p>
          </div>
        ))}
        <p className="label-mono text-[0.62rem] text-muted md:col-span-3">
          * Concept project for a fictional brand. Figures are design targets and projections, not client results.
        </p>
      </section>

      <div className="container-x mt-20 grid gap-16 md:grid-cols-12">
        <aside className="md:col-span-4">
          <div className="md:sticky md:top-[calc(var(--nav-h)+2rem)]">
            <p className="label-mono text-muted">Stack</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.stack.map((t) => (
                <li key={t} className="label-mono rounded-full border border-line-strong px-3 py-1.5 text-[0.62rem]">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <div className="prose-zl md:col-span-8">
          <MDXRemote source={p.body} />
        </div>
      </div>

      <section className="container-x mt-28 border-t border-line py-20">
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
