import type { BlockProps } from "@/components/blocks/render-blocks";
import { Container } from "@/components/ui/container";
import { Prose } from "@/components/ui/prose";
import { ReadingLayout } from "@/components/ui/reading-layout";
import { Section } from "@/components/ui/section";

/**
 * Long-form copy. A document with two or more "## " headings (Terms, Privacy)
 * is laid out with a contents list beside it; anything shorter stays a plain
 * centred column.
 */
export function RichTextBlock({ block }: BlockProps<"richText">) {
  const tone = block.tone ?? "paper";
  const dark = tone === "teal-ink" || tone === "teal";
  const body = <Prose data={block.content} tone={dark ? "paper" : "ink"} />;
  return (
    <Section tone={tone} padding="tight">
      {dark ? (
        <Container size={block.width === "default" ? "default" : "narrow"}>{body}</Container>
      ) : (
        <ReadingLayout source={block.content}>{body}</ReadingLayout>
      )}
    </Section>
  );
}
