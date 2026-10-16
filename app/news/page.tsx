import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";

export const metadata: Metadata = { title: "AI News", robots: { index: false } };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="AI News"
      title="Today in AI."
      description="The AI stories that matter for founders, summarised daily in 60 words."
      phase={6}
    />
  );
}
