import { Fragment, type ReactNode } from "react";

import { Highlight } from "@/components/ui/heading";

type Tone = "teal" | "coral" | "sun";

/**
 * Renders `[[emphasised]]` phrases from CMS text as either an offset underline
 * or a marker pill that fills on reveal. Everything else stays plain text.
 */
export function renderEmphasis(
  source: string | null | undefined,
  { tone = "teal", variant = "underline" }: { tone?: Tone; variant?: "underline" | "marker" } = {},
): ReactNode {
  if (!source) return null;
  const parts = source.split(/(\[\[[^\]]+\]\])/g).filter(Boolean);
  return parts.map((part, i) =>
    part.startsWith("[[") && part.endsWith("]]") ? (
      <Highlight key={i} tone={tone} variant={variant}>
        {part.slice(2, -2)}
      </Highlight>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
