import type { Metadata } from "next";
import Link from "next/link";
import { aiTools, finderIndustries, toolCategories } from "@/config/ai-tools";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Free AI tools for founders",
  description: "Free tools from Zaiphr Labs: find the right AI tools for your business problem, and browse a curated directory of AI tools by category and industry.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  return (
    <section className="relative overflow-hidden pt-[calc(var(--nav-h)+12vh)] pb-28">
      <div className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-[80vh] opacity-70" aria-hidden />
      <div className="container-x relative">
        <Eyebrow>Free tools</Eyebrow>
        <RevealText as="h1" trigger="ready" className="font-display-wide mt-8 max-w-[14ch] text-[length:var(--text-giga)]">
          Free tools for founders.
        </RevealText>

        <Link
          href="/tools/ai-stack-finder"
          data-cursor="Try"
          className="group relative mt-16 block overflow-hidden rounded-3xl border border-line-strong bg-bg-2 p-8 transition-colors hover:border-signature md:p-14"
        >
          <div aria-hidden className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-signature/15 blur-[100px]" />
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <span className="label-mono rounded-full bg-signature px-3 py-1 text-[0.6rem] text-signature-ink">Flagship · Free</span>
              <h2 className="font-display-wide mt-6 text-[clamp(2.4rem,5vw,4.5rem)]">AI Stack Finder</h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
                Describe your business problem in plain words. Get the right AI tools to fix it, how they fit together, what they cost and how to start.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-line bg-bg p-5 font-mono text-sm text-muted">
                <span className="text-signature">›</span> “We keep missing calls during treatments and patients book elsewhere…”
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Retell AI", "Zoho Bookings", "AiSensy"].map((t) => (
                    <span key={t} className="rounded-full bg-signature/10 px-3 py-1 text-xs text-signature">{t}</span>
                  ))}
                </div>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 font-medium text-signature">Try it free →</span>
            </div>
          </div>
        </Link>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Link href="/ai-tools" className="glass group rounded-3xl p-8 transition-colors hover:border-signature">
            <p className="label-mono text-muted">Directory</p>
            <h2 className="font-display-tight mt-4 text-3xl">Browse {aiTools.length} AI tools</h2>
            <p className="mt-2 text-muted">Curated across {Object.keys(toolCategories).length} categories, with free plans and India-ready picks flagged.</p>
            <span className="mt-6 inline-block text-signature">Explore →</span>
          </Link>
          <div className="glass rounded-3xl p-8">
            <p className="label-mono text-muted">By industry</p>
            <h2 className="font-display-tight mt-4 text-3xl">Best AI tools for…</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {finderIndustries.map((i) => (
                <li key={i.slug}>
                  <Link href={`/ai-tools/for/${i.slug}`} className="block rounded-full border border-line-strong px-3.5 py-1.5 text-sm hover:border-signature hover:text-signature">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16">
          <Button href="/tools/ai-stack-finder" size="lg">Find my AI stack</Button>
        </div>
      </div>
    </section>
  );
}
