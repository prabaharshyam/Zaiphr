import { Button } from "@/components/ui/Button";
import { ScrambleText } from "@/components/ui/ScrambleText";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[90svh] flex-col items-center justify-center overflow-hidden pt-[var(--nav-h)] text-center">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
      <p className="label-mono relative mb-6 text-muted">Error 404 · Signal lost</p>
      <h1 className="font-display-wide relative text-[clamp(7rem,30vw,22rem)] text-transparent [-webkit-text-stroke:1px_var(--line-strong)]">
        <ScrambleText text="404" trigger="mount" duration={1400} delay={300} />
      </h1>
      <p className="relative mt-6 max-w-md text-lg text-muted">
        This page was never built — or our engines automated it away. Let&apos;s get you back on track.
      </p>
      <div className="relative mt-10 flex flex-wrap justify-center gap-3">
        <Button href="/">Back home</Button>
        <Button href="/contact" variant="ghost">
          Talk to us
        </Button>
      </div>
    </section>
  );
}
