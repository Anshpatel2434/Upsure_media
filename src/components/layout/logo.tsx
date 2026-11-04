import { WORDMARK } from "@/lib/brand-mark";
import { cn } from "@/lib/cn";

/**
 * The "upsure." wordmark, drawn from the supplied artwork rather than set in
 * a font. It inherits the current text colour, so the same component works on
 * the light header and on the dark footer and menu.
 *
 * Size it with a height class (`h-6`, `h-10`, …); the width follows the
 * artwork's 4.86 : 1 ratio.
 */
export function Logo({ className, tone = "ink" }: { className?: string; tone?: "ink" | "paper" }) {
  return (
    <svg
      viewBox={WORDMARK.viewBox}
      role="img"
      aria-label="Upsure Media"
      className={cn(
        "block h-[1.375rem] w-auto",
        tone === "ink" ? "text-ink" : "text-paper",
        className,
      )}
      fill="currentColor"
    >
      {WORDMARK.paths.map((d) => (
        <path key={d.slice(0, 24)} d={d} />
      ))}
      <circle cx={WORDMARK.dot.cx} cy={WORDMARK.dot.cy} r={WORDMARK.dot.r} />
    </svg>
  );
}
