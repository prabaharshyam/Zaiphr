import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BLOG_CATEGORIES, formatPostDate, getPosts, type Post } from "@/lib/blog";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { PostCard, type PostCardData } from "@/components/blog/PostCard";
import { BlogIndex } from "@/components/blog/BlogIndex";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Blog: practical playbooks on AI, automation and growth",
    description: "Field notes for founders and small businesses on AI automation, voice agents, websites, apps, branding, video ads and influencer marketing. Practical, no fluff.",
    path: "/blog",
    image: "/og/blog.jpg",
  }),
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/rss.xml" } },
};

const toCard = (p: Post): PostCardData => ({
  slug: p.slug,
  title: p.title,
  description: p.description,
  category: p.category,
  date: p.date,
  dateLabel: formatPostDate(p.date),
  minutes: p.minutes,
  cover: p.cover,
});

export default function BlogPage() {
  const posts = getPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p !== featured);
  const categories = BLOG_CATEGORIES.filter((c) => rest.some((p) => p.category === c));

  return (
    <>
      <section className="relative overflow-hidden pt-[calc(var(--nav-h)+10vh)] pb-16">
        <div className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-[70vh] opacity-60" aria-hidden />
        <div aria-hidden className="pointer-events-none absolute top-10 -right-40 h-[36vw] w-[36vw] rounded-full bg-signature/10 blur-[140px]" />
        <div className="container-x relative">
          <Eyebrow>Blog</Eyebrow>
          <RevealText as="h1" trigger="ready" className="font-display-wide mt-8 text-[length:var(--text-giga)]">
            Field notes.
          </RevealText>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Practical playbooks on AI, automation, websites and growth, written for founders and small teams who&apos;d rather do
            than read about doing.
          </p>
        </div>
      </section>

      {featured && (
        <section aria-label="Featured post" className="pb-24">
          <div className="container-x">
            <h2 className="label-mono mb-6 text-muted">Featured</h2>
            <PostCard post={toCard(featured)} large priority />
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section aria-labelledby="all-posts" className="border-t border-line py-20">
          <div className="container-x">
            <h2 id="all-posts" className="sr-only">All posts</h2>
            <BlogIndex posts={rest.map(toCard)} categories={[...categories]} />
          </div>
        </section>
      )}

      <section aria-labelledby="blog-digest" className="border-t border-line bg-bg-2 py-20">
        <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="label-mono text-signature">The AI Digest</p>
            <h2 id="blog-digest" className="font-display-tight mt-4 text-[clamp(2rem,3.6vw,3.2rem)] leading-tight">
              The AI news that matters for your business, every morning.
            </h2>
          </div>
          <NewsletterForm className="max-w-md lg:col-span-5" />
        </div>
      </section>
    </>
  );
}
