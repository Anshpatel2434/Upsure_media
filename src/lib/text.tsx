import { Fragment, type ReactNode } from "react";

import { Highlight } from "@/components/ui/heading";

/**
 * Editors mark emphasised words as `[[like this]]` in plain text fields.
 * This turns them into <Highlight> spans; everything else stays plain text.
 */
export function renderHighlights(
  source: string | null | undefined,
  tone: "teal" | "coral" = "teal",
): ReactNode {
  if (!source) return null;
  const parts = source.split(/(\[\[[^\]]+\]\])/g).filter(Boolean);
  return parts.map((part, i) =>
    part.startsWith("[[") && part.endsWith("]]") ? (
      <Highlight key={i} tone={tone}>
        {part.slice(2, -2)}
      </Highlight>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/** Strips `[[ ]]` markers for places that need plain text (metadata, alt text). */
export function stripHighlights(source: string | null | undefined): string {
  return (source ?? "").replace(/\[\[([^\]]+)\]\]/g, "$1");
}

/** URL-safe id for a heading, so long-form pages can be linked and tracked. */
export function headingId(text: string): string {
  return stripHighlights(text)
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

/**
 * The "## " / "### " headings in a light-Markdown document, in order, for
 * building a table of contents that matches what <Prose> renders.
 */
export function proseHeadings(source: string | null | undefined) {
  if (!source) return [];
  const out: { id: string; text: string; level: 2 | 3 }[] = [];
  for (const chunk of source.trim().split(/\n\s*\n/)) {
    const block = chunk.trim();
    const level = block.startsWith("### ") ? 3 : block.startsWith("## ") ? 2 : null;
    if (!level) continue;
    const text = block.slice(level === 3 ? 4 : 3).trim();
    out.push({ id: headingId(text), text: stripHighlights(text), level });
  }
  return out;
}

/** Two-digit section index used by numbered eyebrows. */
export function sectionIndex(n: number): string {
  return String(n).padStart(2, "0");
}

/**
 * "8 Nov 2026". en-GB abbreviates September as "Sept" while every other month
 * gets three letters, so the month is formatted separately in en-US to keep
 * the list of post dates even.
 */
export function formatDate(value: string | null | undefined): string {
  if (!value) return "";
  const date = new Date(value);
  const day = new Intl.DateTimeFormat("en-GB", { day: "numeric" }).format(date);
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);
  const year = new Intl.DateTimeFormat("en-GB", { year: "numeric" }).format(date);
  return `${day} ${month} ${year}`;
}

export function readingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}
