import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { services } from "@/config/services";
import { serviceDetails } from "@/config/service-details";
import { headingId, textOf } from "@/lib/blog-shared";
import { cn } from "@/lib/utils";

function KeyTakeaways({ children }: { children: ReactNode }) {
  return (
    <aside aria-label="Key takeaways" className="not-prose my-10 rounded-3xl border border-signature/30 bg-signature/[0.05] p-6 md:p-8 [&_ul]:mb-0">
      <p className="label-mono mb-4 text-signature">Key takeaways</p>
      {children}
    </aside>
  );
}

const calloutStyle = {
  tip: { label: "Tip", cls: "border-signature/40 bg-signature/[0.05]", accent: "text-signature" },
  note: { label: "Note", cls: "border-line-strong bg-surface", accent: "text-text" },
  warning: { label: "Watch out", cls: "border-amber-300/40 bg-amber-300/[0.06]", accent: "text-amber-300" },
};

function Callout({ type = "note", title, children }: { type?: keyof typeof calloutStyle; title?: string; children: ReactNode }) {
  const s = calloutStyle[type] ?? calloutStyle.note;
  return (
    <div role="note" className={cn("my-8 rounded-2xl border p-5 md:p-6 [&>p:last-child]:mb-0", s.cls)}>
      <p className={cn("label-mono mb-2 text-[0.65rem]", s.accent)}>{title ? `${s.label} · ${title}` : s.label}</p>
      <div className="text-[1rem] leading-relaxed [&>p:last-child]:mb-0">{children}</div>
    </div>
  );
}

function StackFinderCta({ problem }: { problem: string }) {
  return (
    <div className="my-10 overflow-hidden rounded-3xl border border-line-strong bg-gradient-to-br from-signature/[0.08] to-transparent p-6 md:p-8">
      <p className="label-mono text-signature">Free tool · AI Stack Finder</p>
      <p className="font-display-tight mt-3 text-2xl leading-tight text-text md:text-3xl">Not sure which tools fit your business?</p>
      <p className="mt-3 mb-5 text-muted">Describe the problem in a sentence and get a recommended AI stack, how the tools connect and what it costs.</p>
      <p className="mb-6 rounded-xl border border-line bg-bg/60 px-4 py-3 text-[0.95rem] italic">&ldquo;{problem}&rdquo;</p>
      <Link
        href={`/tools/ai-stack-finder?q=${encodeURIComponent(problem)}`}
        className="inline-flex h-11 items-center rounded-full bg-signature px-5 text-sm font-medium text-signature-ink no-underline transition-shadow hover:shadow-[0_0_40px_-6px_var(--signature-glow)]"
      >
        Try this example →
      </Link>
    </div>
  );
}

function ServiceCta({ service }: { service: string }) {
  const s = services.find((x) => x.slug === service);
  if (!s) return null;
  const from = serviceDetails[s.slug]?.packages?.[0];
  return (
    <div className="my-12 rounded-3xl border border-line bg-surface p-6 md:p-8">
      <p className="label-mono text-muted">Want it done for you?</p>
      <p className="font-display-tight mt-3 text-2xl leading-tight text-text md:text-3xl">{s.title} by Zaiphr Labs</p>
      <p className="mt-3 mb-6 text-muted">
        {s.summary}
        {from && ` From ₹${from.inr.toLocaleString("en-IN")}${from.per ? ` / ${from.per}` : ""}.`}
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href={`/services/${s.slug}`} className="inline-flex h-11 items-center rounded-full bg-signature px-5 text-sm font-medium text-signature-ink no-underline">
          See how we do it →
        </Link>
        <Link href="/contact" className="inline-flex h-11 items-center rounded-full border border-line-strong px-5 text-sm text-text no-underline hover:border-text">
          Book a free call
        </Link>
      </div>
    </div>
  );
}

const H2 = ({ children, ...rest }: ComponentProps<"h2">) => (
  <h2 id={headingId(textOf(children))} className="scroll-mt-28" {...rest}>
    {children}
  </h2>
);
const H3 = ({ children, ...rest }: ComponentProps<"h3">) => (
  <h3 id={headingId(textOf(children))} className="scroll-mt-28" {...rest}>
    {children}
  </h3>
);

function A({ href = "", children, ...rest }: ComponentProps<"a">) {
  if (href.startsWith("/")) return <Link href={href} {...rest}>{children}</Link>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

export const blogComponents = { KeyTakeaways, Callout, StackFinderCta, ServiceCta, h2: H2, h3: H3, a: A };
