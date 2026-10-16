import Image from "next/image";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";
import { TransitionLink } from "@/components/ui/TransitionLink";

export interface HighlightPost {
  slug: string;
  title: string;
  category: string;
  minutes: number;
  cover: string;
}

export function BlogHighlights({ posts }: { posts: HighlightPost[] }) {
  if (!posts.length) return null;
  return (
    <section aria-labelledby="blog-heading" className="relative z-10 bg-bg py-28 md:py-40">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow index="06">Field notes</Eyebrow>
            <RevealText as="h2" className="font-display-tight mt-5 text-[length:var(--text-display)]">
              <span id="blog-heading">Playbooks, not fluff.</span>
            </RevealText>
          </div>
          <TransitionLink href="/blog" className="label-mono text-muted transition-colors hover:text-signature">
            All articles →
          </TransitionLink>
        </div>
        <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <TransitionLink href={`/blog/${p.slug}`} data-cursor="Read" className="group block">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-bg-2">
                  <Image
                    src={p.cover}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-105"
                  />
                </div>
                <p className="label-mono mt-5 text-muted">
                  {p.category} · {p.minutes} min
                </p>
                <h3 className="mt-2 text-xl leading-snug font-medium tracking-[-0.01em] transition-colors group-hover:text-signature">
                  {p.title}
                </h3>
              </TransitionLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
