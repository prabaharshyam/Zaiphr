import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { notFound, redirect } from "next/navigation";
import { BriefView } from "@/components/news/BriefView";
import { formatBriefDate, istDate } from "@/lib/news/types";
import { getBrief, getBriefDates } from "@/lib/server/news/queries";

export const revalidate = 3600;

const isDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s));

export async function generateMetadata({ params }: PageProps<"/news/[date]">): Promise<Metadata> {
  const { date } = await params;
  if (!isDate(date)) return {};
  return pageMeta({
    title: `AI news brief, ${formatBriefDate(date, "short")}`,
    description: `The AI stories that mattered for founders on ${formatBriefDate(date)}, each summarised in 60 words.`,
    path: `/news/${date}`,
    image: "/og/news.jpg",
  });
}

export default async function BriefDatePage({ params }: PageProps<"/news/[date]">) {
  const { date } = await params;
  if (!isDate(date)) notFound();
  if (date === istDate()) redirect("/news");
  const [items, dates] = await Promise.all([getBrief(date), getBriefDates()]);
  if (!items.length) notFound();
  return <BriefView date={date} items={items} dates={dates} archive />;
}
