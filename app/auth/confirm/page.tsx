import type { Metadata } from "next";
import { Suspense } from "react";
import { ConfirmSignIn } from "@/components/news/ConfirmSignIn";

export const metadata: Metadata = { title: "Signing you in", robots: { index: false } };

export default function ConfirmPage() {
  return (
    <section className="relative overflow-hidden pt-[calc(var(--nav-h)+14vh)] pb-32">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="container-x relative max-w-xl">
        <Suspense>
          <ConfirmSignIn />
        </Suspense>
      </div>
    </section>
  );
}
