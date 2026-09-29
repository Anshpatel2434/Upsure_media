import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

type Size = "default" | "narrow" | "wide";

const sizeClass: Record<Size, string> = {
  default: "max-w-(--container-site)",
  narrow: "max-w-3xl",
  wide: "max-w-[96rem]",
};

export function Container({
  as: Tag = "div",
  size = "default",
  className,
  children,
}: {
  as?: ElementType;
  size?: Size;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={cn("mx-auto w-full px-gutter", sizeClass[size], className)}>{children}</Tag>
  );
}
