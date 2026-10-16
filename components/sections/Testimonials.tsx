import { features } from "@/config/features";
import { testimonials } from "@/config/testimonials";
import { Eyebrow } from "@/components/ui/SectionHeading";

/** Renders nothing until `features.testimonials` is enabled with real quotes. */
export function Testimonials() {
  if (!features.testimonials) return null;
  return (
    <section aria-labelledby="t-heading" className="relative z-10 border-t border-line bg-bg py-24 md:py-32">
      <div className="container-x">
        <Eyebrow>Kind words</Eyebrow>
        <h2 id="t-heading" className="font-display-tight mt-5 text-[clamp(2.2rem,4.6vw,4.4rem)]">
          From the people we build with.
        </h2>
        <ul className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <li key={i} className="glass flex flex-col justify-between rounded-2xl p-8">
              <blockquote className="text-lg leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
              <p className="mt-8">
                <span className="block font-medium">{t.name}</span>
                <span className="label-mono text-[0.62rem] text-muted">{t.role}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
