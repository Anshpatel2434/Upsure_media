import type { BlockProps } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { CaseStudyCard } from "@/components/cards/case-study-card";
import { WORK_TILE_COLOURS, WorkTile } from "@/components/cards/work-tile";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import { Container } from "@/components/ui/container";
import { Dot } from "@/components/ui/dot";
import { QuoteFader } from "@/components/ui/quote-fader";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { getCaseStudies, getTestimonials } from "@/lib/queries";
import { renderEmphasis } from "@/lib/markers";

/**
 * Work showcase. One rounded dark card holding two columns: the right column
 * opens with the heading, intro and "View all" link, then two tiles; the left
 * column carries two tiles and a cross-fading quote slider. Columns are offset
 * by the header height, so the tiles interlock rather than line up in rows.
 * `carousel` keeps the older sliding layout for inner pages.
 */
export async function WorkGridBlock({ block, index }: BlockProps<"workGrid">) {
  const [studies, quotes] = await Promise.all([
    getCaseStudies({ ids: block.items, limit: block.limit ?? 4 }),
    getTestimonials({ featuredOnly: true }),
  ]);
  if (!studies.length) return null;

  if (block.layout === "carousel") {
    const tone = block.tone ?? "teal-ink";
    const dark = tone === "teal-ink" || tone === "teal";
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
          </Reveal>
        </Container>
      </Section>
    );
  }

  const right = studies.filter((_, i) => i % 2 === 0);
  const left = studies.filter((_, i) => i % 2 === 1);
  const colourOf = (study: (typeof studies)[number]) =>
    WORK_TILE_COLOURS[studies.indexOf(study) % WORK_TILE_COLOURS.length];
  const quoteItems = quotes.map((q) => ({
    id: String(q.id),
    quote: q.quote,
    name: q.role ? `${q.name}, ${q.role}` : q.name,
    detail: q.company,
  }));

  return (
    <Section tone="paper" padding="none">
      <div className="mx-auto max-w-(--container-site)">
        <div className="rounded-[22px] bg-teal-ink px-gutter py-[50px] text-paper md:rounded-[40px] md:py-[80px] xl:py-[100px]">
          <div className="grid gap-[25px] md:grid-cols-2 md:gap-x-[60px] md:gap-y-0 xl:gap-x-[100px]">
            {/* Right column (first in reading order: heading, then the lead tiles). */}
            <div className="flex flex-col gap-[25px] md:order-2 md:gap-[30px] xl:gap-[40px]">
              <Reveal self={false} className="flex flex-col gap-4 md:gap-5">
                <RevealItem index={0} className="flex items-center gap-4 md:gap-5">
                  <Dot tone="sun" />
                  {block.heading && (
                    <h2 className="text-[24px] leading-[1.25] font-semibold tracking-[-0.01em] md:text-[30px] xl:text-[33px]">
                      {renderEmphasis(block.heading, { variant: "color", tone: "sun" })}
                    </h2>
                  )}
                </RevealItem>
                {block.intro && (
                  <RevealItem index={1}>
                    <p className="text-[15px] leading-[1.6] text-paper/80 md:text-base xl:text-[17px]">
                      {block.intro}
                    </p>
                  </RevealItem>
                )}
                {block.cta?.href && block.cta.label && (
                  <RevealItem index={2}>
                    <TextLink href={block.cta.href} tone="accent">
                      {block.cta.label}
                    </TextLink>
                  </RevealItem>
                )}
              </Reveal>
              {right.map((s, i) => (
                <WorkTile
                  key={s.id}
                  study={s}
                  colour={colourOf(s)}
                  priority={i === 0}
                  className="hidden md:block"
                />
              ))}
            </div>

            {/* Phones: one swipeable row instead of four stacked tiles. */}
            <div className="-mx-[25px] no-scrollbar flex snap-x snap-mandatory [scroll-padding-inline:25px] gap-4 overflow-x-auto px-[25px] md:hidden">
              {studies.map((s) => (
                <WorkTile
                  key={s.id}
                  study={s}
                  colour={colourOf(s)}
                  className="w-[82%] shrink-0 snap-start"
                />
              ))}
            </div>

            {/* Left column. */}
            <div className="flex flex-col gap-[25px] md:gap-[30px] xl:gap-[40px]">
              {left.map((s) => (
                <WorkTile key={s.id} study={s} colour={colourOf(s)} className="hidden md:block" />
              ))}
              {quoteItems.length > 0 && (
                <div className="pt-[15px] md:pt-0">
                  <QuoteFader items={quoteItems} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
