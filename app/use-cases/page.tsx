import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";

export const metadata: Metadata = { title: "Use cases", robots: { index: false } };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Use cases"
      title="What AI can do for you."
      description="20+ practical scenarios, filterable by industry and service."
      phase={3}
    />
  );
}
