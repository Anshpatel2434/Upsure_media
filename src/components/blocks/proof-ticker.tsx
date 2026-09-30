import type { BlockProps } from "@/components/blocks/render-blocks";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Marquee } from "@/components/ui/marquee";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

/**
 * Compact proof band: every proof point runs in a slow ticker between two
 * hairlines, followed by a one-line prompt and the call to action.
 */
export function ProofTickerBlock({ block }: BlockProps<"proofTicker">) {
  const items = block.items ?? [];
  return (
    <Section tone="paper-2" padding="none" className="overflow-hidden py-12 md:py-16">
      <Reveal self={false}>
        {items.length > 0 && (
          <RevealItem index={0} direction="fade" className="border-y border-line py-5 md:py-6">
            <Marquee label="Proof points" duration={Math.max(28, items.length * 6)} gap="3rem">
              {items.map((i) => (
                <span
                  key={i.id ?? i.text}
                  className="flex items-center gap-12 text-[22px] font-semibold tracking-[-0.01em] whitespace-nowrap md:text-[30px] xl:text-[36px]"
                >
                  {i.text}
                  <span aria-hidden className="size-2.5 rounded-pill bg-teal md:size-3" />
                </span>
              ))}
            </Marquee>
          </RevealItem>
        )}
        {(block.heading || block.cta?.href) && (
          <Container className="mt-8 flex flex-col items-start gap-5 md:mt-10 md:flex-row md:items-center md:justify-between">
            {block.heading && (
              <RevealItem index={1} direction="left">
                <p className="text-h3 font-medium">{block.heading}</p>
              </RevealItem>
            )}
            {block.cta?.href && block.cta.label && (
              <RevealItem index={2} direction="right">
                <Button href={block.cta.href} size="lg" withArrow>
                  {block.cta.label}
                </Button>
              </RevealItem>
            )}
          </Container>
        )}
      </Reveal>
    </Section>
  );
}
