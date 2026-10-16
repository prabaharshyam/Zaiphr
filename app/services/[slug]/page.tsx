import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/config/services";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";

export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  return s ? { title: s.title, description: s.summary, robots: { index: false } } : {};
}

export default async function Page({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  return <PagePlaceholder eyebrow={`Service ${s.index}`} title={s.title} description={s.summary} phase={3} />;
}
