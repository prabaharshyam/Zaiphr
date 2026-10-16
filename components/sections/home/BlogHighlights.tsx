import { Eyebrow } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";
import { TransitionLink } from "@/components/ui/TransitionLink";

// TODO(phase 7): replace with the 3 latest posts from content/blog.
const posts = [
  {
    category: "Automation Playbooks",
    title: "15 business processes every SMB should automate first",
    minutes: 9,
    art: "radial-gradient(circle at 30% 40%, rgba(200,255,46,0.55), transparent 45%), radial-gradient(circle at 80% 70%, rgba(80,120,255,0.35), transparent 50%)",
  },
  {
    category: "AI for Business",
    title: "Voice AI agents: what they can actually do in 2026 (and what they cost)",
    minutes: 11,
    art: "repeating-radial-gradient(circle at 50% 50%, rgba(200,255,46,0.35) 0 2px, transparent 2px 14px)",
  },
  {
    category: "Growth & Marketing",
    title: "How to do a competitor analysis in 30 minutes",
    minutes: 8,
    art: "conic-gradient(from 200deg at 60% 50%, rgba(200,255,46,0.5), transparent 25%, rgba(237,238,242,0.2) 50%, transparent 70%)",
  },
];

export function BlogHighlights() {
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
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <li key={p.title}>
              <TransitionLink href="/blog" data-cursor="Read" className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-bg-2">
                  <div
                    aria-hidden
                    className="absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-110"
                    style={{ background: p.art }}
                  />
                  <div className="bg-grid absolute inset-0 opacity-50" aria-hidden />
                  <span className="label-mono absolute top-4 left-4 rounded-full bg-bg/70 px-2.5 py-1 text-[0.6rem] backdrop-blur">
                    Coming soon
                  </span>
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
