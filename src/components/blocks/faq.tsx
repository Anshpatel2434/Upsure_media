import { BlockImage } from "@/components/blocks/block-image";
import type { BlockProps } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getFaqs } from "@/lib/cms/queries";

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
      <Container className="grid gap-10 lg:grid-cols-[1fr_2fr]">
        <div className="flex flex-col gap-8">
          <SectionHeader
            index={index}
            eyebrow={block.eyebrow}
            heading={block.heading}
            tone={dark ? "paper" : "ink"}
            size="h2"
          />
          {block.image && (
            <BlockImage
              media={block.image}
              size="card"
              sizes="(min-width: 1024px) 30vw, 100vw"
              aspect="aspect-[4/5]"
              className="hidden max-w-xs rounded-xl lg:block"
            />
          )}
        </div>
        <Accordion
          name={`faq-${index}`}
          tone={dark ? "paper" : "ink"}
          items={faqs.map((f) => ({
            id: String(f.id),
            title: f.question,
            content: <p>{f.answer}</p>,
          }))}
        />
      </Container>
    </Section>
  );
}
