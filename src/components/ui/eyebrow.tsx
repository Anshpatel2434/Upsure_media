import type { ReactNode } from "react";

import { ArrowPill } from "@/components/ui/arrow-pill";

/**
 * Section label: the white rounded pill with a long arrow used across the
 * site ("→ Our services"). `index` and `dot` are accepted for older call
 * sites but no longer rendered; numbering read as templated.
 */
export function Eyebrow({
  tone = "ink",
  className,
  children,
}: {
  index?: string;
  tone?: "ink" | "paper";
  dot?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <ArrowPill tone={tone === "ink" ? "light" : "dark"} className={className}>
      {children}
    </ArrowPill>
  );
}
