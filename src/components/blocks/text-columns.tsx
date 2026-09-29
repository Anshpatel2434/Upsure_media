import type { Media } from "@/payload-types";

import { BlockImage } from "@/components/blocks/block-image";
import type { BlockProps } from "@/components/blocks/render-blocks";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import { renderHighlights, sectionIndex } from "@/lib/text";

/** 1–3 text columns with optional images beside/below. The workhorse "copy" block. */
export function TextColumnsBlock({ block, index }: BlockProps<"textColumns">) {
  const tone = block.tone ?? "paper";
  const dark = tone === "teal-ink" || tone === "teal";
  const columns = block.columns ?? [];
  const images = (block.images ?? [])
    .map((i) => i.image)
    .filter((m): m is Media => typeof m === "object");
  const rotations = [-3, 4, -2];

  return (
    <Section tone={tone}>
      <Container className="flex flex-col gap-10">
        {block.eyebrow && (
          <Eyebrow index={sectionIndex(index)} tone={dark ? "paper" : "ink"}>
            {block.eyebrow}
          </Eyebrow>
        )}
        <div
          className={cn(
            "grid gap-10",
            images.length > 0 && "lg:grid-cols-[3fr_2fr] lg:items-center",
          )}
        >
          <div className={cn("grid gap-10", columns.length > 1 && "md:grid-cols-2")}>
            {columns.map((col) => (
              <div key={col.id ?? col.heading} className="flex flex-col gap-4">
                <Heading as="h2" size="h2">
                  {renderHighlights(col.heading, dark ? "coral" : "teal")}
                </Heading>
                <p className={cn("max-w-prose text-lead", dark ? "text-paper/75" : "text-ink-2")}>
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
              </div>
            ))}
          </div>
          {images.length > 0 && (
            <div className={cn("grid gap-4", images.length > 1 && "grid-cols-2")}>
              {images.slice(0, 3).map((m, i) => (
                <div
                  key={m.id}
                  style={{
                    transform: images.length > 1 ? `rotate(${rotations[i]}deg)` : undefined,
                  }}
                  className={cn(i === 2 && "col-span-2")}
                >
                  <BlockImage
                    media={m}
                    size="medium"
                    sizes="(min-width: 1024px) 30vw, 50vw"
                    aspect={(m.width ?? 1) > (m.height ?? 1) ? "aspect-[4/3]" : "aspect-[4/5]"}
                    className="rounded-xl shadow-card"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
