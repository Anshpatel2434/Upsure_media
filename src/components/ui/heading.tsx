import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type Level = "h1" | "h2" | "h3" | "h4";
type Size = "display" | "h1" | "h2" | "h3";

const sizeClass: Record<Size, string> = {
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
};

/** Semantic level and visual size are decoupled so the document outline stays correct. */
export function Heading({
  as: Tag = "h2",
  size = "h2",
  className,
  children,
}: {
  as?: Level;
  size?: Size;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={cn(sizeClass[size], className)}>{children}</Tag>;
}

/** Emphasised words inside a heading: teal offset underline (never a highlighter box). */
export function Highlight({
  children,
  tone = "teal",
}: {
  children: ReactNode;
  tone?: "teal" | "coral";
}) {
  return (
    <span className={cn("highlight", tone === "coral" && "decoration-coral")}>{children}</span>
  );
}
