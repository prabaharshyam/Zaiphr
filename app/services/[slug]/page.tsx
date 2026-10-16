import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { notFound } from "next/navigation";
import { getService, services } from "@/config/services";
import { serviceDetails } from "@/config/service-details";
import { site } from "@/config/site";
import { getProjects, toCard } from "@/lib/work";
import { SceneLoader } from "@/components/three/SceneLoader";
import { ServiceHero } from "@/components/sections/service/ServiceHero";
import { ProblemSolution } from "@/components/sections/service/ProblemSolution";
import { Deliverables } from "@/components/sections/service/Deliverables";
import { IndustryUseCases } from "@/components/sections/service/IndustryUseCases";
import { ServiceProcess } from "@/components/sections/service/ServiceProcess";
import { Pricing } from "@/components/sections/service/Pricing";
import { Faq } from "@/components/sections/service/Faq";
import { ProjectCard } from "@/components/work/ProjectCard";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { JsonLd } from "@/components/seo/JsonLd";

export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  const d = serviceDetails[slug];
  if (!s || !d) return {};
  return pageMeta({
    title: `${s.title}: ${d.headline.replace(/\.$/, "")}`,
    description: d.intro,
    path: `/services/${s.slug}`,
    image: `/og/service-${s.slug}.jpg`,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  const detail = serviceDetails[slug];
  if (!service || !detail) notFound();

  const i = services.findIndex((s) => s.slug === slug);
  const next = services[(i + 1) % services.length];
  const projects = getProjects()
    .filter((p) => p.services.includes(slug))
    .map(toCard);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: detail.intro,
            provider: { "@type": "Organization", name: site.name, url: site.url },
            areaServed: ["IN", "Worldwide"],
            offers: detail.packages.map((p) => ({
              "@type": "Offer",
              name: p.name,
              priceSpecification: { "@type": "PriceSpecification", minPrice: p.inr, priceCurrency: "INR" },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: detail.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]}
      />
      {/* The core starts in this service's form (1–7). */}
      <SceneLoader form={i + 1} />
      <div id="scene-zone">
        <ServiceHero service={service} detail={detail} />
      </div>
      <ProblemSolution detail={detail} />
      <Deliverables detail={detail} />
      <IndustryUseCases detail={detail} title={service.title} />
      <ServiceProcess detail={detail} />

      {projects.length > 0 && (
        <section aria-labelledby="sw-heading" className="relative z-10 border-t border-line bg-bg py-24 md:py-32">
          <div className="container-x">
            <Eyebrow index="05">Showcase</Eyebrow>
            <h2 id="sw-heading" className="font-display-tight mt-5 text-[clamp(2.2rem,4.6vw,4.4rem)]">
              Showcase builds.
            </h2>
            <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2">
              {projects.map((p) => (
                <ProjectCard key={p.slug} p={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Pricing packages={detail.packages} serviceSlug={service.slug} />

      <section aria-labelledby="faq-heading" className="relative z-10 bg-bg py-24 md:py-32">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow index="07">FAQ</Eyebrow>
            <h2 id="faq-heading" className="font-display-tight mt-5 text-[clamp(2.2rem,4vw,3.6rem)]">
              Questions, answered.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <Faq items={detail.faqs} />
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-line bg-bg">
        <TransitionLink href={`/services/${next.slug}`} data-cursor="Next" className="group container-x block py-20">
          <p className="label-mono text-muted">Next service · {next.index}</p>
          <p className="font-display-wide mt-4 text-[clamp(2.6rem,8vw,7rem)] transition-colors group-hover:text-signature">
            {next.title} →
          </p>
        </TransitionLink>
      </section>
    </>
  );
}
