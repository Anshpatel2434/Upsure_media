import type { BlockProps } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { CaseStudyCard } from "@/components/cards/case-study-card";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import { Container } from "@/components/ui/container";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { getCaseStudies, getTestimonials } from "@/lib/cms/queries";
import { cn } from "@/lib/cn";

/**
 * Bento composition: the first study is a tall tile spanning two rows, the
 * next two stack beside it, anything else runs two-up underneath. A featured
 * quote with an accent bar hangs beneath the grid.
 */
export async function WorkGridBlock({ block, index }: BlockProps<"workGrid">) {
  const [studies, quotes] = await Promise.all([
    getCaseStudies({ ids: block.items, limit: block.limit ?? 4 }),
    getTestimonials({ featuredOnly: true }),
  ]);
  if (!studies.length) return null;
  const tone = block.tone ?? "teal-ink";
  const dark = tone === "teal-ink" || tone === "teal";
  const quote = quotes[0];
  const [first, second, third, ...rest] = studies;

  return (
    <Section tone={tone} className="overflow-hidden">
      <Container>
        <Reveal self={false} className="flex flex-col gap-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              index={index}
              eyebrow={block.eyebrow}
              heading={block.heading}
              intro={block.intro}
              tone={dark ? "paper" : "ink"}
            />
            {block.cta?.href && block.cta.label && (
              <RevealItem index={3}>
                <Button
                  href={block.cta.href}
                  variant="ghost"
                  tone={dark ? "paper" : "ink"}
                  withArrow
                >
                  {block.cta.label}
                </Button>
              </RevealItem>
            )}
          </div>

          {block.layout === "carousel" ? (
            <RevealItem index={4} direction="fade">
              <Carousel
                label={block.heading ?? "Case studies"}
                tone={dark ? "paper" : "ink"}
                controls="top-right"
                slideClassName="w-[88%] md:w-[60%] lg:w-[46%]"
              >
                {studies.map((s) => (
                  <CaseStudyCard key={s.id} study={s} size="wide" />
                ))}
              </Carousel>
            </RevealItem>
          ) : (
            <div className="grid gap-5 md:grid-cols-12 md:grid-rows-2">
              {first && (
                <RevealItem index={4} direction="image" className="md:col-span-7 md:row-span-2">
                  <CaseStudyCard study={first} size="large" priority />
                </RevealItem>
              )}
              {second && (
                <RevealItem index={5} direction="image" className="md:col-span-5">
                  <CaseStudyCard study={second} />
                </RevealItem>
              )}
              {third && (
                <RevealItem index={6} direction="image" className="md:col-span-5">
                  <CaseStudyCard study={third} />
                </RevealItem>
              )}
              {rest.map((s, i) => (
                <RevealItem key={s.id} index={7 + i} direction="image" className="md:col-span-6">
                  <CaseStudyCard study={s} size="wide" />
                </RevealItem>
              ))}
            </div>
          )}

          {quote && (
            <RevealItem index={8} className={cn("max-w-3xl", "lg:ml-[41.66%]")}>
              <TestimonialCard
                testimonial={quote}
                tone={dark ? "paper" : "ink"}
                size="lg"
                boxed={false}
              />
            </RevealItem>
          )}
        </Reveal>
      </Container>
    </Section>
  );
}
