"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { usePageTransition } from "@/components/providers/TransitionProvider";
import { isExternal } from "@/lib/utils";

type Props = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & { children: ReactNode };

/** Drop-in replacement for next/link that plays the page transition. */
export function TransitionLink({ href, onClick, children, target, ...rest }: Props) {
  const { navigate } = usePageTransition();
  const url = typeof href === "string" ? href : (href.pathname ?? "/");

  if (isExternal(url)) {
    return (
      <a
        href={url}
        target={target ?? "_blank"}
        rel="noopener noreferrer"
        onClick={onClick}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || target === "_blank")
      return;
    if (url.startsWith("#")) return;
    e.preventDefault();
    navigate(url);
  };

  return (
    <Link href={href} onClick={handle} target={target} {...rest}>
      {children}
    </Link>
  );
}
