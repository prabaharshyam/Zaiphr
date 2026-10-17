import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { site } from "@/config/site";
import { formatPostDate, getPost, getPosts, relatedPosts } from "@/lib/blog";
import { mdxOptions } from "@/lib/mdx";
import { blogComponents } from "@/components/blog/mdx";
import { Toc } from "@/components/blog/Toc";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { Share } from "@/components/blog/Share";
import { PostCard } from "@/components/blog/PostCard";
import { Faq } from "@/components/sections/service/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { TransitionLink } from "@/components/ui/TransitionLink";

export const generateStaticParams = () => getPosts().map((p) => ({ slug: p.slug }));
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return pageMeta({
    title: p.title,
    description: p.description,
    path: `/blog/${p.slug}`,
    image: p.cover,
    imageSize: { width: 1600, height: 900 },
    type: "article",
    article: { publishedTime: p.date, modifiedTime: p.updated ?? p.date, tags: p.tags },
  });
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const url = `${site.url}/blog/${post.slug}`;
  const related = relatedPosts(post);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      image: `${site.url}${post.cover}`,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      author: { "@type": "Organization", name: `${site.name} team`, url: site.url },
      publisher: { "@type": "Organization", name: site.name, url: site.url, logo: { "@type": "ImageObject", url: `${site.url}/icon-512.png` } },
      mainEntityOfPage: url,
      keywords: post.tags.join(", "),
      articleSection: post.category,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
    ...(post.faq.length
      ? [{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: post.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }]
      : []),
  ];

  return (
    <article id="post" className="relative pb-24">
      <ReadingProgress target="post-body" />
      <JsonLd data={schema} />

      <header className="container-x pt-[calc(var(--nav-h)+8vh)] pb-12">
        <nav aria-label="Breadcrumb" className="label-mono text-[0.65rem] text-muted">
          <TransitionLink href="/blog" className="hover:text-text">Blog</TransitionLink>
          <span className="mx-2">/</span>
          <span className="text-signature">{post.category}</span>
        </nav>
        <h1 className="font-display-tight mt-8 max-w-[22ch] text-[clamp(2.4rem,5.4vw,5rem)] leading-[1.02]">{post.title}</h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted">{post.description}</p>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <p className="label-mono text-[0.65rem] text-muted">
            {site.name} team · <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.minutes} min read
            {post.updated && <> · Updated <time dateTime={post.updated}>{formatPostDate(post.updated)}</time></>}
          </p>
          <Share url={url} title={post.title} />
        </div>
      </header>

      <div className="container-x">
        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-line">
          <Image src={post.cover} alt="" fill priority sizes="(min-width: 1400px) 1320px, 100vw" className="object-cover" />
        </div>
      </div>

      <div className="container-x mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-[calc(var(--nav-h)+2rem)]">
            <Toc headings={post.headings} />
          </div>
        </aside>
        <div id="post-body" className="prose-zl min-w-0 lg:col-span-8 lg:col-start-5 xl:col-span-7 xl:col-start-5">
          <MDXRemote source={post.body} options={mdxOptions} components={blogComponents} />
        </div>
      </div>

      {post.faq.length > 0 && (
        <section aria-labelledby="post-faq" className="container-x mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-5 xl:col-span-7">
            <h2 id="post-faq" className="font-display-tight text-[clamp(1.8rem,3vw,2.6rem)]">Questions people ask</h2>
            <div className="mt-8">
              <Faq items={post.faq} />
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section aria-labelledby="related" className="mt-28 border-t border-line pt-20">
          <div className="container-x">
            <div className="flex items-end justify-between gap-6">
              <h2 id="related" className="font-display-tight text-[clamp(1.8rem,3vw,2.6rem)]">Keep reading</h2>
              <TransitionLink href="/blog" className="label-mono text-muted hover:text-signature">All articles →</TransitionLink>
            </div>
            <ul className="mt-12 grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <PostCard
                    post={{ slug: r.slug, title: r.title, description: r.description, category: r.category, date: r.date, dateLabel: formatPostDate(r.date), minutes: r.minutes, cover: r.cover }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}
