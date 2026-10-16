"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ProjectCard, type ProjectCardData } from "./ProjectCard";

export function WorkGrid({
  projects,
  filters,
}: {
  projects: (ProjectCardData & { services: string[] })[];
  filters: { slug: string; label: string }[];
}) {
  const [active, setActive] = useState("all");
  const visible = active === "all" ? projects : projects.filter((p) => p.services.includes(active));

  return (
    <>
      <div role="group" aria-label="Filter by service" className="flex flex-wrap gap-2">
        {[{ slug: "all", label: "All work" }, ...filters].map((f) => {
          const count = f.slug === "all" ? projects.length : projects.filter((p) => p.services.includes(f.slug)).length;
          if (!count) return null;
          return (
            <button
              key={f.slug}
              aria-pressed={active === f.slug}
              onClick={() => setActive(f.slug)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors",
                active === f.slug ? "border-signature bg-signature text-signature-ink" : "border-line-strong hover:border-text",
              )}
            >
              {f.label}
              <span className="label-mono text-[0.6rem] opacity-60">{count}</span>
            </button>
          );
        })}
      </div>
      <motion.ul layout className="mt-14 grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.li
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className={cn(i % 2 === 1 && "md:mt-24")}
            >
              <ProjectCard p={p} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
