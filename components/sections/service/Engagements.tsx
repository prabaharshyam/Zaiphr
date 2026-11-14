import { engagements } from "@/config/engagements";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

/** How clients work with us, from first sprint to ongoing operation. No price lists: every engagement is scoped. */
export function Engagements({ serviceSlug }: { serviceSlug: string }) {
  return (
    <section id="engage" aria-labelledby="engage-heading" className="relative z-10 scroll-mt-24 bg-bg py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Eyebrow index="06">How we engage</Eyebrow>
            <h2 id="engage-heading" className="font-display-tight mt-5 text-[clamp(2.2rem,4.6vw,4.4rem)]">
              Start focused. Scale what works.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Every engagement is scoped to your objectives and priced after a discovery conversation. Most clients start with
            a sprint or a prototype.
          </p>
        </div>
        <ol className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
          {engagements.map((e, i) => (
            <li key={e.name} className="flex flex-col bg-bg p-8">
              <p className="label-mono text-signature">
                0{i + 1} · {e.duration}
              </p>
              <h3 className="mt-6 text-xl font-medium">{e.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{e.summary}</p>
              <ul className="mt-8 space-y-2.5 border-t border-line pt-6">
                {e.outcomes.map((o) => (
                  <li key={o} className="flex gap-3 text-sm">
                    <span aria-hidden className="text-signature">
                      ✓
                    </span>
                    {o}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <div className="mt-12">
          <Button href={`/contact?service=${serviceSlug}`}>Talk to an expert</Button>
        </div>
      </div>
    </section>
  );
}
