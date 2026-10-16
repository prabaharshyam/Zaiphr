import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BriefView } from "@/components/news/BriefView";
import { getBriefDates, getLatestBrief } from "@/lib/server/news/queries";

export const revalidate = 600;

export const metadata: Metadata = pageMeta({
  title: "AI News: the daily brief for founders",
  description: "The AI stories that matter for founders and small businesses, picked every morning and summarised in 60 words with a practical takeaway.",
  path: "/news",
  image: "/og/news.jpg",
});

export default async function NewsPage() {
  const [{ date, items }, dates] = await Promise.all([getLatestBrief(), getBriefDates()]);
  return <BriefView date={date} items={items} dates={dates.filter((d) => d !== date)} />;
}
