"use client";

import { useState } from "react";

export function Share({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;
  const links = [
    ["LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`],
    ["X", `https://x.com/intent/post?url=${enc(url)}&text=${enc(title)}`],
    ["WhatsApp", `https://wa.me/?text=${enc(`${title} ${url}`)}`],
  ];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  };
  return (
    <div className="label-mono flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.65rem] text-muted">
      <span>Share</span>
      {links.map(([name, href]) => (
        <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="hover:text-text">
          {name} ↗
        </a>
      ))}
      <button type="button" onClick={copy} className="hover:text-text" aria-live="polite">
        {copied ? "Copied ✓" : "Copy link"}
      </button>
    </div>
  );
}
