"use client";

import Link from "next/link";
import { openSignIn, signOut, useAccount } from "@/lib/news/account";

/** "Saved (3) · Sign out" for readers; "Sign in to save" otherwise. */
export function AccountBar() {
  const { ready, available, user, saved } = useAccount();
  if (!available) return null;
  return (
    <div className="label-mono flex min-h-9 flex-wrap items-center gap-x-5 gap-y-2 text-[0.65rem] text-muted" aria-live="polite">
      {!ready ? null : user ? (
        <>
          <Link href="/news/saved" className="text-text hover:text-signature">
            Saved · {saved.size}
          </Link>
          <span className="max-w-[16rem] truncate normal-case tracking-normal" title={user.email}>
            {user.email}
          </span>
          <button type="button" onClick={() => void signOut()} className="hover:text-text">
            Sign out
          </button>
        </>
      ) : (
        <button type="button" onClick={() => openSignIn()} className="hover:text-text">
          Sign in to save stories →
        </button>
      )}
    </div>
  );
}
