import { footerNav } from "@/config/navigation";
import { services } from "@/config/services";
import { site } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { RevealText } from "@/components/ui/RevealText";
import { NewsletterForm } from "./NewsletterForm";
import { BackToTop } from "./BackToTop";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[70vw] -translate-x-1/2 rounded-full bg-signature/10 blur-[120px]"
      />

      {/* CTA band */}
      <div className="container-x relative grid gap-10 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-8">
          <p className="label-mono mb-6 text-muted">Next step</p>
          <RevealText as="p" className="font-display-tight text-[length:var(--text-display)]">
            Have an idea? <span className="text-muted">Let&apos;s engineer it.</span>
          </RevealText>
        </div>
        <div className="flex flex-col items-start justify-end gap-4 md:col-span-4 md:items-end">
          <Button href="/contact" size="lg">
            Start a project
          </Button>
          <a
            href={`mailto:${site.email}`}
            className="label-mono text-muted transition-colors hover:text-signature"
          >
            {site.email}
          </a>
        </div>
      </div>

      {/* Link grid */}
      <div className="container-x relative grid gap-12 border-t border-line py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="label-mono mb-4 text-muted">The AI digest</p>
          <p className="mb-6 max-w-sm text-lg leading-snug">
            The 10 AI stories that matter for founders — every morning, in 3 minutes.
          </p>
          <NewsletterForm />
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 md:col-span-8">
          <div>
            <p className="label-mono mb-5 text-muted">Services</p>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <TransitionLink
                    href={`/services/${s.slug}`}
                    className="text-sm text-text/80 transition-colors hover:text-signature"
                  >
                    {s.title}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>
          {footerNav.map((col) => (
            <div key={col.title}>
              <p className="label-mono mb-5 text-muted">{col.title}</p>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <TransitionLink
                      href={item.href}
                      className="text-sm text-text/80 transition-colors hover:text-signature"
                    >
                      {item.label}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="relative select-none" aria-hidden>
        <p className="font-display-wide text-center text-[19.5vw] leading-[0.78] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_var(--line-strong)]">
          ZAIPHR
        </p>
        <p className="font-display-wide absolute inset-0 bg-gradient-to-b from-text/90 via-text/25 to-transparent bg-clip-text text-center text-[19.5vw] leading-[0.78] tracking-[-0.06em] text-transparent [mask-image:linear-gradient(to_bottom,black_10%,transparent_85%)]">
          ZAIPHR
        </p>
      </div>

      {/* Bottom bar */}
      <div className="container-x relative flex flex-col gap-4 border-t border-line py-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p className="label-mono">
          © {year} {site.name} · {site.location}
        </p>
        <ul className="label-mono flex flex-wrap gap-x-6 gap-y-2">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-signature"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <BackToTop />
      </div>
    </footer>
  );
}
