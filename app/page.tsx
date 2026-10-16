import { Hero } from "@/components/sections/home/Hero";
import { StackMarquee } from "@/components/sections/home/StackMarquee";
import { ServicesScroll } from "@/components/sections/home/ServicesScroll";
import { WorkGallery } from "@/components/sections/home/WorkGallery";
import { Process } from "@/components/sections/home/Process";
import { ToolsTeaser } from "@/components/sections/home/ToolsTeaser";
import { NewsTeaser } from "@/components/sections/home/NewsTeaser";
import { Stats } from "@/components/sections/home/Stats";
import { BlogHighlights } from "@/components/sections/home/BlogHighlights";
import { BigCta } from "@/components/sections/home/BigCta";
import { SceneLoader } from "@/components/three/SceneLoader";
import { getLatestBrief } from "@/lib/server/news/queries";
import { getPosts } from "@/lib/blog";
import { NEWS_CATEGORIES } from "@/lib/news/types";

export const revalidate = 600;

export default async function HomePage() {
  const { items } = await getLatestBrief();
  const stories = items
    .filter((i) => i.whyItMatters)
    .slice(0, 6)
    .map((i) => ({
      id: i.id,
      tag: NEWS_CATEGORIES[i.category],
      headline: i.headline,
      body: i.summary,
      why: i.whyItMatters!,
      source: i.sources[0]?.name ?? "AI News",
    }));
  return (
    <>
      <SceneLoader />
      <div id="scene-zone" className="relative">
        <Hero />
        <StackMarquee />
        <ServicesScroll />
      </div>
      <WorkGallery />
      <Process />
      <ToolsTeaser />
      <NewsTeaser stories={stories} />
      <Stats />
      <BlogHighlights posts={getPosts().slice(0, 3).map((p) => ({ slug: p.slug, title: p.title, category: p.category, minutes: p.minutes, cover: p.cover }))} />
      <BigCta />
    </>
  );
}
