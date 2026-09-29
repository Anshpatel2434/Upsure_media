import type { BlockProps } from "@/components/blocks/render-blocks";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { NewsletterForm } from "@/features/newsletter/newsletter-form";

export function NewsletterBlock({ block }: BlockProps<"newsletter">) {
  const tone = block.tone ?? "teal-ink";
  const dark = tone === "teal-ink" || tone === "teal";
  return (
    <Section tone={tone} padding="tight">
      <Container className="grid gap-8 lg:grid-cols-2 lg:items-end">
        <div className="flex flex-col gap-4">
          {block.eyebrow && <Eyebrow tone={dark ? "paper" : "ink"}>{block.eyebrow}</Eyebrow>}
          <Heading as="h2" size="h2">
            {block.heading}
          </Heading>
        </div>
        <NewsletterForm
          buttonLabel={block.buttonLabel ?? undefined}
          source="blog"
          tone={dark ? "paper" : "ink"}
        />
      </Container>
    </Section>
  );
}
