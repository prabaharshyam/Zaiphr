import { site } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { RevealText } from "@/components/ui/RevealText";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { HeroCore } from "./HeroCore";

export function Hero() {
  return (
    <section className="relative z-10 flex min-h-[100svh] flex-col overflow-hidden pt-[var(--nav-h)]">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
      <HeroCore />

      <div className="container-x relative flex flex-1 flex-col justify-end pb-10 md:pb-14">
        <Eyebrow className="mb-6 md:mb-8">AI-native tech studio · Est. 2026</Eyebrow>

        <h1 className="font-display-wide text-[length:var(--text-mega)]">
          <RevealText as="span" trigger="ready" className="block">
            Build like
          </RevealText>
          <RevealText as="span" trigger="ready" delay={0.12} className="block">
            a <span className="text-signature text-glow">giant</span>.
          </RevealText>
        </h1>

        <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-12 md:items-end">
          <RevealText
            as="p"
            split="words"
            trigger="ready"
            delay={0.35}
            className="max-w-xl text-lg leading-relaxed text-muted md:col-span-6 md:text-xl"
          >
            {site.positioning} AI automations, voice agents, websites, apps, brand, media and creators, engineered as one system.
          </RevealText>
          <div className="flex flex-wrap gap-3 md:col-span-6 md:justify-end">
            <Button href="/contact" size="lg">
              Start a project
            </Button>
            <Button href="/tools" size="lg" variant="ghost">
              Try our free tools
            </Button>
          </div>
        </div>

        <div className="label-mono mt-12 flex items-center justify-between border-t border-line pt-5 text-muted">
          <span>Scroll to explore</span>
          <span className="hidden sm:inline">07 services · 01 studio</span>
          <span className="relative block h-8 w-px overflow-hidden bg-line" aria-hidden>
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_1.8s_var(--ease-in-out)_infinite] bg-signature" />
          </span>
        </div>
      </div>
    </section>
  );
}
