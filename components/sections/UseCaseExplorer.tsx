"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { industries, type Industry } from "@/config/service-details";
import { services } from "@/config/services";
import type { UseCase } from "@/config/use-cases";
import { cn } from "@/lib/utils";
import { TransitionLink } from "@/components/ui/TransitionLink";

const chip = (on: boolean) =>
  cn(
    "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
    on ? "border-signature bg-signature text-signature-ink" : "border-line-strong hover:border-text",
  );

function Flow({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-col gap-2 md:flex-row md:items-stretch md:gap-0" aria-label="How it works">
      {steps.map((s, i) => (
        <li key={s} className="flex flex-col md:flex-1 md:flex-row md:items-center">
          <div className="relative flex-1 rounded-xl border border-line-strong bg-bg p-4">
            <span className="label-mono text-[0.6rem] text-signature">Step {i + 1}</span>
            <p className="mt-1.5 text-sm leading-snug">{s}</p>
          </div>
          {i < steps.length - 1 && (
            <span aria-hidden className="mx-auto my-1 text-signature md:mx-2 md:my-0">
              <span className="md:hidden">↓</span>
              <span className="hidden md:inline">→</span>
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

export function UseCaseExplorer({ items }: { items: UseCase[] }) {
  const [industry, setIndustry] = useState<Industry | "all">("all");
  const [service, setService] = useState<string>("all");
  const [open, setOpen] = useState<string | null>(null);

  const visible = items.filter(
    (u) => (industry === "all" || u.industry === industry) && (service === "all" || u.service === service),
  );
  const serviceName = (slug: string) => services.find((s) => s.slug === slug)?.title ?? slug;

  return (
    <div>
      <div className="space-y-5">
        <div role="group" aria-label="Filter by industry" className="flex flex-wrap items-center gap-2">
          <span className="label-mono mr-2 w-20 text-muted">Industry</span>
          <button aria-pressed={industry === "all"} className={chip(industry === "all")} onClick={() => setIndustry("all")}>
            All
          </button>
          {(Object.keys(industries) as Industry[]).map((k) => (
            <button key={k} aria-pressed={industry === k} className={chip(industry === k)} onClick={() => setIndustry(k)}>
              {industries[k]}
            </button>
          ))}
        </div>
        <div role="group" aria-label="Filter by service" className="flex flex-wrap items-center gap-2">
          <span className="label-mono mr-2 w-20 text-muted">Service</span>
          <button aria-pressed={service === "all"} className={chip(service === "all")} onClick={() => setService("all")}>
            All
          </button>
          {services.map((s) => (
            <button key={s.slug} aria-pressed={service === s.slug} className={chip(service === s.slug)} onClick={() => setService(s.slug)}>
              {s.short}
            </button>
          ))}
        </div>
      </div>

      <p className="label-mono mt-10 text-muted" aria-live="polite">
        {visible.length} use case{visible.length === 1 ? "" : "s"}
      </p>

      <motion.ul layout className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((u) => {
            const isOpen = open === u.id;
            return (
              <motion.li
                key={u.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "glass overflow-hidden rounded-2xl",
                  isOpen && "border-signature/50 md:col-span-2 xl:col-span-3",
                )}
              >
                <motion.button
                  layout="position"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`uc-${u.id}`}
                  onClick={() => setOpen(isOpen ? null : u.id)}
                  className="flex w-full items-start justify-between gap-6 p-6 text-left"
                >
                  <span>
                    <span className="label-mono flex flex-wrap gap-x-3 text-[0.62rem] text-muted">
                      <span>{industries[u.industry]}</span>
                      <span className="text-signature">{serviceName(u.service)}</span>
                    </span>
                    <span className="mt-3 block text-lg leading-snug font-medium">{u.title}</span>
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
                      isOpen ? "rotate-45 border-signature bg-signature text-signature-ink" : "border-line-strong",
                    )}
                  >
                    +
                  </span>
                </motion.button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`uc-${u.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="grid gap-8 border-t border-line p-6 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                          <p className="label-mono text-muted">The problem</p>
                          <p className="mt-2 leading-relaxed">{u.problem}</p>
                          <p className="label-mono mt-6 text-muted">Estimated time saved</p>
                          <p className="font-display-tight mt-2 text-2xl text-signature">{u.timeSaved}</p>
                        </div>
                        <div className="lg:col-span-8">
                          <p className="label-mono mb-3 text-muted">How it works</p>
                          <Flow steps={u.flow} />
                          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                            <ul className="flex flex-wrap gap-2" aria-label="Tools used">
                              {u.tools.map((t) => (
                                <li key={t} className="label-mono rounded-full border border-line-strong px-2.5 py-1 text-[0.6rem]">
                                  {t}
                                </li>
                              ))}
                            </ul>
                            <TransitionLink
                              href={`/contact?service=${u.service}&usecase=${u.id}`}
                              className="label-mono text-signature underline-offset-4 hover:underline"
                            >
                              Build this for me →
                            </TransitionLink>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
      {visible.length === 0 && (
        <p className="mt-10 text-muted">
          Nothing for that combination yet.{" "}
          <TransitionLink href="/contact" className="text-signature underline">
            Tell us your use case
          </TransitionLink>
          .
        </p>
      )}
    </div>
  );
}
