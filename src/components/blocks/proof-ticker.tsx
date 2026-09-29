import type { BlockProps } from "@/components/blocks/render-blocks";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Marquee } from "@/components/ui/marquee";
import { Section } from "@/components/ui/section";

/** Scrolling proof points on a sun band, with an optional CTA underneath. */
export function ProofTickerBlock({ block }: BlockProps<"proofTicker">) {
  const items = block.items ?? [];
  return (
    <Section tone="paper" padding="none" className="py-0">
      <div className="bg-sun py-4 text-ink">
        <Marquee label="Proof points" duration={Math.max(24, items.length * 6)} gap="2.5rem">
          {items.map((i) => (
            <span
              key={i.id ?? i.text}
              className="flex items-center gap-10 text-lead font-medium whitespace-nowrap"
            >
              {i.text}
              <span aria-hidden className="size-2 rounded-full bg-ink/40" />
            </span>
          ))}
        </Marquee>
      </div>
      {(block.heading || block.cta?.href) && (
        <Container className="flex flex-col items-start gap-6 py-section md:flex-row md:items-center md:justify-between">
          {block.heading && (
            <Heading as="h2" size="h2">
              {block.heading}
            </Heading>
          )}
          {block.cta?.href && block.cta.label && (
            <Button href={block.cta.href} size="lg" withArrow>
              {block.cta.label}
            </Button>
          )}
        </Container>
      )}
    </Section>
  );
}
