import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { RevealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";
import { renderEmphasis } from "@/lib/markers";
import { sectionIndex } from "@/lib/text";

/**
 * Numbered eyebrow + heading + optional intro. `align="right"` sets the group
 * on the right edge so consecutive sections alternate composition. Wrap in a
 * <Reveal self={false}> so the three lines stagger in.
 */
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
  align?: "left" | "center" | "right";
  children?: ReactNode;
  className?: string;
}) {
  if (!eyebrow && !heading && !intro) return null;
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        align === "right" && "items-end text-right lg:ml-auto",
        className,
      )}
    >
      {eyebrow && (
        <RevealItem index={0}>
          <Eyebrow index={index ? sectionIndex(index) : undefined} tone={tone}>
            {eyebrow}
          </Eyebrow>
        </RevealItem>
      )}
      {heading && (
        <RevealItem index={1}>
          <Heading as="h2" size={size} className="max-w-4xl">
            {renderEmphasis(heading, { tone: tone === "paper" ? "sun" : "teal" })}
          </Heading>
        </RevealItem>
      )}
      {intro && (
        <RevealItem index={2}>
          <p
            className={cn(
              "max-w-[60ch] text-lead font-medium",
              tone === "ink" ? "text-ink-2" : "text-paper/75",
            )}
          >
            {intro}
          </p>
        </RevealItem>
      )}
      {children}
    </div>
  );
}
