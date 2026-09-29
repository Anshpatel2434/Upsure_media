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

/** Two-digit section index used by numbered eyebrows. */
export function sectionIndex(n: number): string {
  return String(n).padStart(2, "0");
}

export function formatDate(value: string | null | undefined): string {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function readingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}
