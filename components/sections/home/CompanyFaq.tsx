import { companyFaqs } from "@/config/faq";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Faq } from "@/components/sections/service/Faq";
import { JsonLd } from "@/components/seo/JsonLd";

/** Straight answers about the company, for visitors, search engines and AI assistants alike. */
export function CompanyFaq() {
  return (
    <section aria-labelledby="company-faq-heading" className="relative z-10 border-t border-line bg-bg py-24 md:py-32">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: companyFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow>FAQ</Eyebrow>
          <h2 id="company-faq-heading" className="font-display-tight mt-5 text-[clamp(2.2rem,4vw,3.6rem)]">
            About Zaiphr Labs, in plain words.
          </h2>
        </div>
        <div className="lg:col-span-8">
          <Faq items={companyFaqs} />
        </div>
      </div>
    </section>
  );
}
