import type { ServiceDetail } from "@/config/service-details";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";

export function ProblemSolution({ detail }: { detail: ServiceDetail }) {
  return (
    <section aria-labelledby="ps-heading" className="relative z-10 border-t border-line bg-bg py-24 md:py-32">
      <div className="container-x">
        <Eyebrow index="01">Problem → solution</Eyebrow>
        <RevealText id="ps-heading" as="h2" className="font-display-tight mt-5 max-w-3xl text-[clamp(2.2rem,4.6vw,4.4rem)]">
          Sound familiar? Here&apos;s what changes.
        </RevealText>
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2">
          <div className="bg-bg p-8 md:p-12">
            <p className="label-mono text-muted">Today</p>
            <ul className="mt-8 space-y-6">
              {detail.problems.map((p) => (
                <li key={p} className="flex gap-4 text-lg leading-snug text-text/70">
                  <span aria-hidden className="mt-2.5 h-px w-5 shrink-0 bg-muted" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative bg-bg-2 p-8 md:p-12">
            <div aria-hidden className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-signature/15 blur-[90px]" />
            <p className="label-mono relative text-signature">With Zaiphr</p>
            <ul className="relative mt-8 space-y-6">
              {detail.solutions.map((s) => (
                <li key={s} className="flex gap-4 text-lg leading-snug">
                  <span aria-hidden className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-signature text-[0.65rem] text-signature-ink">
                    ✓
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
