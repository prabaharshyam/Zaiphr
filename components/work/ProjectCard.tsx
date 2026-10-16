import Image from "next/image";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { cn } from "@/lib/utils";

export interface ProjectCardData {
  slug: string;
  client: string;
  title: string;
  label: string;
  industry: string;
  cover: string;
  accent: string;
  service: string;
}

export function ProjectCard({ p, className, sizes = "(min-width: 1024px) 45vw, 92vw" }: { p: ProjectCardData; className?: string; sizes?: string }) {
  return (
    <TransitionLink href={`/work/${p.slug}`} data-cursor="View" className={cn("group block", className)}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-bg-2">
        <Image
          src={p.cover}
          alt={`${p.client}: ${p.title} (concept mockup)`}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.04]"
        />
        <span className="label-mono absolute top-4 left-4 rounded-full bg-bg/75 px-3 py-1.5 text-[0.62rem] backdrop-blur-md">
          {p.label}
        </span>
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-x-100"
          style={{ background: p.accent }}
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <p className="label-mono text-muted">{p.client}</p>
          <h3 className="mt-2 text-xl font-medium tracking-[-0.01em] transition-colors group-hover:text-signature md:text-2xl">
            {p.title}
          </h3>
        </div>
        <div className="hidden shrink-0 flex-col items-end gap-1.5 sm:flex">
          <span className="label-mono rounded-full border border-line-strong px-2.5 py-1 text-[0.6rem] text-text/80">{p.service}</span>
          <span className="label-mono text-[0.6rem] text-muted">{p.industry}</span>
        </div>
      </div>
    </TransitionLink>
  );
}
