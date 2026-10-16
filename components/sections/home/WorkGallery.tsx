import { getProjects } from "@/lib/work";
import { services } from "@/config/services";
import { WorkTrack } from "./WorkTrack";

/** Server wrapper: reads case studies from content/work and hands cards to the client track. */
export function WorkGallery() {
  const all = getProjects();
  const projects = all
    .filter((p) => p.featured)
    .map((p) => ({
      slug: p.slug,
      client: p.client,
      title: p.title,
      label: p.label,
      industry: p.industry,
      cover: p.cover,
      accent: p.accent,
      service: services.find((s) => s.slug === p.service)?.title ?? p.service,
    }));
  return <WorkTrack projects={projects} total={all.length} />;
}
