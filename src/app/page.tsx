import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading, Highlight } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Sticker } from "@/components/ui/sticker";

/** Temporary home page. Replaced by the CMS-driven page in Phase 5. */
export default function HomePage() {
  return (
    <Section grid className="flex flex-1 items-center">
      <Container className="flex flex-col gap-8">
        <Eyebrow index="01">Upsure — under construction</Eyebrow>
        <Heading as="h1" size="display" className="max-w-5xl">
          We design brands <Highlight>people love</Highlight>
        </Heading>
        <p className="max-w-2xl text-lead text-ink-2">
          We are Upsure, a creative agency rooted in strategy, craft, and growth. The new site is
          being built — the design system is ready, the CMS comes next.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/dev/ui" withArrow>
            View the UI kit
          </Button>
          <Sticker tone="coral" rotate={4}>
            Phase 2 of 13
          </Sticker>
        </div>
      </Container>
    </Section>
  );
}
