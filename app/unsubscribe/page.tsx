import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Unsubscribe", robots: { index: false } };

export default async function UnsubscribePage({ searchParams }: PageProps<"/unsubscribe">) {
  const sp = await searchParams;
  const token = typeof sp.token === "string" ? sp.token : "";
  const done = sp.done === "1";

  return (
    <section className="relative overflow-hidden pt-[calc(var(--nav-h)+14vh)] pb-32">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="container-x relative max-w-2xl">
        <Eyebrow>The AI Digest</Eyebrow>
        {done ? (
          <>
            <h1 className="font-display-tight mt-6 text-[clamp(2.4rem,5vw,4rem)]">You&apos;re unsubscribed.</h1>
            <p className="mt-5 text-lg text-muted">
              No more digest emails. The brief is still on the site every morning if you ever want it.
            </p>
            <div className="mt-10">
              <Button href="/news">Read today&apos;s brief</Button>
            </div>
          </>
        ) : token ? (
          <>
            <h1 className="font-display-tight mt-6 text-[clamp(2.4rem,5vw,4rem)]">Stop the daily digest?</h1>
            <p className="mt-5 text-lg text-muted">You&apos;ll stop getting the morning AI Digest email. You can subscribe again anytime.</p>
            <form action="/api/unsubscribe" method="post" className="mt-10">
              <input type="hidden" name="token" value={token} />
              <input type="hidden" name="from" value="page" />
              <Button type="submit">Unsubscribe</Button>
            </form>
          </>
        ) : (
          <>
            <h1 className="font-display-tight mt-6 text-[clamp(2.4rem,5vw,4rem)]">This link looks incomplete.</h1>
            <p className="mt-5 text-lg text-muted">
              Use the unsubscribe link at the bottom of any digest email, or reply to one and we&apos;ll remove you by hand.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
