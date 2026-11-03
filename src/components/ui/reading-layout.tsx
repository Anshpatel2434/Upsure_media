import type { ReactNode } from "react";

import { ArticleToc } from "@/components/ui/article-toc";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { proseHeadings } from "@/lib/text";

/**
 * Two-column layout for long-form pages (blog posts, Terms, Privacy): the
 * contents list sits in the space to the left of the text and follows the
 * reader, and the text keeps a comfortable measure.
 *
 * Without this the body was a ~65ch column left-aligned inside a 48rem
 * container inside a full-width page, which left a wide empty margin on both
 * sides and nothing to navigate a long document with.
 *
 * Below `lg` the contents list moves above the text, where it reads as a
 * summary of what follows.
 */
export function ReadingLayout({
  source,
  children,
  className,
}: {
  /** The same light-Markdown string the body is rendered from. */
  source: string | null | undefined;
  children: ReactNode;
  className?: string;
}) {
  const headings = proseHeadings(source);
  const hasToc = headings.length >= 2;

  return (
    <Container className={className}>
      <div
        className={cn("mx-auto flex max-w-5xl flex-col gap-10", hasToc && "lg:flex-row lg:gap-16")}
      >
        {hasToc && (
          <ArticleToc
            items={headings}
            className="shrink-0 border-b border-line pb-8 lg:sticky lg:top-28 lg:w-56 lg:self-start lg:border-b-0 lg:pb-0"
          />
        )}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </Container>
  );
}
