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

export default function HomePage() {
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
      <NewsTeaser />
      <Stats />
      <BlogHighlights />
      <BigCta />
    </>
  );
}
