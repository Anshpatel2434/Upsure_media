import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import { RichText } from "@payloadcms/richtext-lexical/react";

import { cn } from "@/lib/cn";

/**
 * Renders Lexical rich text with editorial typography. Styles are scoped with
 * descendant selectors so the editor's output needs no extra classes.
 */
export function Prose({
  data,
  tone = "ink",
  className,
}: {
  data: DefaultTypedEditorState | null | undefined;
  tone?: "ink" | "paper";
  className?: string;
}) {
  if (!data) return null;
  return (
    <div
      className={cn(
        "max-w-prose text-body",
        tone === "ink" ? "text-ink-2" : "text-paper/85",
        "[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-h2 [&_h2]:font-semibold",
        "[&_h3]:mt-10 [&_h3]:mb-3 [&_h3]:text-h3 [&_h3]:font-semibold",
        "[&_h4]:mt-8 [&_h4]:mb-2 [&_h4]:text-lead [&_h4]:font-semibold",
        "[&_p]:my-5 [&_p]:leading-relaxed",
        "[&_a]:underline [&_a]:decoration-teal [&_a]:underline-offset-4 hover:[&_a]:text-teal",
        "[&_strong]:font-semibold",
        tone === "ink"
          ? "[&_h2]:text-ink [&_h3]:text-ink [&_h4]:text-ink"
          : "[&_h2]:text-paper [&_h3]:text-paper [&_h4]:text-paper",
        "[&_li]:my-1.5 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6",
        "[&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-teal [&_blockquote]:pl-6 [&_blockquote]:text-lead [&_blockquote]:italic",
        "[&_hr]:my-10 [&_hr]:border-line",
        "[&_img]:my-8 [&_img]:rounded-lg",
        "[&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-teal-ink [&_pre]:p-4 [&_pre]:text-small [&_pre]:text-paper",
        "[&_code]:rounded [&_code]:bg-paper-2 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[0.9em]",
        className,
      )}
    >
      <RichText data={data} />
    </div>
  );
}
