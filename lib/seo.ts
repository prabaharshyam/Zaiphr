import type { Metadata } from "next";
import { site } from "@/config/site";

/**
 * One place for page metadata: title, description, canonical URL and the link-preview card
 * (Open Graph + Twitter) that WhatsApp, LinkedIn, Slack, iMessage and X render.
 *
 * Next merges metadata shallowly, so every page sets its full openGraph block here rather than
 * relying on the layout's (a page-level openGraph would otherwise drop the layout's image).
 */
export const OG = { width: 1200, height: 630 };

export function pageMeta({
  title,
  description,
  path,
  image = "/og/default.jpg",
  imageSize = OG,
  type = "website",
  noindex = false,
  absoluteTitle = false,
  article,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageSize?: { width: number; height: number };
  type?: "website" | "article";
  noindex?: boolean;
  /** Use the title as-is instead of "Title - Zaiphr Labs" (for the home page). */
  absoluteTitle?: boolean;
  article?: { publishedTime: string; modifiedTime?: string; tags?: string[] };
}): Metadata {
  const shareTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  const images = [{ url: image, ...imageSize, alt: title }];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type,
      url: path,
      siteName: site.name,
      locale: "en_IN",
      title: shareTitle,
      description,
      images,
      ...(article && type === "article" ? { publishedTime: article.publishedTime, modifiedTime: article.modifiedTime, tags: article.tags } : {}),
    },
    twitter: { card: "summary_large_image", title: shareTitle, description, images: [image] },
  };
}
