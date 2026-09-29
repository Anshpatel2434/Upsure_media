import type { BlockProps } from "@/components/blocks/render-blocks";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { renderHighlights, sectionIndex } from "@/lib/text";

/** One big paragraph with highlighted phrases. Replaces Marino's scroll text-reveal with a static, readable statement. */
export function StatementBlock({ block, index }: BlockProps<"statement">) {
  const tone = block.tone ?? "paper";
  const dark = tone === "teal-ink" || tone === "teal";
  return (
    <Section tone={tone}>
      <Container className="flex flex-col gap-8">
        {block.eyebrow && (
          <Eyebrow index={sectionIndex(index)} tone={dark ? "paper" : "ink"}>
            {block.eyebrow}
          </Eyebrow>
        )}
        <p className="max-w-5xl reveal text-h2 font-medium text-balance">
          {renderHighlights(block.text, dark ? "coral" : "teal")}
        </p>
        {block.cta?.href && block.cta.label && (
          <Button
            href={block.cta.href}
            variant="link"
            tone={dark ? "paper" : "ink"}
            withArrow
            className="text-lead"
          >
            {block.cta.label}
          </Button>
        )}
      </Container>
    </Section>
  );
}
