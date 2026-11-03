import type { BlockProps } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { getFaqs } from "@/lib/queries";

/** Heading in a sticky left column beside a hairline list with circle controls. */
export async function FaqBlock({ block, index }: BlockProps<"faq">) {
  const faqs = await getFaqs(
    block.scope === "custom" ? { ids: block.items } : { scope: block.scope ?? "services" },
  );
  if (!faqs.length) return null;
  const tone = block.tone ?? "paper";
  const dark = tone === "teal-ink" || tone === "teal";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <Section tone={tone}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        {/* Heading left, questions right. The tilted image that used to sit in
            a third column pushed the two out of line with each other. */}
        <Reveal self={false} className="grid gap-10 lg:grid-cols-12">
          <SectionHeader
            index={index}
            eyebrow={block.eyebrow}
            heading={block.heading}
            tone={dark ? "paper" : "ink"}
            className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start"
          />
          <RevealItem index={3} direction="fade" className="lg:col-span-8">
            <Accordion
              name={`faq-${index}`}
              tone={dark ? "paper" : "ink"}
              items={faqs.map((f) => ({
                id: String(f.id),
                title: f.question,
                content: <p>{f.answer}</p>,
              }))}
            />
          </RevealItem>
        </Reveal>
      </Container>
    </Section>
  );
}
