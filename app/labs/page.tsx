import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { aiTools } from "@/config/ai-tools";
import { site } from "@/config/site";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = pageMeta({
  title: "Zaiphr Labs: AI prototyping, research and products",
  description:
    "Zaiphr Labs is where AI ideas are proven before they're scaled: 4 to 6 week prototypes on your own data, hands-on evaluation of models and tools, and AI products we build and run ourselves.",
  path: "/labs",
  image: "/og/labs.jpg",
});

const pillars = [
  {
    n: "01",
    title: "Prototype",
    text: "A Labs Prototype takes one high-value use case and proves it on your own data in 4 to 6 weeks, with success criteria agreed before we start and an honest go or no-go at the end.",
  },
  {
    n: "02",
    title: "Research",
    text: "We test models, agent frameworks, voice stacks and retrieval techniques on realistic workloads, comparing accuracy, latency and cost, so our recommendations come from evidence, not vendor decks.",
  },
  {
    n: "03",
    title: "Products",
    text: "We build and run our own AI products. Operating real systems in production keeps our engineering honest and gives clients patterns that are already proven.",
  },
];

const built = [
  {
    href: "/tools/ai-stack-finder",
    tag: "Live · free",
    title: "AI Stack Finder",
    text: `Describe a business problem in plain words and get a recommended set of tools from ${aiTools.length} we've vetted, how they connect, what they cost and how to start. Claude-powered, with a rules-based fallback so it never goes down.`,
  },
  {
    href: "/news",
    tag: "Live · daily",
    title: "AI News brief",
    text: "A fully automated editorial pipeline: stories collected from leading AI and business sources every morning, ranked, de-duplicated and summarised by AI, with a business takeaway on each, then published and emailed to subscribers.",
  },
  {
    href: "/ai-tools",
    tag: "Live · curated",
    title: "AI tools directory",
    text: "A hand-maintained catalogue of AI tools by category and industry, with pricing models and India-ready options flagged. No sponsored listings and no affiliate links.",
  },
  {
    href: "/contact",
    tag: "Live · on every page",
    title: "Zaiphr AI assistant",
    text: "The assistant on this site answers from a knowledge base generated from our own content, streams responses, refuses to invent facts and hands serious enquiries to our team.",
  },
];

const weeks = [
  ["Week 1", "Frame", "Agree the use case, the people who'll use it, success metrics and the data we need. Access and security set up."],
  ["Weeks 2–3", "Build", "A working prototype on your real data, with the core workflow, integrations stubbed where needed and a usable interface."],
  ["Week 4", "Evaluate", "Tested against a set of real cases written with your experts: accuracy, speed, cost per task and failure modes."],
  ["Weeks 5–6", "Decide", "Results reviewed with your sponsors. If it's a go, you get a production plan with architecture, timeline and budget."],
];

const principles = [
  ["Real data, early", "Synthetic demos hide the hard parts. We work with your data from the first week, under your security rules."],
  ["Measured, not admired", "Every prototype is judged against criteria agreed up front, not on how impressive the demo looks."],
  ["Honest go or no-go", "Some ideas shouldn't be built. Finding that out in six weeks is a result, not a failure."],
  ["Built to hand over", "Code, prompts, evaluation sets and documentation are yours, ready for production or for your own team."],
];

export default function LabsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Zaiphr Labs",
          url: `${site.url}/labs`,
          description: "AI prototyping, research and products from Zaiphr Labs.",
          isPartOf: { "@id": `${site.url}/#website` },
          about: { "@id": `${site.url}/#org` },
        }}
      />
      <section className="relative overflow-hidden pt-[calc(var(--nav-h)+12vh)] pb-24">
        <div className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-[80vh] opacity-70" aria-hidden />
        <div className="container-x relative">
          <Eyebrow>Zaiphr Labs</Eyebrow>
          <RevealText as="h1" trigger="ready" className="font-display-wide mt-8 max-w-[14ch] text-[length:var(--text-giga)]">
            Where AI ideas are proven.
          </RevealText>
          <div className="mt-10 grid grid-cols-1 gap-8 border-t border-line pt-8 md:grid-cols-12">
            <p className="text-xl leading-relaxed text-muted md:col-span-7">
              Most AI initiatives fail between the demo and the business. Our labs close that gap: we prototype on real data,
              measure what works, and only then recommend building it at scale.
            </p>
            <div className="flex flex-wrap items-start gap-3 md:col-span-4 md:col-start-9 md:justify-end">
              <Button href="/contact?service=ai-strategy">Start a Labs Prototype</Button>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="labs-what" className="border-t border-line py-24 md:py-32">
        <div className="container-x">
          <Eyebrow index="01">What the labs do</Eyebrow>
          <h2 id="labs-what" className="font-display-tight mt-5 max-w-3xl text-[clamp(2.2rem,4.6vw,4.4rem)]">
            Prototype. Research. Build our own.
          </h2>
          <ul className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
            {pillars.map((p) => (
              <li key={p.n} className="bg-bg p-8 md:p-10">
                <p className="label-mono text-signature">{p.n}</p>
                <h3 className="mt-6 text-2xl font-medium">{p.title}</h3>
                <p className="mt-4 leading-relaxed text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="labs-built" className="border-t border-line py-24 md:py-32">
        <div className="container-x">
          <Eyebrow index="02">Built in our labs</Eyebrow>
          <h2 id="labs-built" className="font-display-tight mt-5 max-w-3xl text-[clamp(2.2rem,4.6vw,4.4rem)]">
            Products we run in production.
          </h2>
          <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {built.map((b) => (
              <li key={b.title}>
                <Link href={b.href} className="glass group flex h-full flex-col rounded-3xl p-8 transition-colors hover:border-signature md:p-10">
                  <span className="label-mono self-start rounded-full border border-signature/50 px-2.5 py-1 text-[0.6rem] text-signature">{b.tag}</span>
                  <h3 className="font-display-tight mt-6 text-3xl">{b.title}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-muted">{b.text}</p>
                  <span className="mt-6 text-signature">Open →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="labs-weeks" className="border-t border-line py-24 md:py-32">
        <div className="container-x">
          <Eyebrow index="03">Labs Prototype</Eyebrow>
          <h2 id="labs-weeks" className="font-display-tight mt-5 max-w-3xl text-[clamp(2.2rem,4.6vw,4.4rem)]">
            From idea to evidence in six weeks.
          </h2>
          <ol className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {weeks.map(([w, t, d]) => (
              <li key={t} className="bg-bg p-8">
                <p className="label-mono text-signature">{w}</p>
                <h3 className="mt-6 text-xl font-medium">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="labs-principles" className="border-t border-line py-24 md:py-32">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow index="04">Principles</Eyebrow>
            <h2 id="labs-principles" className="font-display-tight mt-5 text-[clamp(2.2rem,4vw,3.6rem)]">
              How we run experiments.
            </h2>
          </div>
          <dl className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8">
            {principles.map(([t, d]) => (
              <div key={t} className="border-t border-line pt-6">
                <dt className="text-lg font-medium">{t}</dt>
                <dd className="mt-2 leading-relaxed text-muted">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-line py-24 md:py-32">
        <div className="container-x flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <h2 className="font-display-tight max-w-2xl text-[clamp(2.2rem,4.6vw,4.4rem)]">Have an idea worth testing?</h2>
          <Button href="/contact?service=ai-strategy" size="lg">
            Talk to an expert
          </Button>
        </div>
      </section>
    </>
  );
}
