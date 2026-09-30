import type { CSSProperties } from "react";

import type { Media } from "@/payload-types";

import { BlockImage } from "@/components/blocks/block-image";
import type { BlockProps } from "@/components/blocks/render-blocks";
import { ArrowPill } from "@/components/ui/arrow-pill";
import { Container } from "@/components/ui/container";
import { Dot } from "@/components/ui/dot";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { cn } from "@/lib/cn";
import { renderEmphasis } from "@/lib/markers";
import { isDoc } from "@/lib/relations";

/**
 * Mission-style rows: a pulsing dot and short title on the left third, the
 * statement set large on the right two thirds, a hairline between rows. Any
 * images follow as a staggered strip of rounded, softly glowing frames that
 * wipe in from the left.
 */
export function TextColumnsBlock({ block }: BlockProps<"textColumns">) {
  const tone = block.tone ?? "paper";
  const dark = tone === "teal-ink" || tone === "teal";
  const columns = block.columns ?? [];
  const images = (block.images ?? []).map((i) => i.image).filter((m): m is Media => isDoc(m));
  const aspects = ["aspect-[4/5]", "aspect-[4/3]", "aspect-square"];

  return (
    <Section
      tone={tone}
      padding="none"
      className="overflow-hidden py-[60px] md:py-[80px] xl:py-[100px]"
    >
      <Container>
        {block.eyebrow && (
          <Reveal direction="left" className="mb-[35px] md:mb-[50px]">
            <ArrowPill tone={dark ? "dark" : "light"}>{block.eyebrow}</ArrowPill>
          </Reveal>
        )}

        <div>
          {columns.map((col) => (
            <Reveal
              key={col.id ?? col.heading}
              self={false}
              className={cn(
                "grid gap-4 border-b py-[35px] first:pt-0 last:border-b-0 md:grid-cols-3 md:gap-[60px] md:py-[50px] xl:gap-[100px]",
                dark ? "border-paper/15" : "border-line-soft",
              )}
            >
              <RevealItem
                index={0}
                direction="left"
                className="flex items-center gap-4 self-start md:gap-5"
              >
                <Dot tone={dark ? "sun" : "teal"} />
                <h2 className="text-[24px] leading-[1.25] font-semibold tracking-[-0.01em] md:text-[26px] xl:text-[33px]">
                  {renderEmphasis(col.heading, { variant: "color", tone: dark ? "sun" : "teal" })}
                </h2>
              </RevealItem>
              <RevealItem index={1} direction="right" className="flex flex-col gap-6 md:col-span-2">
                <p
                  className={cn(
                    "text-[18px] leading-[1.55] font-medium md:text-[22px] xl:text-[28px]",
                    dark ? "text-paper/90" : "text-ink",
                  )}
                >
                  {col.body}
                </p>
                {col.link?.href && col.link.label && (
                  <TextLink
                    href={col.link.href}
                    external={Boolean(col.link.newTab)}
                    tone={dark ? "accent" : "teal"}
                  >
                    {col.link.label}
                  </TextLink>
                )}
              </RevealItem>
            </Reveal>
          ))}
        </div>

        {images.length > 0 && (
          <Reveal
            self={false}
            className={cn(
              "mt-[35px] grid items-start gap-[25px] md:mt-[50px] md:gap-[35px] xl:gap-[50px]",
              images.length > 1 && "grid-cols-2",
              images.length > 2 && "md:grid-cols-3",
            )}
          >
            {images.slice(0, 3).map((m, i) => (
              <div
                key={m.id}
                className={cn(
                  "glow rounded-[22px]",
                  i === 1 && "md:mt-[80px]",
                  i === 2 && "col-span-2 md:col-span-1 md:mt-[30px]",
                )}
                style={{ "--glow-delay": `${i + 1}s` } as CSSProperties}
              >
                <RevealItem
                  index={i}
                  direction="chip"
                  style={{ "--rv-step": "250ms", "--chip-radius": "22px" } as CSSProperties}
                >
                  <BlockImage
                    media={m}
                    size="medium"
                    sizes="(min-width: 768px) 30vw, 50vw"
                    aspect={aspects[i % aspects.length]}
                    className="rounded-[22px]"
                  />
                </RevealItem>
              </div>
            ))}
          </Reveal>
        )}
      </Container>
    </Section>
  );
}
