import type { Metadata } from "next";
import { about } from "@/config/about";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";
import { GlassCard } from "@/components/ui/GlassCard";
import { LogoMark } from "@/components/ui/Logo";
import { Testimonials } from "@/components/sections/Testimonials";

export const metadata: Metadata = {
  title: "About",
  description:
    "Zaiphr Labs is an AI-native tech studio building the engines that let small teams move like big companies.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const { team } = about;
  return (
    <>
      <section className="relative overflow-hidden pt-[calc(var(--nav-h)+12vh)] pb-24">
        <div className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-[80vh] opacity-70" aria-hidden />
        <div aria-hidden className="pointer-events-none absolute top-20 -right-40 h-[40vw] w-[40vw] rounded-full bg-signature/10 blur-[140px]" />
        <div className="container-x relative">
          <Eyebrow>About</Eyebrow>
          <RevealText as="h1" trigger="ready" className="font-display-wide mt-8 max-w-[12ch] text-[length:var(--text-giga)]">
            A precision lab for growth.
          </RevealText>
        </div>
      </section>

      <section aria-label="Mission" className="border-t border-line py-24 md:py-36">
        <div className="container-x grid grid-cols-1 gap-10 md:grid-cols-12">
          <p className="label-mono text-muted md:col-span-3">(01) Mission</p>
          <RevealText as="p" className="font-display-tight text-[clamp(1.8rem,3.6vw,3.4rem)] leading-[1.1] md:col-span-9">
            {about.mission}
          </RevealText>
        </div>
      </section>

      <section aria-labelledby="values-heading" className="border-t border-line py-24 md:py-32">
        <div className="container-x">
          <Eyebrow index="02">Values</Eyebrow>
          <h2 id="values-heading" className="font-display-tight mt-5 text-[clamp(2.2rem,4.6vw,4.4rem)]">
            What we won&apos;t compromise on.
          </h2>
          <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {about.values.map((v, i) => (
              <GlassCard key={v.title} as="li" tilt className="flex min-h-[18rem] flex-col justify-between p-7">
                <span className="font-display-wide text-4xl text-text/15">0{i + 1}</span>
                <div>
                  <h3 className="text-xl font-medium">{v.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{v.text}</p>
                </div>
              </GlassCard>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="how-heading" className="border-t border-line bg-bg-2 py-24 md:py-32">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow index="03">How we work</Eyebrow>
            <h2 id="how-heading" className="font-display-tight mt-5 text-[clamp(2.2rem,4.2vw,4rem)]">
              One small, senior team. Accountable end to end.
            </h2>
          </div>
          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:col-span-7">
            {about.principles.map(([t, d]) => (
              <div key={t} className="bg-bg p-8">
                <dt className="text-lg font-medium">{t}</dt>
                <dd className="mt-2 leading-relaxed text-muted">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="team-heading" className="border-t border-line py-24 md:py-32">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow index="04">The team</Eyebrow>
              <RevealText as="h2" className="font-display-tight mt-5 text-[clamp(2.2rem,4.2vw,4rem)]">
                <span id="team-heading">{team.headline}</span>
              </RevealText>
            </div>
            <p className="text-lg leading-relaxed text-muted lg:col-span-6 lg:col-start-7 lg:pt-12">{team.body}</p>
          </div>
          <ul className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.crews.map((c, i) => (
              <GlassCard key={c.title} as="li" tilt className="flex min-h-[22rem] flex-col justify-between p-7">
                <div className="flex items-start justify-between">
                  <span className="font-display-wide text-5xl text-signature">0{i + 1}</span>
                  <LogoMark className="h-6 w-6 text-text/30" />
                </div>
                <div>
                  <h3 className="font-display-tight text-3xl">{c.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{c.text}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <li key={t} className="label-mono rounded-full border border-line-strong px-2.5 py-1 text-[0.6rem]">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="stack-heading" className="border-t border-line py-24 md:py-32">
        <div className="container-x">
          <Eyebrow index="05">Stack</Eyebrow>
          <h2 id="stack-heading" className="font-display-tight mt-5 text-[clamp(2.2rem,4.6vw,4.4rem)]">
            The tools behind the engines.
          </h2>
          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {about.stack.map((g) => (
              <div key={g.group}>
                <p className="label-mono border-b border-line pb-3 text-muted">{g.group}</p>
                <ul className="mt-4 space-y-2.5">
                  {g.items.map((t) => (
                    <li key={t} className="text-lg">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
}
