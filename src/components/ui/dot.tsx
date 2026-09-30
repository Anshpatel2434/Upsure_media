import { cn } from "@/lib/cn";

/** Pulsing marker dot (15 px mobile, 25 px from tablet up). */
export function Dot({
  tone = "ink",
  className,
}: {
  tone?: "ink" | "paper" | "mint" | "sun" | "teal";
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block size-[15px] shrink-0 dot-pulse rounded-pill md:size-[25px]",
        tone === "ink" && "bg-ink",
        tone === "paper" && "bg-paper",
        tone === "mint" && "bg-mint",
        tone === "sun" && "bg-sun",
        tone === "teal" && "bg-teal",
        className,
      )}
    />
  );
}
