import { Hero } from "@/components/sections/home/Hero";
import { StackMarquee } from "@/components/sections/home/StackMarquee";
import { ServicesScroll } from "@/components/sections/home/ServicesScroll";
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
    </>
  );
}
