import { Fragment, type ReactNode } from "react";
import Link from "next/link";

/**
 * Tiny, safe renderer for assistant replies: paragraphs, bullet/numbered lists, **bold** and
 * [links](/path). Bare site paths (/work/fynly), zaiphr.in addresses and https URLs are linked
 * too, since the model doesn't always use link syntax. Never renders raw HTML; only site paths
 * and https links are allowed.
 */
const SECTIONS = "services|work|blog|tools|ai-tools|news|use-cases|about|contact|legal";
const TOKEN = new RegExp(
  [
    String.raw`\*\*(.+?)\*\*`, // 1 bold
    String.raw`\[([^\]]+)\]\(([^)\s]+)\)`, // 2-3 [text](href)
    String.raw`\x60([^\x60\s]+)\x60`, // 4 inline code (linked only if it is a path or URL)
    String.raw`(https?:\/\/[^\s<>()]+|(?:www\.)?zaiphr\.in(?:\/[^\s<>()]*)?)`, // 5 bare URL
    String.raw`(?<=^|[\s(])(\/(?:${SECTIONS})(?:\/[\w-]+)*\/?)(?![\w/])`, // 6 bare site path
  ].join("|"),
  "g",
);

/** Site-internal path, external https URL, or null if it isn't a link we allow. */
function toHref(raw: string): { href: string; internal: boolean } | null {
  const url = raw.replace(/[.,;:!?'"]+$/, "");
  const own = url.match(/^(?:https?:\/\/)?(?:www\.)?zaiphr\.in(\/[^\s]*)?$/i);
  if (own) return { href: own[1] || "/", internal: true };
  if (url.startsWith("/") && !url.startsWith("//")) return { href: url, internal: true };
  if (url.startsWith("https://")) return { href: url, internal: false };
  return null;
}

function link(raw: string, label: string, key: string): ReactNode {
  const target = toHref(raw);
  if (!target) return label;
  const cls = "text-signature underline underline-offset-4 break-words";
  return target.internal ? (
    <Link key={key} href={target.href} className={cls}>
      {label}
    </Link>
  ) : (
    <a key={key} href={target.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {label}
    </a>
  );
}

function inline(text: string, key: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(TOKEN)) {
    const k = `${key}-${i++}`;
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) out.push(<strong key={k} className="font-semibold text-text">{inline(m[1], k)}</strong>);
    else if (m[2]) out.push(link(m[3], m[2], k));
    else if (m[4]) out.push(toHref(m[4]) ? link(m[4], m[4], k) : <code key={k}>{m[4]}</code>);
    else {
      // Keep sentence punctuation after a bare URL or path outside the link.
      const raw = m[5] ?? m[6];
      const tail = raw.match(/[.,;:!?'"]+$/)?.[0] ?? "";
      const token = raw.slice(0, raw.length - tail.length);
      out.push(link(token, token.replace(/^https?:\/\//, ""), k));
      if (tail) out.push(tail);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function MiniMarkdown({ text }: { text: string }) {
  const blocks = text.trim().split(/\n{2,}/);
  return (
    <>
      {blocks.map((block, b) => {
        const lines = block.split("\n").filter((l) => l.trim());
        const isList = lines.length > 0 && lines.every((l) => /^\s*([-*•]|\d+[.)])\s+/.test(l));
        if (isList) {
          const ordered = /^\s*\d/.test(lines[0]);
          const Tag = ordered ? "ol" : "ul";
          return (
            <Tag key={b} className={ordered ? "my-2 list-decimal space-y-1 pl-5" : "my-2 list-disc space-y-1 pl-5 marker:text-signature"}>
              {lines.map((l, i) => (
                <li key={i}>{inline(l.replace(/^\s*([-*•]|\d+[.)])\s+/, ""), `${b}-${i}`)}</li>
              ))}
            </Tag>
          );
        }
        return (
          <p key={b} className="my-2 first:mt-0 last:mb-0">
            {lines.map((l, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {inline(l, `${b}-${i}`)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </>
  );
}
