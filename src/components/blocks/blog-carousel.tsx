import type { Category } from "@/payload-types";

import type { BlockProps } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { PostCard } from "@/components/cards/post-card";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import { Container } from "@/components/ui/container";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { getPosts } from "@/lib/cms/queries";
import { isDoc } from "@/lib/relations";

export async function BlogCarouselBlock({ block, index }: BlockProps<"blogCarousel">) {
  const category = isDoc(block.category) ? (block.category as Category).slug : undefined;
  const { docs: posts } = await getPosts({ limit: block.limit ?? 4, category });
  if (!posts.length) return null;
  const tone = block.tone ?? "teal-ink";
  const dark = tone === "teal-ink" || tone === "teal";

  return (
    <Section tone={tone} className="overflow-hidden">
      <Container>
        <Reveal self={false} className="flex flex-col gap-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              index={index}
              eyebrow={block.eyebrow}
              heading={block.heading}
              tone={dark ? "paper" : "ink"}
            />
            <RevealItem index={3}>
              <Button href="/blog" variant="ghost" tone={dark ? "paper" : "ink"} withArrow>
                View all articles
              </Button>
            </RevealItem>
          </div>
          <RevealItem index={4} direction="fade">
            <Carousel
              label="Latest articles"
              tone={dark ? "paper" : "ink"}
              slideClassName="w-[88%] md:w-[55%] lg:w-[42%]"
            >
              {posts.map((p) => (
                <PostCard key={p.id} post={p} className="h-full" />
              ))}
            </Carousel>
          </RevealItem>
        </Reveal>
      </Container>
    </Section>
  );
}
