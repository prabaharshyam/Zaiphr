"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TransitionLink } from "./TransitionLink";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  size?: Size;
  magnetic?: boolean;
  arrow?: boolean;
  className?: string;
  disabled?: boolean;
  "aria-label"?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-signature text-signature-ink hover:shadow-[0_0_48px_-6px_var(--signature-glow)]",
  ghost: "glass text-text hover:border-line-strong hover:bg-surface-2",
  outline: "border border-line-strong text-text hover:border-signature hover:text-signature",
};
const sizes: Record<Size, string> = {
  sm: "h-10 pl-4 pr-1.5 text-[0.8rem] gap-3",
  md: "h-12 pl-5 pr-2 text-sm gap-4",
  lg: "h-14 pl-7 pr-2 text-base gap-5",
};

function Arrow({ size }: { size: Size }) {
  const dim = size === "sm" ? "h-7 w-7" : size === "md" ? "h-8 w-8" : "h-10 w-10";
  return (
    <span
      aria-hidden
      className={cn(
        "relative grid shrink-0 place-items-center overflow-hidden rounded-full",
        "[background:color-mix(in_oklab,currentColor_12%,transparent)]",
        dim,
      )}
    >
      {[0, 1].map((n) => (
        <svg
          key={n}
          viewBox="0 0 16 16"
          className={cn(
            "absolute h-3.5 w-3.5 transition-transform duration-500 ease-[var(--ease-out)]",
            n === 0
              ? "group-hover:translate-x-[180%] group-hover:-translate-y-[180%]"
              : "-translate-x-[180%] translate-y-[180%] group-hover:translate-x-0 group-hover:translate-y-0",
          )}
        >
          <path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      ))}
    </span>
  );
}

export function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  magnetic = true,
  arrow = true,
  className,
  disabled,
  ...aria
}: Props) {
  const classes = cn(
    "group relative inline-flex items-center rounded-full font-medium tracking-[-0.01em] whitespace-nowrap",
    "transition-[background-color,border-color,color,box-shadow] duration-300",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    !arrow && "pr-5",
    className,
  );
  const inner = (
    <>
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
      {arrow && <Arrow size={size} />}
    </>
  );

  const el = href ? (
    <TransitionLink href={href} className={classes} {...aria}>
      {inner}
    </TransitionLink>
  ) : (
    <button type={type} onClick={onClick} className={classes} disabled={disabled} {...aria}>
      {inner}
    </button>
  );

  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
