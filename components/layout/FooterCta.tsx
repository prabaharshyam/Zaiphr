"use client";

import { usePathname } from "next/navigation";
import { site } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { RevealText } from "@/components/ui/RevealText";

/** Footer CTA band — hidden on the home page, which ends with its own big CTA. */
export function FooterCta() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
      <div className="container-x relative grid gap-10 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-8">
          <p className="label-mono mb-6 text-muted">Next step</p>
          <RevealText as="p" className="font-display-tight text-[length:var(--text-display)]">
            Have an idea? <span className="text-muted">Let&apos;s engineer it.</span>
          </RevealText>
        </div>
        <div className="flex flex-col items-start justify-end gap-4 md:col-span-4 md:items-end">
          <Button href="/contact" size="lg">
            Start a project
          </Button>
          <a
            href={`mailto:${site.email}`}
            className="label-mono text-muted transition-colors hover:text-signature"
          >
            {site.email}
          </a>
        </div>
      </div>
  );
}
