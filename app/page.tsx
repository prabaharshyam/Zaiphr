import { Hero } from "@/components/sections/home/Hero";
import { StackMarquee } from "@/components/sections/home/StackMarquee";
import { ServicesIndex } from "@/components/sections/home/ServicesIndex";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StackMarquee />
      <ServicesIndex />
    </>
  );
}
