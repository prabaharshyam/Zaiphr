import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Components available inside content/work/*.mdx. Figures break out of the text column to the
 * full container width; render images at 2000×1250 (Figure) or 1000×1250 (Duo).
 */
function Caption({ children }: { children?: ReactNode }) {
  if (!children) return null;
  return <figcaption className="label-mono mt-4 text-[0.65rem] text-muted">{children}</figcaption>;
}

export function Figure({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="case-fig">
      <div className="overflow-hidden rounded-2xl border border-line md:rounded-3xl">
        <Image src={src} alt={alt} width={2000} height={1250} sizes="(min-width: 1440px) 1360px, 100vw" className="h-auto w-full" />
      </div>
      <Caption>{caption}</Caption>
    </figure>
  );
}

export function Duo({ a, b, altA, altB, caption }: { a: string; b: string; altA: string; altB: string; caption?: string }) {
  return (
    <figure className="case-fig">
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        {[
          [a, altA],
          [b, altB],
        ].map(([src, alt]) => (
          <div key={src} className="overflow-hidden rounded-2xl border border-line md:rounded-3xl">
            <Image src={src} alt={alt} width={1000} height={1250} sizes="(min-width: 768px) 50vw, 100vw" className="h-auto w-full" />
          </div>
        ))}
      </div>
      <Caption>{caption}</Caption>
    </figure>
  );
}

/** A large pull-out line between sections. */
export function Insight({ children }: { children: ReactNode }) {
  return <p className="case-insight">{children}</p>;
}

export const workMdxComponents = { Figure, Duo, Insight };
