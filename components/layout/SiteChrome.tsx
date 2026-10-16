"use client";

import { useEffect, useState } from "react";
import { captureAttribution } from "@/lib/utm";
import { TransitionLink } from "@/components/ui/TransitionLink";

const NOTICE = "zl-cookie-notice";

/** Small client-only bits: first-touch UTM capture and a lightweight cookie notice. */
export function SiteChrome() {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    captureAttribution();
    let timer = 0;
    try {
      if (!localStorage.getItem(NOTICE)) timer = window.setTimeout(() => setShowNotice(true), 2500);
    } catch {}
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setShowNotice(false);
    try {
      localStorage.setItem(NOTICE, "1");
    } catch {}
  };

  if (!showNotice) return null;
  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="glass fixed right-4 bottom-4 left-4 z-[85] flex flex-col gap-3 rounded-2xl p-4 text-sm shadow-2xl sm:left-auto sm:max-w-sm"
    >
      <p className="text-muted">
        No ad trackers here. Just cookieless analytics and a few preferences stored on your device.{" "}
        <TransitionLink href="/legal/cookies" className="text-text underline underline-offset-4">
          Details
        </TransitionLink>
      </p>
      <button type="button" onClick={dismiss} className="label-mono self-start rounded-full bg-signature px-4 py-2 text-signature-ink">
        Got it
      </button>
    </div>
  );
}
