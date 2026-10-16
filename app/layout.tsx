import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { site } from "@/config/site";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { TransitionProvider } from "@/components/providers/TransitionProvider";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Cursor } from "@/components/effects/Cursor";
import { Preloader } from "@/components/effects/Preloader";
import { Grain } from "@/components/effects/Grain";
import { SiteChrome } from "@/components/layout/SiteChrome";
import "./globals.css";

const archivo = localFont({
  src: "./fonts/Archivo-Variable.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: { siteName: site.name, type: "website", locale: "en_IN" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#05060A",
  colorScheme: "dark",
};

/** Runs before paint: skip preloader if already seen, enable reveal styles, JS-failure fallback. */
const bootScript = `(function(){var d=document.documentElement;try{if(sessionStorage.getItem('zl-preloaded'))d.classList.add('preloaded')}catch(e){}if(!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('js-motion');setTimeout(function(){d.classList.add('reveal-fallback')},5000)})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <noscript>
          <style>{`#preloader{display:none!important}[data-reveal]{opacity:1!important}`}</style>
        </noscript>
      </head>
      <body>
        <SmoothScroll>
          <TransitionProvider>
            <Preloader />
            <Nav />
            <main id="main" className="relative">
              {children}
            </main>
            <Footer />
            <SiteChrome />
            <Cursor />
            <Grain />
          </TransitionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
