import { footerNav } from "@/config/navigation";
import { services } from "@/config/services";
import { site } from "@/config/site";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Wordmark } from "@/components/ui/Logo";
import { NewsletterForm } from "./NewsletterForm";
import { BackToTop } from "./BackToTop";
import { FooterCta } from "./FooterCta";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[70vw] -translate-x-1/2 rounded-full bg-signature/10 blur-[120px]"
      />

      <FooterCta />

      {/* Link grid */}
      <div className="container-x relative grid gap-12 border-t border-line py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="label-mono mb-4 text-muted">The AI digest</p>
          <p className="mb-6 max-w-sm text-lg leading-snug">
            The 10 AI stories that matter for founders. Every morning, in 3 minutes.
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
      <div className="container-x relative select-none pt-4" aria-hidden>
        <Wordmark className="h-auto w-full text-text/90 [mask-image:linear-gradient(to_bottom,black_20%,rgba(0,0,0,0.25)_100%)]" />
        <p className="label-mono mt-6 text-center text-[0.65rem] tracking-[0.5em] text-muted sm:text-xs md:mt-8">{site.slogan}</p>
      </div>

      {/* Bottom bar */}
      <div className="container-x relative mt-10 flex flex-col gap-4 border-t border-line py-6 md:mt-14 text-sm text-muted md:flex-row md:items-center md:justify-between">
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
