import type { CSSProperties } from "react";

import type { Media } from "@/payload-types";

import { BlockImage } from "@/components/blocks/block-image";
import type { BlockProps } from "@/components/blocks/render-blocks";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import { renderEmphasis } from "@/lib/markers";
import { isDoc } from "@/lib/relations";
import { sectionIndex } from "@/lib/text";

/**
 * Copy on a narrow column with images overlapping the edge at a slight tilt;
 * the second column starts lower so the two never line up.
 */
export function TextColumnsBlock({ block, index }: BlockProps<"textColumns">) {
  const tone = block.tone ?? "paper";
  const dark = tone === "teal-ink" || tone === "teal";
  const columns = block.columns ?? [];
  const images = (block.images ?? []).map((i) => i.image).filter((m): m is Media => isDoc(m));
  const rotations = [-3, 4, -2];

  return (
    <Section tone={tone} className="overflow-hidden">
      <Container>
        <Reveal self={false} className="grid gap-10 lg:grid-cols-12">
          {block.eyebrow && (
            <RevealItem index={0} className="lg:col-span-12">
              <Eyebrow index={sectionIndex(index)} tone={dark ? "paper" : "ink"}>
                {block.eyebrow}
              </Eyebrow>
            </RevealItem>
          )}
          <div
            className={cn(
              "grid gap-12",
              images.length ? "lg:col-span-7" : "lg:col-span-10 lg:col-start-2",
              columns.length > 1 && "md:grid-cols-2",
            )}
          >
            {columns.map((col, i) => (
              <RevealItem
                key={col.id ?? col.heading}
                index={i + 1}
                className={cn("flex flex-col gap-4", i === 1 && "md:mt-16")}
              >
                <Heading as="h2" size="h2">
                  {renderEmphasis(col.heading, { tone: dark ? "sun" : "teal" })}
                </Heading>
                <p className={cn("max-w-[52ch] text-lead", dark ? "text-paper/75" : "text-ink-2")}>
                  {col.body}
                </p>
                {col.link?.href && col.link.label && (
                  <Button
                    href={col.link.href}
                    external={Boolean(col.link.newTab) || col.link.href.startsWith("mailto:")}
                    variant="ghost"
                    tone={dark ? "paper" : "ink"}
                    withArrow
                    className="mt-2 w-fit"
                  >
                    {col.link.label}
                  </Button>
                )}
              </RevealItem>
            ))}
          </div>
          {images.length > 0 && (
            <div className="relative lg:col-span-5">
              <div className={cn("grid gap-5", images.length > 1 && "grid-cols-2")}>
                {images.slice(0, 3).map((m, i) => (
                  <RevealItem
                    key={m.id}
                    index={i + 3}
                    direction="image"
                    className={cn(i === 1 && "mt-12", i === 2 && "col-span-2 -mt-6 lg:-mr-16")}
                    style={{ transform: `rotate(${rotations[i]}deg)` } as CSSProperties}
                  >
                    <BlockImage
                      media={m}
                      size="medium"
                      sizes="(min-width: 1024px) 30vw, 50vw"
                      aspect={(m.width ?? 1) > (m.height ?? 1) ? "aspect-[4/3]" : "aspect-[4/5]"}
                      className="rounded-xl shadow-lift"
                    />
                  </RevealItem>
                ))}
              </div>
            </div>
          )}
        </Reveal>
      </Container>
    </Section>
  );
}
