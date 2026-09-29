import type { BlockProps } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { CaseStudyCard } from "@/components/cards/case-study-card";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getCaseStudies } from "@/lib/cms/queries";

export async function WorkGridBlock({ block, index }: BlockProps<"workGrid">) {
  const studies = await getCaseStudies({ ids: block.items, limit: block.limit ?? 4 });
  if (!studies.length) return null;
  const tone = block.tone ?? "teal-ink";
  const dark = tone === "teal-ink" || tone === "teal";
  const cardTone = dark ? "teal-ink" : "white";

  return (
    <Section tone={tone}>
      <Container className="flex flex-col gap-12">
        <SectionHeader
          index={index}
          eyebrow={block.eyebrow}
          heading={block.heading}
          intro={block.intro}
          tone={dark ? "paper" : "ink"}
        />
        {block.layout === "carousel" ? (
          <Carousel
            label={block.heading ?? "Case studies"}
            tone={dark ? "paper" : "ink"}
            slideClassName="w-[88%] md:w-[60%] lg:w-[46%]"
          >
            {studies.map((s) => (
              <CaseStudyCard key={s.id} study={s} tone={cardTone} />
            ))}
          </Carousel>
        ) : (
          <ul className="grid gap-5 md:grid-cols-2">
            {studies.map((s) => (
              <li key={s.id}>
                <CaseStudyCard study={s} tone={cardTone} />
              </li>
            ))}
          </ul>
        )}
        {block.cta?.href && block.cta.label && (
          <div>
            <Button
              href={block.cta.href}
              variant="ghost"
              tone={dark ? "paper" : "ink"}
              size="lg"
              withArrow
            >
              {block.cta.label}
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
}
