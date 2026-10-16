import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";

export const metadata: Metadata = { title: "Blog", robots: { index: false } };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Blog"
      title="Field notes."
      description="Practical playbooks on AI, automation, growth and product."
      phase={7}
    />
  );
}
