import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";

export const metadata: Metadata = { title: "Contact", robots: { index: false } };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Contact"
      title="Let's build your unfair advantage."
      description="Tell us what you're building. We reply within one business day."
      phase={3}
    />
  );
}
