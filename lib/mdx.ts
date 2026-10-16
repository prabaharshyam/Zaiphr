import remarkGfm from "remark-gfm";
import type { MDXRemoteOptions } from "next-mdx-remote-client/rsc";

/** Shared MDX options (GitHub-flavoured markdown: tables, strikethrough, autolinks). */
export const mdxOptions: MDXRemoteOptions = {
  mdxOptions: { remarkPlugins: [remarkGfm] },
};
