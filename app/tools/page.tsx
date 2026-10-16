import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";

export const metadata: Metadata = { title: "Free tools", robots: { index: false } };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Free tools"
      title="Free AI tools."
      description="Competitor analysis, AI readiness score and an automation ROI calculator — useful results in seconds."
      phase={5}
    />
  );
}
