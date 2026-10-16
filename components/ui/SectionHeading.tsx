import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { RevealText } from "./RevealText";

export function Eyebrow({ index, children, className }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={cn("label-mono flex items-center gap-3 text-muted", className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-signature shadow-[0_0_10px_var(--signature)]" aria-hidden />
      {index && <span className="text-text">({index})</span>}
      <span>{children}</span>
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  className,
  align = "left",
}: {
  eyebrow: string;
  index?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("flex flex-col gap-6", align === "center" && "items-center text-center", className)}>
      <Eyebrow index={index}>{eyebrow}</Eyebrow>
      <RevealText as="h2" className="font-display-tight max-w-[18ch] text-[length:var(--text-display)]">
        {title}
      </RevealText>
      {description && (
        <RevealText as="p" split="words" className="max-w-xl text-lg leading-relaxed text-muted">
          {description}
        </RevealText>
      )}
    </div>
  );
}
