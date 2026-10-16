"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { closeSignIn, useAccount } from "@/lib/news/account";
import { SignInForm } from "./SignInForm";

/** Modal shown when a signed-out reader taps Save. Native <dialog> handles focus trap and Esc. */
export function SignInDialog() {
  const { dialog } = useAccount();
  const ref = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (dialog && !d.open) d.showModal();
    if (!dialog && d.open) d.close();
  }, [dialog]);

  return (
    <dialog
      ref={ref}
      onClose={closeSignIn}
      onClick={(e) => e.target === ref.current && closeSignIn()}
      aria-labelledby="signin-title"
      className="m-auto w-[min(92vw,30rem)] rounded-3xl border border-line-strong bg-bg-2 p-0 text-text backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      data-lenis-prevent
    >
      <div className="p-7 md:p-9">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="label-mono text-signature">Save stories</p>
            <h2 id="signin-title" className="font-display-tight mt-3 text-3xl leading-tight">
              Sign in to build your reading list.
            </h2>
          </div>
          <button type="button" onClick={closeSignIn} aria-label="Close" className="label-mono -mt-1 rounded-full border border-line-strong px-3 py-1.5 text-muted hover:text-text">
            Esc
          </button>
        </div>
        {dialog && <SignInForm className="mt-7" next={pathname} autoFocus />}
      </div>
    </dialog>
  );
}
