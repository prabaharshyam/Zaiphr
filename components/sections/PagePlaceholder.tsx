import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";
import { Button } from "@/components/ui/Button";

/** Temporary shell for routes that are built in later phases. */
export function PagePlaceholder({
  eyebrow,
  title,
  description,
  phase,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  phase: number;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-[calc(var(--nav-h)+12vh)] pb-24">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-40 h-[40vw] w-[40vw] rounded-full bg-signature/10 blur-[140px]"
      />
      <div className="container-x relative">
        <Eyebrow>{eyebrow}</Eyebrow>
        <RevealText
          as="h1"
          trigger="ready"
          className="font-display-wide mt-8 max-w-[14ch] text-[length:var(--text-giga)]"
        >
          {title}
        </RevealText>
        <RevealText as="p" split="words" trigger="ready" delay={0.3} className="mt-8 max-w-xl text-lg text-muted">
          {description}
        </RevealText>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="/contact">Start a project</Button>
          <span className="label-mono rounded-full border border-line px-3 py-1.5 text-muted">
            Full page ships in phase {phase}
          </span>
        </div>
        {children}
      </div>
    </section>
  );
}
