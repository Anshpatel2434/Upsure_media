import type { BlockProps } from "@/components/blocks/render-blocks";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { renderEmphasis } from "@/lib/markers";
import { sectionIndex } from "@/lib/text";

/**
 * One oversized paragraph set on the right 10 columns, with marker pills that
 * fill behind the emphasised phrases as the section reveals.
 */
export function StatementBlock({ block, index }: BlockProps<"statement">) {
  const tone = block.tone ?? "paper";
  const dark = tone === "teal-ink" || tone === "teal";
  return (
    <Section tone={tone}>
      <Container>
        <Reveal self={false} className="grid gap-8 lg:grid-cols-12">
          {block.eyebrow && (
            <RevealItem index={0} className="lg:col-span-2">
              <Eyebrow index={sectionIndex(index)} tone={dark ? "paper" : "ink"}>
                {block.eyebrow}
              </Eyebrow>
            </RevealItem>
          )}
          <RevealItem index={1} className="lg:col-span-10 lg:col-start-3">
            <p className="text-h2 font-medium text-balance">
              {renderEmphasis(block.text, { tone: dark ? "sun" : "teal", variant: "marker" })}
            </p>
          </RevealItem>
          {block.cta?.href && block.cta.label && (
            <RevealItem index={2} className="lg:col-span-10 lg:col-start-3">
              <Button href={block.cta.href} variant="ghost" tone={dark ? "paper" : "ink"} withArrow>
                {block.cta.label}
              </Button>
            </RevealItem>
          )}
        </Reveal>
      </Container>
    </Section>
  );
}
