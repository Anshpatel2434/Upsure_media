import { BlockImage } from "@/components/blocks/block-image";
import type { BlockProps } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { getFaqs } from "@/lib/cms/queries";

/** Right-aligned heading, full-width hairline list with circle controls. */
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
        <Reveal self={false} className="grid gap-10 lg:grid-cols-12">
          {block.image && (
            <RevealItem index={0} direction="image" className="hidden lg:col-span-3 lg:block">
              <BlockImage
                media={block.image}
                size="card"
                sizes="25vw"
                aspect="aspect-[4/5]"
                className="rounded-xl shadow-card lg:sticky lg:top-28 lg:-rotate-2"
              />
            </RevealItem>
          )}
          <div className={block.image ? "lg:col-span-9" : "lg:col-span-12"}>
            <SectionHeader
              index={index}
              eyebrow={block.eyebrow}
              heading={block.heading}
              tone={dark ? "paper" : "ink"}
              align="right"
              className="mb-10"
            />
            <RevealItem index={3} direction="fade">
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
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
