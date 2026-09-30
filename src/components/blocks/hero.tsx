import Image from "next/image";
import type { CSSProperties } from "react";

import type { Media } from "@/content/types";

import type { BlockProps } from "@/components/blocks/render-blocks";
import { ArrowPill } from "@/components/ui/arrow-pill";
import { Bubble } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { getGlobals } from "@/lib/queries";
import { cn } from "@/lib/cn";
import { renderEmphasis, plainText } from "@/lib/markers";
import { imageProps } from "@/lib/media";
import { isDoc } from "@/lib/relations";

type Hero = BlockProps<"hero">["block"];
type Tone = "ink" | "paper";

const images = (block: Hero) =>
  (block.images ?? []).map((i) => i.image).filter((m): m is Media => isDoc(m));

/** Rounded media chip that wipes in and pulses a soft glow. */
function Chip({
  media,
  order,
  aspect = "aspect-video",
  className,
  priority = false,
}: {
  media: Media;
  order: number;
  aspect?: string;
  className?: string;
  priority?: boolean;
}) {
  const img = imageProps(media, "card");
  if (!img) return null;
  return (
    <span
      className={cn(
        "glow pointer-events-none block w-[25vw] rounded-[12px] md:w-[14vw] md:rounded-[1.5vw] 2xl:w-[215px] 2xl:rounded-[22px]",
        className,
      )}
      style={{ "--glow-delay": `${order}s` } as CSSProperties}
      aria-hidden
    >
      <span
        data-rv="chip"
        className={cn("relative block overflow-hidden rounded-[inherit] bg-paper-2", aspect)}
        style={{ "--rv-delay": `${350 + order * 250}ms`, "--i": 0 } as CSSProperties}
      >
        <Image
          src={img.src}
          alt=""
          fill
          sizes="(min-width: 1536px) 215px, (min-width: 768px) 14vw, 25vw"
          priority={priority}
          placeholder={img.blurDataURL ? "blur" : "empty"}
          blurDataURL={img.blurDataURL}
          className="object-cover"
        />
      </span>
    </span>
  );
}

async function ContactLine({ tone, className }: { tone: Tone; className?: string }) {
  const { settings } = await getGlobals();
  const link = cn("underline-offset-4 hover:underline", tone === "ink" ? "text-ink" : "text-paper");
  return (
    <p className={cn("flex flex-wrap gap-x-2.5 gap-y-1 text-sm", className)}>
      <a href={`mailto:${settings.email}`} className={cn(link, "font-bold")}>
        {settings.email}
      </a>
      {settings.phone && settings.phoneHref && (
        <a href={`tel:${settings.phoneHref}`} className={link}>
          {settings.phone}
        </a>
      )}
    </p>
  );
}

function Ctas({ block, tone, className }: { block: Hero; tone: Tone; className?: string }) {
  if (!block.ctas?.length) return null;
  const [primary, ...rest] = block.ctas;
  return (
    <div className={cn("flex flex-wrap items-center gap-x-8 gap-y-4", className)}>
      {primary && (
        <Button
          href={primary.href}
          external={Boolean(primary.newTab)}
          size="lg"
          tone={tone}
          withArrow
        >
          {primary.label}
        </Button>
      )}
      {rest.map((c) => (
        <TextLink key={c.id ?? c.href} href={c.href} tone={tone === "ink" ? "ink" : "accent"}>
          {c.label}
        </TextLink>
      ))}
    </div>
  );
}

/**
 * Home hero: three display lines with media chips set between the words,
 * two floating pills, and the intro paragraph beside the last line. Lines
 * slide in alternately from the right and left, 0.25 s apart.
 *
 * Headline lines are separated with "|" in the CMS; `[[…]]` marks the words
 * shown in the accent colour.
 */
function HomeHero({ block }: { block: Hero }) {
  const lines = block.heading.split("|").map((l) => l.trim());
  while (lines.length < 3) lines.push("");
  const [l1, l2, l3] = lines;
  const imgs = images(block);
  const [s1, s2] = block.stickers ?? [];

  // Sizes follow the viewport (10.4 vw type, 14 vw chips) and stop growing at
  // 1536 px, so the three lines span the full width like the reference.
  return (
    <Section
      tone="paper"
      grid
      padding="none"
      className="overflow-hidden pt-6 pb-12 md:pt-8 md:pb-10"
    >
      <Container>
        <Reveal self={false} style={{ "--rv-step": "250ms" } as CSSProperties}>
          <h1 className="sr-only">{plainText(block.heading.replace(/\|/g, " "))}</h1>

          {block.eyebrow && (
            <RevealItem index={0} direction="fade">
              <ArrowPill>{block.eyebrow}</ArrowPill>
            </RevealItem>
          )}

          <div className="mt-2.5 text-[13vw] leading-[1.1] font-semibold tracking-[-0.035em] text-ink md:text-[10.4vw] 2xl:text-[160px]">
            {/* Line 1 — text, chip to the right, floating pill */}
            <RevealItem direction="right" index={0} className="relative block md:inline-block">
              <span aria-hidden className="relative z-10">
                {renderEmphasis(l1, { variant: "color" })}
              </span>
              {imgs[0] && (
                <Chip
                  media={imgs[0]}
                  order={1}
                  priority
                  className="hidden md:absolute md:bottom-[0.1em] md:left-[104%] md:block"
                />
              )}
              {s1 && (
                <span className="absolute top-[29vw] right-0 z-20 text-base md:top-[60%] md:right-auto md:left-[120%]">
                  <Bubble index={0} tone={s1.tone === "coral" ? "white" : "sun"}>
                    {s1.text}
                  </Bubble>
                </span>
              )}
            </RevealItem>

            {/* Line 2 — chip in the left gutter, indented text */}
            <RevealItem
              direction="left"
              index={1}
              className="relative block md:pl-[19vw] 2xl:pl-[292px]"
            >
              {imgs[1] && (
                <Chip
                  media={imgs[1]}
                  order={2}
                  priority
                  className="mr-[2vw] inline-block align-middle md:absolute md:bottom-[0.1em] md:left-[2.7vw] md:mr-0 2xl:left-[41px]"
                />
              )}
              <span aria-hidden className="relative z-10">
                {renderEmphasis(l2, { variant: "color" })}
              </span>
            </RevealItem>

            {/* Line 3 — text, then a column with the intro, third chip and CTAs */}
            <RevealItem direction="right" index={2} className="relative block md:flex">
              <span aria-hidden className="relative z-10 shrink-0">
                {renderEmphasis(l3, { variant: "color" })}
              </span>
              <span className="block text-base font-normal tracking-normal md:w-[42vw] md:pl-[2vw] 2xl:w-[645px] 2xl:pl-[30px]">
                {block.lead && (
                  <span className="block pt-5 leading-[1.6] text-ink-2 md:pt-[3vw] md:text-[1.2vw] 2xl:pt-[46px] 2xl:text-lg">
                    {renderEmphasis(block.lead, { variant: "strong" })}
                  </span>
                )}
                <span className="flex flex-col gap-8 pt-5 md:flex-row md:items-end md:gap-[2.5vw] md:pt-[2vw] 2xl:gap-10 2xl:pt-[30px]">
                  {imgs[2] && (
                    <span className="relative w-fit">
                      <Chip
                        media={imgs[2]}
                        order={3}
                        aspect="aspect-[10/7]"
                        className="w-[45vw] md:w-[14vw]"
                      />
                      {/* Phones: the second pill overlaps this chip's corner. */}
                      {s2 && (
                        <span className="absolute top-[58%] left-[62%] z-20 text-base md:hidden">
                          <Bubble index={1} tone="sun">
                            {s2.text}
                          </Bubble>
                        </span>
                      )}
                    </span>
                  )}
                  <Ctas
                    block={block}
                    tone="ink"
                    className="md:flex-col md:items-start md:gap-y-5"
                  />
                </span>
              </span>
              {s2 && (
                <span className="absolute top-[14vw] -left-[30px] z-20 hidden text-base md:block 2xl:top-[215px]">
                  <Bubble index={1} tone="sun">
                    {s2.text}
                  </Bubble>
                </span>
              )}
              {block.showContact !== false && (
                <ContactLine
                  tone="ink"
                  className="mt-8 font-normal tracking-normal md:absolute md:right-0 md:bottom-0 md:mt-0 md:justify-end"
                />
              )}
            </RevealItem>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/** Headline size scales down with length so long CMS headings stay balanced. */
function defaultHeadingSize(text: string) {
  const len = plainText(text).length;
  if (len <= 24) return "text-[12vw] md:text-[8vw] 2xl:text-[123px]";
  if (len <= 50) return "text-[9vw] md:text-[5.2vw] 2xl:text-[80px]";
  return "text-[7.5vw] md:text-[3.6vw] 2xl:text-[55px]";
}

/**
 * Listing-page hero ("default"): two thirds hold one display line with a
 * floating pill breaking into the right column, then a second pill beside the
 * intro paragraph; the right third holds a glowing rounded image.
 */
function DefaultHero({ block, tone }: { block: Hero; tone: "paper" | "teal" | "teal-ink" }) {
  const imgs = images(block);
  const feature = imgs[0];
  const [s1, s2] = block.stickers ?? [];
  const onDark = tone !== "paper";
  const text: Tone = onDark ? "paper" : "ink";
  const img = feature ? imageProps(feature, "large") : null;

  return (
    <Section
      tone={tone}
      grid={!onDark}
      padding="none"
      className="overflow-hidden pt-6 pb-14 md:pt-10 md:pb-16"
    >
      <Container>
        <Reveal self={false} style={{ "--rv-step": "250ms" } as CSSProperties}>
          {block.eyebrow && (
            <RevealItem index={0} direction="fade">
              <ArrowPill tone={onDark ? "dark" : "light"}>{block.eyebrow}</ArrowPill>
            </RevealItem>
          )}

          <div className="mt-2.5 grid gap-10 md:grid-cols-3 md:gap-[30px]">
            <div className={cn(img ? "md:col-span-2" : "md:col-span-3")}>
              <RevealItem index={1} direction="right" className="relative">
                <h1
                  className={cn(
                    "leading-[1.1] font-semibold tracking-[-0.035em] text-balance",
                    defaultHeadingSize(block.heading),
                    onDark ? "text-paper" : "text-ink",
                  )}
                >
                  {renderEmphasis(block.heading.replace(/\|/g, " "), {
                    variant: "color",
                    tone: onDark ? "sun" : "teal",
                  })}
                </h1>
                {s1 && (
                  <span className="absolute -top-5 right-0 z-20 md:-top-[2.5vw] md:-right-[18%]">
                    <Bubble index={0} tone="sun">
                      {s1.text}
                    </Bubble>
                  </span>
                )}
              </RevealItem>

              {(block.lead || s2) && (
                <RevealItem index={2} direction="left" className="mt-8 md:flex md:items-end">
                  {s2 && (
                    <span className="mb-5 block shrink-0 md:mb-0 md:-ml-[15px] xl:-ml-[30px]">
                      <Bubble index={1} tone={onDark ? "white" : "sun"}>
                        {s2.text}
                      </Bubble>
                    </span>
                  )}
                  {block.lead && (
                    <p
                      className={cn(
                        "text-base leading-[1.6] md:w-[73%] md:pl-[6%]",
                        onDark ? "text-paper/80" : "text-ink-2",
                      )}
                    >
                      {renderEmphasis(block.lead, { variant: "strong" })}
                    </p>
                  )}
                </RevealItem>
              )}

              {block.ctas?.length ? (
                <RevealItem index={3} direction="fade" className="mt-8">
                  <Ctas block={block} tone={text} />
                </RevealItem>
              ) : null}
            </div>

            {img && (
              <RevealItem index={2} direction="image">
                <div
                  className="glow rounded-[22px]"
                  style={{ "--glow-delay": "0.5s" } as CSSProperties}
                >
                  <div className="relative aspect-[9/5] overflow-hidden rounded-[22px] bg-paper-2">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      priority
                      sizes="(min-width: 768px) 32vw, 100vw"
                      placeholder={img.blurDataURL ? "blur" : "empty"}
                      blurDataURL={img.blurDataURL}
                      className="object-cover"
                    />
                  </div>
                </div>
              </RevealItem>
            )}
          </div>

          {block.showContact && (
            <RevealItem index={4} direction="fade" className="mt-8 hidden md:block">
              <ContactLine tone={text} className="justify-end" />
            </RevealItem>
          )}
        </Reveal>
      </Container>
    </Section>
  );
}

export function HeroBlock({ block }: BlockProps<"hero">) {
  const variant = block.variant ?? "editorial";
  if (variant === "collage") return <HomeHero block={block} />;
  if (variant === "dark") return <DefaultHero block={block} tone="teal-ink" />;
  if (variant === "photo-cards") return <DefaultHero block={block} tone="teal" />;
  return <DefaultHero block={block} tone="paper" />;
}
