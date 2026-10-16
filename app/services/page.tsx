import type { Metadata } from "next";
import { services } from "@/config/services";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";
import { TransitionLink } from "@/components/ui/TransitionLink";

export const metadata: Metadata = { title: "Services", robots: { index: false } };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Services"
      title="Seven engines."
      description="AI, product, brand and growth — under one roof, wired together."
      phase={3}
    >
      <ul className="mt-20 border-t border-line">
        {services.map((s) => (
          <li key={s.slug} className="border-b border-line">
            <TransitionLink href={`/services/${s.slug}`} className="flex items-baseline gap-6 py-6 hover:text-signature">
              <span className="label-mono text-muted">{s.index}</span>
              <span className="font-display-tight text-3xl md:text-5xl">{s.title}</span>
            </TransitionLink>
          </li>
        ))}
      </ul>
    </PagePlaceholder>
  );
}
