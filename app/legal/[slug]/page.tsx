import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { getLegal, legalSlugs } from "@/lib/legal";
import { mdxOptions } from "@/lib/mdx";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { TransitionLink } from "@/components/ui/TransitionLink";

export const generateStaticParams = () => legalSlugs().map((slug) => ({ slug }));

export async function generateMetadata({ params }: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegal(slug);
  return doc ? { title: doc.title, description: doc.summary, alternates: { canonical: `/legal/${slug}` } } : {};
}

export default async function LegalPage({ params }: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const doc = getLegal(slug);
  if (!doc) notFound();
  const updated = new Date(doc.updated).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  return (
    <article className="pt-[calc(var(--nav-h)+10vh)] pb-28">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
            <Eyebrow>Legal</Eyebrow>
            <nav aria-label="Legal pages" className="mt-6">
              <ul className="space-y-2">
                {legalSlugs().map((s) => (
                  <li key={s}>
                    <TransitionLink
                      href={`/legal/${s}`}
                      aria-current={s === slug ? "page" : undefined}
                      className={s === slug ? "text-signature" : "text-muted transition-colors hover:text-text"}
                    >
                      {getLegal(s)?.title}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
        <div className="lg:col-span-8">
          <h1 className="font-display-wide text-[clamp(2.6rem,6vw,5.5rem)]">{doc.title}</h1>
          <p className="label-mono mt-4 text-muted">Last updated {updated}</p>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted">{doc.summary}</p>
          <div className="prose-zl mt-14 max-w-3xl border-t border-line pt-10">
            <MDXRemote source={doc.body} options={mdxOptions} />
          </div>
        </div>
      </div>
    </article>
  );
}
