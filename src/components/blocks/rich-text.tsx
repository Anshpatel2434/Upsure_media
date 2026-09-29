import type { BlockProps } from "@/components/blocks/render-blocks";
import { Container } from "@/components/ui/container";
import { Prose } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";

export function RichTextBlock({ block }: BlockProps<"richText">) {
  const tone = block.tone ?? "paper";
  const dark = tone === "teal-ink" || tone === "teal";
  return (
    <Section tone={tone} padding="tight">
      <Container size={block.width === "default" ? "default" : "narrow"}>
        <Prose data={block.content} tone={dark ? "paper" : "ink"} />
      </Container>
    </Section>
  );
}
