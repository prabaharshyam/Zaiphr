import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { about } from "@/config/about";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";
import { GlassCard } from "@/components/ui/GlassCard";
import { LogoMark } from "@/components/ui/Logo";
import { Testimonials } from "@/components/sections/Testimonials";

export const metadata: Metadata = pageMeta({
  title: "About",
  description: "Anyone can build with AI now. Taste decides what is worth building. Zaiphr Labs is a crew of tech nerds, creative heads and camera geeks who bring the craft that makes the difference.",
  path: "/about",
  image: "/og/about.jpg",
});

export default function AboutPage() {
  const { team, taste } = about;
  // Light up the word "Taste" in the headline.
  const [before, after] = taste.headline.split("Taste");
  const tasteHeadline = (
    <>
      {before}
      <span className="text-signature">Taste</span>
      {after}
    </>
  );
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

      <section aria-labelledby="taste-heading" className="relative overflow-hidden border-t border-line py-24 md:py-36">
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/3 h-[42vw] w-[42vw] rounded-full bg-signature/[0.07] blur-[160px]" />
        <div className="container-x relative">
          <Eyebrow index="02">{taste.eyebrow}</Eyebrow>
          <RevealText id="taste-heading" as="h2" className="font-display-wide mt-8 max-w-[17ch] text-[clamp(2.3rem,6.2vw,6.5rem)] leading-[0.98]">
            {tasteHeadline}
          </RevealText>

          <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="space-y-6 lg:col-span-6">
              {taste.body.map((para, i) => (
                <p key={i} className={i === 0 ? "text-xl leading-relaxed md:text-2xl" : "text-lg leading-relaxed text-muted"}>
                  {para}
                </p>
              ))}
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="label-mono grid grid-cols-2 gap-6 border-b border-line-strong pb-4 text-[0.62rem]">
                <span className="text-muted">Easy with AI</span>
                <span className="text-signature">Needs taste</span>
              </div>
              <ul>
                {taste.contrast.map((c) => (
                  <li key={c.easy} className="group grid grid-cols-2 gap-6 border-b border-line py-5">
                    <span className="text-muted">{c.easy}</span>
                    <span className="font-medium transition-colors group-hover:text-signature">{c.taste}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h3 className="label-mono mt-24 text-muted">How we practise it</h3>
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {taste.practices.map((p, i) => (
              <GlassCard key={p.title} as="li" tilt className="flex flex-col gap-10 p-6">
                <span aria-hidden data-n={`0${i + 1}`} className="label-mono text-signature before:content-[attr(data-n)]" />
                <div>
                  <p className="text-lg font-medium leading-snug">{p.title}</p>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-muted">{p.text}</p>
                </div>
              </GlassCard>
            ))}
          </ul>

          <RevealText as="p" className="font-display-tight mx-auto mt-24 max-w-4xl text-center text-[clamp(1.8rem,3.6vw,3.4rem)] leading-[1.1]">
            {taste.closing}
          </RevealText>
        </div>
      </section>

      <section aria-labelledby="values-heading" className="border-t border-line py-24 md:py-32">
        <div className="container-x">
          <Eyebrow index="03">Values</Eyebrow>
          <h2 id="values-heading" className="font-display-tight mt-5 text-[clamp(2.2rem,4.6vw,4.4rem)]">
            What we won&apos;t compromise on.
          </h2>
          <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {about.values.map((v, i) => (
              <GlassCard key={v.title} as="li" tilt className="flex min-h-[18rem] flex-col justify-between p-7">
                <span aria-hidden data-n={`0${i + 1}`} className="font-display-wide text-4xl text-text/15 before:content-[attr(data-n)]" />
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
            <Eyebrow index="04">How we work</Eyebrow>
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
              <Eyebrow index="05">The team</Eyebrow>
              <RevealText id="team-heading" as="h2" className="font-display-tight mt-5 text-[clamp(2.2rem,4.2vw,4rem)]">
                {team.headline}
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
          <Eyebrow index="06">Stack</Eyebrow>
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
