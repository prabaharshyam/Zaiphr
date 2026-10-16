import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";

const pages: Record<string, string> = { privacy: "Privacy Policy", terms: "Terms of Service", cookies: "Cookie Notice" };

export const generateStaticParams = () => Object.keys(pages).map((slug) => ({ slug }));

export async function generateMetadata({ params }: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: pages[slug], robots: { index: false } };
}

export default async function Page({ params }: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const title = pages[slug];
  if (!title) notFound();
  return <PagePlaceholder eyebrow="Legal" title={title} description="Aligned with India's DPDP Act basics." phase={3} />;
}
