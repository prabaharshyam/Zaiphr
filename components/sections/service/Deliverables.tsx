import type { ServiceDetail } from "@/config/service-details";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";
import { GlassCard } from "@/components/ui/GlassCard";

export function Deliverables({ detail }: { detail: ServiceDetail }) {
  return (
    <section aria-labelledby="del-heading" className="relative z-10 bg-bg py-24 md:py-32">
      <div className="container-x">
        <Eyebrow index="02">What&apos;s included</Eyebrow>
        <RevealText id="del-heading" as="h2" className="font-display-tight mt-5 max-w-3xl text-[clamp(2.2rem,4.6vw,4.4rem)]">
          Everything it takes to ship it properly.
        </RevealText>
        <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {detail.deliverables.map((d, i) => (
            <GlassCard key={d.title} as="li" tilt className="flex min-h-[15rem] flex-col justify-between p-7">
              <span className="label-mono text-muted">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-xl font-medium tracking-[-0.01em]">{d.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{d.text}</p>
              </div>
            </GlassCard>
          ))}
        </ul>
      </div>
    </section>
  );
}
