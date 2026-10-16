import type { Metadata } from "next";
import Image from "next/image";
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
  const { founder } = about;
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

      <section aria-labelledby="founder-heading" className="border-t border-line py-24 md:py-32">
        <div className="container-x grid grid-cols-1 items-center gap-12 md:grid-cols-12">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-bg-2 md:col-span-5">
            {founder.photo ? (
              <Image src={founder.photo} alt={`${founder.name}, ${founder.role}`} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
            ) : (
              <div className="absolute inset-0 grid place-items-center">
                <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
                <div aria-hidden className="absolute h-2/3 w-2/3 rounded-full bg-signature/15 blur-[80px]" />
                <div className="relative flex flex-col items-center gap-4 text-center">
                  <LogoMark className="h-16 w-16 text-text" />
                  <span className="label-mono text-muted">Founder photo · coming soon</span>
                </div>
              </div>
            )}
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Eyebrow index="04">Founder</Eyebrow>
            <h2 id="founder-heading" className="font-display-wide mt-6 text-[clamp(2.6rem,5vw,4.5rem)]">
              {founder.name}
            </h2>
            <p className="label-mono mt-3 text-signature">{founder.role}</p>
            <p className="mt-8 text-lg leading-relaxed text-muted">{founder.bio}</p>
          </div>
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
