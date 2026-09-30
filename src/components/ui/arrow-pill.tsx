import type { ElementType, ReactNode } from "react";

import { LongArrowIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/**
 * White rounded label with a long arrow, used as the eyebrow above heroes and
 * section lists ("→ Our services").
 */
export function ArrowPill({
  as: Tag = "p",
  tone = "light",
  className,
  children,
}: {
  as?: ElementType;
  tone?: "light" | "dark";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "inline-flex w-max max-w-full items-center gap-2.5 rounded-pill px-6 py-2.5 text-[13px] leading-tight font-medium",
        tone === "light"
          ? "bg-white text-ink shadow-[0_1px_2px_rgb(11_13_16/0.04)]"
          : "bg-paper/10 text-paper",
        className,
      )}
    >
      <LongArrowIcon width={40} strokeWidth={1.4} className="shrink-0" />
      <span>{children}</span>
    </Tag>
  );
}
