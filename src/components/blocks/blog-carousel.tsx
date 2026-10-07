import type { Category } from "@/content/types";

import type { BlockProps } from "@/components/blocks/render-blocks";
import { MediaTile, TILE_COLOURS } from "@/components/cards/media-tile";
import { Carousel } from "@/components/ui/carousel";
import { Container } from "@/components/ui/container";
import { Dot } from "@/components/ui/dot";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { getPosts } from "@/lib/queries";
import { renderEmphasis } from "@/lib/markers";
import { isDoc } from "@/lib/relations";
import { formatDate } from "@/lib/text";

/**
 * Latest articles as a compact slider of photo tiles (the same tile as the
 * work section): dot + title and a "View all insights" link on one line, then
 * roughly two tiles in view with the next one peeking in.
 */
export async function BlogCarouselBlock({ block }: BlockProps<"blogCarousel">) {
  const category = isDoc(block.category) ? (block.category as Category).slug : undefined;
  const limit = block.limit ?? 4;
  // `distinctTopics`: newest post from each topic, so the block shows range.
  const { docs: recent } = await getPosts({ limit: block.distinctTopics ? 100 : limit, category });
  const posts = block.distinctTopics
    ? recent
        .filter(
          (p, i, all) =>
            all.findIndex(
              (q) => isDoc(q.category) && isDoc(p.category) && q.category.id === p.category.id,
            ) === i,
        )
        .slice(0, limit)
    : recent;
  if (!posts.length) return null;
  const tone = block.tone ?? "teal-ink";
  const dark = tone === "teal-ink" || tone === "teal";

  return (
    <Section tone={tone} className="overflow-hidden">
      <Container>
        <Reveal self={false} className="flex flex-col gap-8 md:gap-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-3">
              <RevealItem index={0} className="flex items-center gap-4 md:gap-5">
                <Dot tone={dark ? "sun" : "teal"} />
                <h2 className="text-[24px] leading-[1.25] font-semibold tracking-[-0.01em] md:text-[30px] xl:text-[33px]">
                  {renderEmphasis(block.heading ?? "Insights", {
                    variant: "color",
                    tone: dark ? "sun" : "teal",
                  })}
                </h2>
              </RevealItem>
              {block.intro && (
                <RevealItem index={1}>
                  <p className={dark ? "text-paper/75" : "text-ink-2"}>{block.intro}</p>
                </RevealItem>
              )}
            </div>
            <RevealItem index={1}>
              <TextLink href="/blog" tone={dark ? "accent" : "teal"}>
                View all insights
              </TextLink>
            </RevealItem>
          </div>
          <RevealItem index={2} direction="fade">
            <Carousel
              label="Latest insights"
              tone={dark ? "paper" : "ink"}
              slideClassName="w-[85%] md:w-[46%] xl:w-[44%]"
            >
              {posts.map((p, i) => {
                const cat = isDoc(p.category) ? (p.category as Category) : null;
                return (
                  <MediaTile
                    key={p.id}
                    href={`/blog/${p.slug}`}
                    label={`Read ${p.title}`}
                    title={p.title}
                    image={p.cover}
                    meta={[formatDate(p.publishedAt), cat?.title].filter(Boolean).join(" · ")}
                    metaPlacement="top"
                    action="Read article"
                    excerpt={p.excerpt}
                    colour={TILE_COLOURS[i % TILE_COLOURS.length]}
                    sizes="(min-width: 1280px) 590px, (min-width: 768px) 46vw, 85vw"
                    className="h-full"
                  />
                );
              })}
            </Carousel>
          </RevealItem>
        </Reveal>
      </Container>
    </Section>
  );
}
