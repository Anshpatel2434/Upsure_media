import type { BlockProps } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import { Carousel } from "@/components/ui/carousel";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getTestimonials } from "@/lib/cms/queries";

export async function TestimonialCarouselBlock({
  block,
  index,
}: BlockProps<"testimonialCarousel">) {
  const testimonials = await getTestimonials({ ids: block.items, featuredOnly: true });
  if (!testimonials.length) return null;
  const tone = block.tone ?? "paper";
  const dark = tone === "teal-ink" || tone === "teal";
  const cardTone = dark ? "teal-ink" : tone === "white" ? "paper" : "white";

  return (
    <Section tone={tone}>
      <Container className="flex flex-col gap-12">
        <SectionHeader
          index={index}
          eyebrow={block.eyebrow}
          heading={block.heading}
          tone={dark ? "paper" : "ink"}
        />
        {testimonials.length > 1 ? (
          <Carousel
            label={block.heading ?? "Testimonials"}
            tone={dark ? "paper" : "ink"}
            slideClassName="w-[88%] md:w-[55%] lg:w-[40%]"
          >
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} tone={cardTone} />
            ))}
          </Carousel>
        ) : (
          <div className="max-w-3xl">
            <TestimonialCard testimonial={testimonials[0]!} tone={cardTone} size="lg" />
          </div>
        )}
      </Container>
    </Section>
  );
}
