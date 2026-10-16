import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Suspense } from "react";
import { site } from "@/config/site";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";
import { ProjectBriefForm } from "@/components/contact/ProjectBriefForm";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description: "Tell us what you're building. Book a free 30-minute strategy call or send a project brief to Zaiphr Labs.",
  path: "/contact",
  image: "/og/contact.jpg",
});

export default function ContactPage() {
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi Zaiphr Labs, I'd like to discuss a project.")}`;
  const calendly = `${site.calendlyUrl}?hide_gdpr_banner=1&background_color=0a0c12&text_color=edeef2&primary_color=c8ff2e`;
  return (
    <>
      <section className="relative overflow-hidden pt-[calc(var(--nav-h)+12vh)] pb-16">
        <div className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-[80vh] opacity-70" aria-hidden />
        <div aria-hidden className="pointer-events-none absolute top-10 -left-40 h-[40vw] w-[40vw] rounded-full bg-signature/10 blur-[140px]" />
        <div className="container-x relative">
          <Eyebrow>Contact</Eyebrow>
          <RevealText as="h1" trigger="ready" className="font-display-wide mt-8 max-w-[13ch] text-[length:var(--text-giga)]">
            Let&apos;s build your unfair advantage.
          </RevealText>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x grid grid-cols-1 gap-16 lg:grid-cols-12">
          <aside className="space-y-10 lg:col-span-4">
            <p className="text-lg leading-relaxed text-muted">
              Tell us what you&apos;re building. We reply within one business day with honest thoughts, even if we&apos;re not
              the right fit.
            </p>
            <ul className="space-y-4">
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 rounded-2xl border border-line-strong p-5 transition-colors hover:border-signature">
                  <span>
                    <span className="label-mono block text-[0.6rem] text-muted">WhatsApp</span>
                    <span className="mt-1 block text-lg">{site.phone}</span>
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-signature text-signature-ink transition-transform group-hover:-rotate-45">→</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="group flex items-center justify-between gap-4 rounded-2xl border border-line-strong p-5 transition-colors hover:border-signature">
                  <span>
                    <span className="label-mono block text-[0.6rem] text-muted">Email</span>
                    <span className="mt-1 block text-lg">{site.email}</span>
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-line-strong transition-transform group-hover:-rotate-45">→</span>
                </a>
              </li>
              <li>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="group flex items-center justify-between gap-4 rounded-2xl border border-line-strong p-5 transition-colors hover:border-signature">
                  <span>
                    <span className="label-mono block text-[0.6rem] text-muted">Call</span>
                    <span className="mt-1 block text-lg">{site.phone}</span>
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-line-strong transition-transform group-hover:-rotate-45">→</span>
                </a>
              </li>
            </ul>
            <p className="label-mono text-muted">{site.location}</p>
          </aside>
          <div className="lg:col-span-8">
            <Suspense fallback={<div className="min-h-[30rem]" />}>
              <ProjectBriefForm />
            </Suspense>
          </div>
        </div>
      </section>

      <section aria-labelledby="call-heading" className="border-t border-line bg-bg-2 py-24">
        <div className="container-x">
          <Eyebrow index="→">Prefer to talk?</Eyebrow>
          <h2 id="call-heading" className="font-display-tight mt-5 text-[clamp(2.2rem,4.6vw,4.4rem)]">
            Book a free 30-minute strategy call.
          </h2>
          <div className="mt-12 overflow-hidden rounded-3xl border border-line bg-bg">
            <iframe
              src={calendly}
              title="Book a call with Zaiphr Labs"
              loading="lazy"
              className="h-[760px] w-full"
            />
          </div>
          <p className="mt-4 text-sm text-muted">
            Calendar not loading?{" "}
            <a href={site.calendlyUrl} target="_blank" rel="noopener noreferrer" className="text-signature underline underline-offset-4">
              Open it in a new tab
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
