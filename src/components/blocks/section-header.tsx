import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { cn } from "@/lib/cn";
import { renderHighlights, sectionIndex } from "@/lib/text";

/** Numbered eyebrow + heading + optional intro, used by most blocks. */
export function SectionHeader({
  index,
  eyebrow,
  heading,
  intro,
  tone = "ink",
  size = "h2",
  align = "left",
  children,
  className,
}: {
  index?: number;
  eyebrow?: string | null;
  heading?: string | null;
  intro?: string | null;
  tone?: "ink" | "paper";
  size?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  children?: ReactNode;
  className?: string;
}) {
  if (!eyebrow && !heading && !intro) return null;
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <Eyebrow index={index ? sectionIndex(index) : undefined} tone={tone}>
          {eyebrow}
        </Eyebrow>
      )}
      {heading && (
        <Heading as="h2" size={size} className="max-w-4xl">
          {renderHighlights(heading, tone === "paper" ? "coral" : "teal")}
        </Heading>
      )}
      {intro && (
        <p className={cn("max-w-2xl text-lead", tone === "ink" ? "text-ink-2" : "text-paper/75")}>
          {intro}
        </p>
      )}
      {children}
    </div>
  );
}
