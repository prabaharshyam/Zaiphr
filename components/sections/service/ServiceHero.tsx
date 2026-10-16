import type { Service } from "@/config/services";
import type { ServiceDetail } from "@/config/service-details";
import { Button } from "@/components/ui/Button";
import { RevealText } from "@/components/ui/RevealText";
import { Eyebrow } from "@/components/ui/SectionHeading";

export function ServiceHero({ service, detail }: { service: Service; detail: ServiceDetail }) {
  return (
    <section className="relative z-10 flex min-h-[100svh] flex-col overflow-hidden pt-[var(--nav-h)]">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,var(--bg)_30%,transparent_70%)] md:bg-[linear-gradient(to_right,var(--bg)_15%,transparent_60%)]"
      />
      <div className="container-x relative flex flex-1 flex-col justify-end pb-14 md:justify-center md:pb-0">
        <div className="max-w-3xl">
          <Eyebrow index={service.index}>Service</Eyebrow>
          <RevealText as="h1" trigger="ready" className="font-display-wide mt-6 text-[clamp(3rem,8vw,8.5rem)]">
            {service.title}
          </RevealText>
          <RevealText
            as="p"
            trigger="ready"
            delay={0.2}
            className="font-display-tight mt-6 max-w-xl text-[clamp(1.5rem,2.6vw,2.4rem)] text-muted"
          >
            {detail.headline}
          </RevealText>
          <RevealText as="p" split="words" trigger="ready" delay={0.35} className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            {detail.intro}
          </RevealText>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={`/contact?service=${service.slug}`} size="lg">
              Start a project
            </Button>
            <Button href="#pricing" size="lg" variant="ghost">
              See pricing
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
