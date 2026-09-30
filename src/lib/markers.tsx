import { Fragment, type CSSProperties, type ReactNode } from "react";

import { Highlight } from "@/components/ui/heading";

type Tone = "teal" | "coral" | "sun";
type Variant = "underline" | "marker" | "color" | "strong";

/**
 * Renders `[[emphasised]]` phrases from CMS text:
 *  - underline: teal offset underline (opt-in)
 *  - marker: pastel pill that fills behind the phrase on reveal; each phrase
 *    starts 0.3 s after the previous one
 *  - color (default): accent-coloured text
 *  - strong: bold text (hero paragraph)
 */
export function renderEmphasis(
  source: string | null | undefined,
  { tone = "teal", variant = "color" }: { tone?: Tone; variant?: Variant } = {},
): ReactNode {
  if (!source) return null;
  const parts = source.split(/(\[\[[^\]]+\]\])/g).filter(Boolean);
  let n = 0;
  return parts.map((part, i) => {
    if (!(part.startsWith("[[") && part.endsWith("]]"))) return <Fragment key={i}>{part}</Fragment>;
    const text = part.slice(2, -2);
    n += 1;
    if (variant === "strong")
      return (
        <strong key={i} className="font-bold">
          {text}
        </strong>
      );
    if (variant === "color") {
      return (
        <span
          key={i}
          className={tone === "sun" ? "text-sun" : tone === "coral" ? "text-coral" : "text-teal"}
        >
          {text}
        </span>
      );
    }
    if (variant === "marker") {
      return (
        <span
          key={i}
          style={{ "--reveal-delay": `${n * 0.3}s` } as CSSProperties}
          className="contents"
        >
          <Highlight tone={tone} variant="marker">
            {text}
          </Highlight>
        </span>
      );
    }
    return (
      <Highlight key={i} tone={tone}>
        {text}
      </Highlight>
    );
  });
}

/** Removes `[[ ]]` markers (for alt text, metadata and aria labels). */
export function plainText(source: string | null | undefined): string {
  return (source ?? "").replace(/\[\[([^\]]+)\]\]/g, "$1");
}
