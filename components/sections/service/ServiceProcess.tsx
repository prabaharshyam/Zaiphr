import type { ServiceDetail } from "@/config/service-details";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";

export function ServiceProcess({ detail }: { detail: ServiceDetail }) {
  return (
    <section aria-labelledby="sp-heading" className="relative z-10 bg-bg py-24 md:py-32">
      <div className="container-x">
        <Eyebrow index="04">Process</Eyebrow>
        <RevealText as="h2" className="font-display-tight mt-5 max-w-3xl text-[clamp(2.2rem,4.6vw,4.4rem)]">
          <span id="sp-heading">How we get you there.</span>
        </RevealText>
        <ol className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {detail.process.map((p, i) => (
            <li key={p.title} className="group relative bg-bg p-8 transition-colors hover:bg-bg-2">
              <span aria-hidden className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-signature transition-transform duration-700 group-hover:scale-x-100" />
              <p className="font-display-wide text-5xl text-text/15 transition-colors group-hover:text-signature">0{i + 1}</p>
              <h3 className="mt-10 text-2xl font-medium">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
