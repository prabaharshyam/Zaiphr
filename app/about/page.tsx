import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";

export const metadata: Metadata = { title: "About", robots: { index: false } };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="About"
      title="A precision lab for growth."
      description="Who we are, how we work and the stack we build with."
      phase={3}
    />
  );
}
