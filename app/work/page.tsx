import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";

export const metadata: Metadata = { title: "Work", robots: { index: false } };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Work"
      title="Selected builds."
      description="Concept projects and showcase builds across all seven services — each with a full case study."
      phase={3}
    />
  );
}
