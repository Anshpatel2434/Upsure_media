import type { BlockProps } from "@/components/blocks/render-blocks";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import { renderHighlights } from "@/lib/text";

export function CtaBlock({ block }: BlockProps<"cta">) {
  const tone = block.tone ?? "teal";
  const dark = tone === "teal-ink" || tone === "teal";
  return (
    <Section tone={tone} padding="tight">
      <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3">
          <Heading as="h2" size="h2">
            {renderHighlights(block.heading, dark ? "coral" : "teal")}
          </Heading>
          {block.text && (
            <p className={cn("max-w-xl text-lead", dark ? "text-paper/80" : "text-ink-2")}>
              {block.text}
            </p>
          )}
        </div>
        <Button
          href={block.link.href}
          external={Boolean(block.link.newTab)}
          tone={dark ? "paper" : "ink"}
          size="lg"
          withArrow
        >
          {block.link.label}
        </Button>
      </Container>
    </Section>
  );
}
