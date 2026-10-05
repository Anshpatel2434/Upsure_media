import type { BlockProps } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { TestimonialGrid } from "@/components/blocks/testimonial-grid";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import { Carousel } from "@/components/ui/carousel";
import { Container } from "@/components/ui/container";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { getTestimonials } from "@/lib/queries";
import { isDoc } from "@/lib/relations";

/**
 * Heading on the left third, quotes sliding on the right with circle controls
 * above. `layout: "grid"` shows every slot with a filter by service instead.
 */
export async function TestimonialCarouselBlock({
  block,
  index,
}: BlockProps<"testimonialCarousel">) {
  const testimonials = await getTestimonials({ ids: block.items, featuredOnly: true });
  if (!testimonials.length) return null;
  const tone = block.tone ?? "paper";
  const dark = tone === "teal-ink" || tone === "teal";

  if (block.layout === "grid") {
    const items = testimonials.map((t) => ({
      testimonial: t,
      service: isDoc(t.service) ? t.service.title : null,
    }));
    const services = items
      .map((i) => i.service)
      .filter((s, i, all): s is string => Boolean(s) && all.indexOf(s) === i);
    return (
      <Section tone={tone}>
        <Container>
          <Reveal self={false} className="flex flex-col gap-10">
            <SectionHeader
              index={index}
              eyebrow={block.eyebrow}
              heading={block.heading}
              tone={dark ? "paper" : "ink"}
            />
            <RevealItem index={3} direction="fade">
              <TestimonialGrid items={items} services={services} tone={dark ? "paper" : "ink"} />
            </RevealItem>
          </Reveal>
        </Container>
      </Section>
    );
  }

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
