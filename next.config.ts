import type { NextConfig } from "next";
import { legacyServiceSlugs } from "./config/services";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const imageCache = [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  // Old service pages (pre-repositioning) point to the practice area that replaced them.
  async redirects() {
    return Object.entries(legacyServiceSlugs).map(([from, to]) => ({
      source: `/services/${from}`,
      destination: `/services/${to}`,
      permanent: true,
    }));
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Generated images: cache them hard. Only image paths match (/og/x.jpg, /work/<slug>/x.jpg,
      // /blog/<slug>/x.jpg); the /work/<slug> and /blog/<slug> pages themselves must stay fresh.
      { source: "/og/:file", headers: imageCache },
      { source: "/(blog|work)/:slug/:file", headers: imageCache },
    ];
  },
};

export default nextConfig;
