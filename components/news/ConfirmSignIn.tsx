"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { EmailOtpType } from "@supabase/supabase-js";
import { applyPendingSave, browserDb } from "@/lib/news/account";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SignInForm } from "./SignInForm";

const safeNext = (n: string | null) => (n && n.startsWith("/") && !n.startsWith("//") && !n.includes("\\") ? n : "/news/saved");

/**
 * Verifies the magic-link token in the browser. Doing it client-side (not on GET) means
 * email link scanners that pre-open links can't burn the one-time token.
 */
export function ConfirmSignIn() {
  const params = useSearchParams();
  const router = useRouter();
  const [state, setState] = useState<"working" | "error">("working");
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    const tokenHash = params.get("token_hash");
    const type = (params.get("type") ?? "magiclink") as EmailOtpType;
    const c = browserDb();
    if (!tokenHash || !c) {
      queueMicrotask(() => setState("error"));
      return;
    }
    void c.auth.verifyOtp({ token_hash: tokenHash, type }).then(async ({ error }) => {
      if (error) return setState("error");
      await applyPendingSave();
      router.replace(safeNext(params.get("next")));
    });
  }, [params, router]);

  if (state === "working")
    return (
      <div role="status">
        <Eyebrow>Signing in</Eyebrow>
        <h1 className="font-display-tight mt-6 text-[clamp(2.2rem,5vw,3.6rem)]">One moment…</h1>
      </div>
    );

  return (
    <div>
      <Eyebrow>Sign in</Eyebrow>
      <h1 className="font-display-tight mt-6 text-[clamp(2.2rem,5vw,3.6rem)]">This link has expired.</h1>
      <p className="mt-4 text-lg text-muted">Sign-in links work once and last an hour. Get a fresh one:</p>
      <SignInForm className="mt-8" next={params.get("next") ?? undefined} />
    </div>
  );
}
