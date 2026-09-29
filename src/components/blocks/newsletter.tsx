import type { BlockProps } from "@/components/blocks/render-blocks";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { NewsletterForm } from "@/features/newsletter/newsletter-form";

export function NewsletterBlock({ block }: BlockProps<"newsletter">) {
  const tone = block.tone ?? "teal-ink";
  const dark = tone === "teal-ink" || tone === "teal";
  return (
    <Section tone={tone} padding="tight" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -bottom-24 size-80 rounded-full bg-sun/15 blur-3xl"
      />
      <Container>
        <Reveal self={false} className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="flex flex-col gap-4 lg:col-span-7">
            {block.eyebrow && (
              <RevealItem index={0}>
                <Eyebrow dot tone={dark ? "paper" : "ink"}>
                  {block.eyebrow}
                </Eyebrow>
              </RevealItem>
            )}
            <RevealItem index={1}>
              <Heading as="h2" size="h2">
                {block.heading}
              </Heading>
            </RevealItem>
          </div>
          <RevealItem index={2} className="lg:col-span-5">
            <NewsletterForm
              buttonLabel={block.buttonLabel ?? undefined}
              source="blog"
              tone={dark ? "paper" : "ink"}
            />
          </RevealItem>
        </Reveal>
      </Container>
    </Section>
  );
}
