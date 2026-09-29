import { cn } from "@/lib/cn";

/**
 * Text wordmark with a teal full stop — matches the lowercase "upsure" mark on
 * the current site without depending on a licensed font file.
 */
export function Logo({ className, tone = "ink" }: { className?: string; tone?: "ink" | "paper" }) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline text-[1.375rem] leading-none font-bold tracking-[-0.04em] select-none",
        tone === "ink" ? "text-ink" : "text-paper",
        className,
      )}
      aria-hidden
    >
      upsure
      <span
        className={cn(
          "ml-px inline-block size-[0.28em] rounded-full",
          tone === "ink" ? "bg-teal" : "bg-sun",
        )}
      />
    </span>
  );
}
