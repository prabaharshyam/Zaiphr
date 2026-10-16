import Image from "next/image";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { cn } from "@/lib/utils";

export interface PostCardData {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  dateLabel: string;
  minutes: number;
  cover: string;
}

export function PostCard({ post, large = false, priority = false }: { post: PostCardData; large?: boolean; priority?: boolean }) {
  return (
    <TransitionLink href={`/blog/${post.slug}`} data-cursor="Read" className={cn("group grid gap-6", large && "lg:grid-cols-12 lg:items-center lg:gap-12")}>
      <div className={cn("relative aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-bg-2", large && "lg:col-span-7")}>
        <Image
          src={post.cover}
          alt=""
          fill
          priority={priority}
          sizes={large ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-105"
        />
      </div>
      <div className={cn(large && "lg:col-span-5")}>
        <p className="label-mono text-[0.65rem] text-muted">
          <span className="text-signature">{post.category}</span> · {post.minutes} min read · <time dateTime={post.date}>{post.dateLabel}</time>
        </p>
        <h3 className={cn("mt-3 font-medium tracking-[-0.01em] transition-colors group-hover:text-signature", large ? "font-display-tight text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.05]" : "text-xl leading-snug")}>
          {post.title}
        </h3>
        <p className={cn("mt-3 leading-relaxed text-muted", large ? "text-lg" : "line-clamp-2 text-[0.95rem]")}>{post.description}</p>
      </div>
    </TransitionLink>
  );
}
