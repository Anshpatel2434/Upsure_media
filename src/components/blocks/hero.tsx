import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

import type { Media } from "@/payload-types";

import { BlockImage } from "@/components/blocks/block-image";
import type { BlockProps } from "@/components/blocks/render-blocks";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Sticker } from "@/components/ui/sticker";
import { getGlobals } from "@/lib/cms/queries";
import { cn } from "@/lib/cn";
import { imageProps } from "@/lib/media";
import { isDoc } from "@/lib/relations";
import { renderEmphasis } from "@/lib/markers";

type Hero = BlockProps<"hero">["block"];

const rotations = [-6, 4, -3, 5, -5, 3];

const images = (block: Hero) =>
  (block.images ?? []).map((i) => i.image).filter((m): m is Media => isDoc(m));

/** Small rounded image set inline with the headline text, Marino-style "media chip". */
function Chip({ media, className }: { media: Media; className?: string }) {
  const img = imageProps(media, "card");
  if (!img) return null;
  return (
    <span
      className={cn(
        "relative mx-[0.12em] inline-block h-[0.82em] w-[1.6em] translate-y-[0.06em] overflow-hidden rounded-[0.28em] align-baseline shadow-chip",
        className,
      )}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes="200px"
        priority
        placeholder={img.blurDataURL ? "blur" : "empty"}
        blurDataURL={img.blurDataURL}
        className="object-cover"
      />
    </span>
  );
}

/**
 * Headline with media chips embedded between the words: the first chip after
 * roughly a third of the words, the second after two thirds. Emphasis markers
 * (`[[…]]`) are preserved.
 */
function HeadlineWithChips({
  heading,
  chips,
  tone,
}: {
  heading: string;
  chips: Media[];
  tone: "teal" | "sun";
}) {
  const tokens = heading.split(/(\[\[[^\]]+\]\]|\s+)/).filter(Boolean);
  const words = tokens.filter((t) => t.trim()).length;
  const slots = chips.length
    ? [Math.max(1, Math.round(words / 3)), Math.max(2, Math.round((words * 2) / 3))]
    : [];
  const out: ReactNode[] = [];
  let count = 0;
  let chipIndex = 0;
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i]!;
    out.push(<span key={`t${i}`}>{renderEmphasis(t, { tone })}</span>);
    if (t.trim()) {
      count += 1;
      if (slots.includes(count) && chips[chipIndex]) {
        out.push(<Chip key={`c${i}`} media={chips[chipIndex]!} />);
        chipIndex += 1;
      }
    }
  }
  return <>{out}</>;
}

function Stickers({ block, className }: { block: Hero; className?: string }) {
  if (!block.stickers?.length) return null;
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {block.stickers.map((s, i) => (
        <Sticker key={s.id ?? i} tone={s.tone ?? "sun"} rotate={rotations[i % rotations.length]}>
          {s.text}
        </Sticker>
      ))}
    </div>
  );
}

function Ctas({ block, tone }: { block: Hero; tone: "ink" | "paper" }) {
  if (!block.ctas?.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-3">
      {block.ctas.map((c, i) => (
        <Button
          key={c.id ?? c.href}
          href={c.href}
          external={Boolean(c.newTab)}
          size="lg"
          tone={tone}
          variant={i === 0 ? "solid" : "ghost"}
          withArrow={i === 0}
        >
          {c.label}
        </Button>
      ))}
    </div>
  );
}

async function ContactLine({ tone }: { tone: "ink" | "paper" }) {
  const { settings } = await getGlobals();
  const link = cn("underline-offset-4 hover:underline", tone === "ink" ? "text-ink" : "text-paper");
  return (
    <p
      className={cn(
        "flex flex-wrap gap-x-6 gap-y-1 text-body",
        tone === "ink" ? "text-muted" : "text-paper/70",
      )}
    >
      <a href={`mailto:${settings.email}`} className={link}>
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

/**
 * Editorial hero. All variants share: left-set headline with inline media
 * chips, eyebrow with a pulsing dot, lead + buttons, and one tall photo card
 * overlapping the right edge with a slow float. Variants change tone and how
 * many floating pieces surround the headline.
 */
export function HeroBlock({ block }: BlockProps<"hero">) {
  const variant = block.variant ?? "editorial";
  const imgs = images(block);
  const dark = variant === "dark";
  const teal = variant === "photo-cards";
  const tone: "ink" | "paper" = dark || teal ? "paper" : "ink";
  const chips = imgs.slice(0, 2);
  const feature = imgs[2] ?? imgs[0];
  const floaters = variant === "collage" ? imgs.slice(3, 6) : teal ? imgs.slice(3, 5) : [];

  return (
    <Section
      tone={dark ? "teal-ink" : teal ? "teal" : "paper"}
      grid={!dark && !teal}
      padding="none"
      className="overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24"
    >
      {!dark && (
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-[10%] -z-10 size-[40rem] bg-glow"
        />
      )}
      <Container>
        <Reveal self={false} className="grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="flex flex-col gap-7 lg:col-span-8">
            {block.eyebrow && (
              <RevealItem index={0}>
                <Eyebrow dot tone={tone}>
                  {block.eyebrow}
                </Eyebrow>
              </RevealItem>
            )}
            <RevealItem index={1}>
              <h1
                className={cn(
                  "max-w-[13ch] text-display",
                  dark && "text-paper",
                  teal && "text-white",
                )}
              >
                <HeadlineWithChips
                  heading={block.heading}
                  chips={chips}
                  tone={tone === "paper" ? "sun" : "teal"}
                />
              </h1>
            </RevealItem>
            <RevealItem index={2}>
              <Stickers block={block} />
            </RevealItem>
            {block.lead && (
              <RevealItem index={3}>
                <p
                  className={cn(
                    "max-w-[52ch] text-lead font-medium",
                    tone === "ink" ? "text-ink-2" : "text-paper/80",
                  )}
                >
                  {block.lead}
                </p>
              </RevealItem>
            )}
            <RevealItem index={4} className="flex flex-col gap-5">
              <Ctas block={block} tone={tone} />
              {block.showContact && <ContactLine tone={tone} />}
            </RevealItem>
          </div>

          {feature && (
            <div className="relative lg:col-span-4 lg:self-end">
              <RevealItem
                index={2}
                direction="image"
                className="float-slower lg:-mr-10 lg:mb-6"
                style={{ "--rot": "2deg" } as CSSProperties}
              >
                <BlockImage
                  media={feature}
                  size="large"
                  sizes="(min-width: 1024px) 34vw, 100vw"
                  aspect="aspect-[4/5]"
                  priority
                  className="rounded-xl shadow-lift"
                />
              </RevealItem>
              {floaters.map((m, i) => (
                <RevealItem
                  key={m.id}
                  index={4 + i}
                  direction="image"
                  className={cn(
                    "absolute hidden w-[38%] lg:block",
                    i === 0 && "top-[8%] -left-[28%]",
                    i === 1 && "bottom-[-6%] -left-[18%]",
                    i === 2 && "top-[-14%] right-[-8%] w-[30%]",
                    i % 2 ? "float-slow" : "float-slower",
                  )}
                  style={
                    { "--rot": `${rotations[(i + 1) % rotations.length]}deg` } as CSSProperties
                  }
                >
                  <BlockImage
                    media={m}
                    size="card"
                    sizes="16vw"
                    aspect={(m.width ?? 1) > (m.height ?? 1) ? "aspect-[4/3]" : "aspect-[4/5]"}
                    className="rounded-lg shadow-lift"
                  />
                </RevealItem>
              ))}
            </div>
          )}
        </Reveal>
      </Container>
    </Section>
  );
}
