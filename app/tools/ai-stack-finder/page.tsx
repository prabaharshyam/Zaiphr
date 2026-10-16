import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { aiTools, toolCategories } from "@/config/ai-tools";
import { site } from "@/config/site";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";
import { StackFinder } from "@/components/tools/StackFinder";
import { Faq } from "@/components/sections/service/Faq";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "AI Stack Finder — which AI tools should my business use?",
  description: `Describe your business problem in plain words and get the best AI tools to solve it — a practical stack from ${aiTools.length} vetted tools, how they connect, costs in ₹ and $, and setup steps. Free.`,
  alternates: { canonical: "/tools/ai-stack-finder" },
};

const faqs = [
  { q: "Is the AI Stack Finder really free?", a: "Yes. You get the diagnosis and top tools instantly with no sign-up. The full plan, with every tool, setup steps, workflow and estimates, is free too: just tell us where to email it." },
  { q: "Where do the recommendations come from?", a: `From a curated catalog of ${aiTools.length} real tools across ${Object.keys(toolCategories).length} categories that we maintain and review. The AI can only recommend tools from that list, so it can't invent tools that don't exist.` },
  { q: "Are you paid by these tools?", a: "No. Recommendations aren't sponsored and contain no affiliate links. We make money when businesses hire us to build and automate the stack, not from the tools themselves." },
  { q: "Does it work for Indian businesses?", a: "It's built for them. It prefers tools with WhatsApp, UPI, GST, Indian telephony and Indian-language support when they fit, and shows costs in ₹ as well as $." },
  { q: "What happens to what I type?", a: "Your description is used to generate your plan and is stored so we can show it to you again. If you unlock the full plan, we save your contact details to send it and may follow up once. See our privacy policy for details." },
];

export default function StackFinderPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "AI Stack Finder",
            url: `${site.url}/tools/ai-stack-finder`,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
            publisher: { "@type": "Organization", name: site.name, url: site.url },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        ]}
      />
      <section className="relative overflow-hidden pt-[calc(var(--nav-h)+9vh)] pb-24">
        <div className="bg-grid no-print pointer-events-none absolute inset-x-0 top-0 h-[80vh] opacity-70" aria-hidden />
        <div aria-hidden className="no-print pointer-events-none absolute -top-20 right-0 h-[45vw] w-[45vw] rounded-full bg-signature/10 blur-[150px]" />
        <div className="container-x relative">
          <div className="no-print">
            <Eyebrow>Free tool · AI Stack Finder</Eyebrow>
            <RevealText as="h1" trigger="ready" className="font-display-wide mt-8 max-w-[16ch] text-[clamp(2.8rem,7.5vw,7.5rem)]">
              Tell us the problem. Get the AI stack.
            </RevealText>
            <RevealText as="p" split="words" trigger="ready" delay={0.25} className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              {`Nearly half of small businesses using AI say choosing the right tools is a struggle. Describe what's slowing you down, and we'll match it against ${aiTools.length} vetted tools to give you a practical stack, how it fits together and what it costs.`}
            </RevealText>
          </div>
          <div className="mt-14 max-w-5xl">
            <Suspense fallback={<div className="min-h-[20rem]" />}>
              <StackFinder />
            </Suspense>
          </div>
        </div>
      </section>

      <section aria-labelledby="hiw" className="no-print border-t border-line py-24">
        <div className="container-x">
          <Eyebrow>How it works</Eyebrow>
          <h2 id="hiw" className="font-display-tight mt-5 text-[clamp(2.2rem,4.6vw,4.4rem)]">Three steps, under a minute.</h2>
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              ["Describe it", "Write the problem the way you'd explain it to a friend. Add your industry, team size and budget for sharper results."],
              ["We match it", `Our AI reads your situation and picks the smallest set of tools, from ${aiTools.length} vetted options, that actually solves it.`],
              ["Get your plan", "See the tools instantly, then unlock the full workflow, setup steps and cost estimates, emailed to you as a plan you can keep."],
            ].map(([t, d], i) => (
              <li key={t} className="glass rounded-2xl p-7">
                <span className="font-display-wide text-4xl text-signature">0{i + 1}</span>
                <h3 className="mt-6 text-xl font-medium">{t}</h3>
                <p className="mt-2 leading-relaxed text-muted">{d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-muted">
            Prefer to browse?{" "}
            <Link href="/ai-tools" className="text-signature underline underline-offset-4">
              Explore the AI tools directory →
            </Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="sf-faq" className="no-print border-t border-line py-24">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>FAQ</Eyebrow>
            <h2 id="sf-faq" className="font-display-tight mt-5 text-[clamp(2.2rem,4vw,3.6rem)]">Good questions.</h2>
          </div>
          <div className="lg:col-span-8">
            <Faq items={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
