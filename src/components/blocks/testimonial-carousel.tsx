import type { BlockProps } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import { Carousel } from "@/components/ui/carousel";
import { Container } from "@/components/ui/container";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { getTestimonials } from "@/lib/cms/queries";

/** Heading on the left third, quotes sliding on the right with circle controls above. */
export async function TestimonialCarouselBlock({
  block,
  index,
}: BlockProps<"testimonialCarousel">) {
  const testimonials = await getTestimonials({ ids: block.items, featuredOnly: true });
  if (!testimonials.length) return null;
  const tone = block.tone ?? "paper";
  const dark = tone === "teal-ink" || tone === "teal";

  return (
    <Section tone={tone} className="overflow-hidden">
      <Container>
        <Reveal self={false} className="grid gap-10 lg:grid-cols-12">
          <SectionHeader
            index={index}
            eyebrow={block.eyebrow}
            heading={block.heading}
            tone={dark ? "paper" : "ink"}
            className="lg:col-span-4"
          />
          <RevealItem index={3} direction="fade" className="lg:col-span-8">
            {testimonials.length > 1 ? (
              <Carousel
                label={block.heading ?? "Testimonials"}
                tone={dark ? "paper" : "ink"}
                controls="top-right"
                slideClassName="w-[88%] md:w-[70%]"
              >
                {testimonials.map((t) => (
                  <TestimonialCard key={t.id} testimonial={t} tone={dark ? "paper" : "ink"} />
                ))}
              </Carousel>
            ) : (
              <TestimonialCard
                testimonial={testimonials[0]!}
                tone={dark ? "paper" : "ink"}
                size="lg"
              />
            )}
          </RevealItem>
        </Reveal>
      </Container>
    </Section>
  );
}
