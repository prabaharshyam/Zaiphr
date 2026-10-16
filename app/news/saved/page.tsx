import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SavedList } from "@/components/news/SavedList";

export const metadata: Metadata = { title: "Saved stories", robots: { index: false } };

export default function SavedPage() {
  return (
    <section className="relative overflow-hidden pt-[calc(var(--nav-h)+10vh)] pb-28">
      <div className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-[60vh] opacity-60" aria-hidden />
      <div className="container-x relative">
        <Eyebrow>AI News · Your list</Eyebrow>
        <h1 className="font-display-wide mt-8 text-[clamp(3rem,8vw,7rem)] leading-[0.95]">Saved.</h1>
        <SavedList />
      </div>
    </section>
  );
}
