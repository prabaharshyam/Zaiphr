import { services } from "@/config/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { ScrambleText } from "@/components/ui/ScrambleText";

/** Phase-1 services index. Phase 2 turns this into the pinned 3D scroll sequence. */
export function ServicesIndex() {
  return (
    <section className="container-x relative py-28 md:py-40" aria-labelledby="services-title">
      <div id="services-title">
        <SectionHeading
          index="01"
          eyebrow="What we build"
          title="Seven engines for unfair growth."
          description="Pick one, or wire them together. Every engine is designed to compound the others."
        />
      </div>
      <ul className="mt-16 border-t border-line md:mt-24">
        {services.map((s) => (
          <li key={s.slug} className="border-b border-line">
            <TransitionLink
              href={`/services/${s.slug}`}
              data-cursor="View"
              className="group relative grid grid-cols-12 items-center gap-4 overflow-hidden py-7 md:py-9"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom scale-y-0 bg-signature transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-y-100"
              />
              <span className="label-mono relative col-span-2 text-muted transition-colors group-hover:text-signature-ink md:col-span-1">
                {s.index}
              </span>
              <span className="font-display-tight relative col-span-10 text-[clamp(1.9rem,5vw,4.5rem)] transition-[color,transform] duration-500 group-hover:translate-x-3 group-hover:text-signature-ink md:col-span-6">
                <ScrambleText text={s.title} duration={500} />
              </span>
              <span className="relative col-span-12 text-muted transition-colors group-hover:text-signature-ink/80 md:col-span-5 md:pl-6">
                {s.summary}
              </span>
            </TransitionLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
