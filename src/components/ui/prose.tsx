import Link from "next/link";
import { Fragment, type ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Renders the light Markdown used for long-form content (blog posts, legal
 * pages): "## " / "### " headings, blank-line paragraphs, "- " and "1. "
 * lists, "> " quotes, "---" rules, **bold** and [links](/path). Styles are
 * scoped with descendant selectors so the markup needs no extra classes.
 */
export function Prose({
  data,
  tone = "ink",
  className,
}: {
  data: string | null | undefined;
  tone?: "ink" | "paper";
  className?: string;
}) {
  if (!data) return null;
  return (
    <div
      className={cn(
        "max-w-prose text-body",
        tone === "ink" ? "text-ink-2" : "text-paper/85",
        "[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-h2 [&_h2]:font-semibold",
        "[&_h3]:mt-10 [&_h3]:mb-3 [&_h3]:text-h3 [&_h3]:font-semibold",
        "[&_p]:my-5 [&_p]:leading-relaxed",
        "[&_a]:underline [&_a]:decoration-teal [&_a]:underline-offset-4 hover:[&_a]:text-teal",
        "[&_strong]:font-semibold",
        tone === "ink" ? "[&_h2]:text-ink [&_h3]:text-ink" : "[&_h2]:text-paper [&_h3]:text-paper",
        "[&_li]:my-1.5 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6",
        "[&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-teal [&_blockquote]:pl-6 [&_blockquote]:text-lead [&_blockquote]:italic",
        "[&_hr]:my-10 [&_hr]:border-line",
        className,
      )}
    >
      {parseBlocks(data)}
    </div>
  );
}

function parseBlocks(source: string): ReactNode[] {
  return source
    .trim()
    .split(/\n\s*\n/)
    .map((chunk, i) => {
      const block = chunk.trim();
      const lines = block.split("\n").map((l) => l.trim());
      if (block.startsWith("### ")) return <h3 key={i}>{inline(block.slice(4))}</h3>;
      if (block.startsWith("## ")) return <h2 key={i}>{inline(block.slice(3))}</h2>;
      if (block === "---") return <hr key={i} />;
      if (lines.every((l) => l.startsWith("- "))) {
        return (
          <ul key={i}>
            {lines.map((l, j) => (
              <li key={j}>{inline(l.slice(2))}</li>
            ))}
          </ul>
        );
      }
      if (lines.every((l) => /^\d+\.\s/.test(l))) {
        return (
          <ol key={i}>
            {lines.map((l, j) => (
              <li key={j}>{inline(l.replace(/^\d+\.\s/, ""))}</li>
            ))}
          </ol>
        );
      }
      if (lines.every((l) => l.startsWith(">"))) {
        return (
          <blockquote key={i}>
            <p>{inline(lines.map((l) => l.replace(/^>\s?/, "")).join(" "))}</p>
          </blockquote>
        );
      }
      return <p key={i}>{inline(lines.join(" "))}</p>;
    });
}

/** **bold** and [label](href). */
function inline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      const [, label, href] = link;
      return href!.startsWith("/") ? (
        <Link key={i} href={href!}>
          {label}
        </Link>
      ) : (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
