import type { Media } from "@/payload-types";

import { BlockImage } from "@/components/blocks/block-image";
import type { BlockProps } from "@/components/blocks/render-blocks";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Sticker } from "@/components/ui/sticker";
import { getGlobals } from "@/lib/cms/queries";
import { cn } from "@/lib/cn";
import { renderHighlights } from "@/lib/text";
import { isDoc } from "@/lib/relations";

const rotations = [-6, 4, -3, 5, -5, 3, -4, 6];
const collageLayout = [
  "left-[2%] top-[8%] w-[26%] lg:w-[18%]",
  "left-[30%] top-[0%] w-[22%] lg:w-[15%]",
  "right-[4%] top-[6%] w-[24%] lg:w-[16%]",
  "left-[10%] bottom-[4%] w-[24%] lg:w-[16%]",
  "left-[40%] bottom-[0%] w-[28%] lg:w-[19%]",
  "right-[10%] bottom-[8%] w-[22%] lg:w-[15%]",
  "left-[60%] top-[30%] w-[18%] lg:w-[12%]",
  "left-[22%] top-[38%] w-[16%] lg:w-[11%]",
];

const images = (block: BlockProps<"hero">["block"]) =>
  (block.images ?? []).map((i) => i.image).filter((m): m is Media => isDoc(m));

function Stickers({
  block,
  className,
}: {
  block: BlockProps<"hero">["block"];
  className?: string;
}) {
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

function Ctas({ block, tone }: { block: BlockProps<"hero">["block"]; tone: "ink" | "paper" }) {
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
 * Four variants share one data shape:
 *  - collage: heading over a scattered card collage (Home)
 *  - editorial: big heading left, image right (listing pages)
 *  - photo-cards: floating photo cards on teal (About)
 *  - dark: teal-ink band (Contact)
 */
export function HeroBlock({ block }: BlockProps<"hero">) {
  const variant = block.variant ?? "editorial";
  const imgs = images(block);

  if (variant === "collage") {
    return (
      <Section grid padding="none" className="overflow-hidden pt-10 pb-0 md:pt-16">
        <Container className="relative z-10 flex flex-col items-center gap-6 text-center">
          {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
          <Heading as="h1" size="display" className="max-w-5xl">
            {renderHighlights(block.heading)}
          </Heading>
          <Stickers block={block} className="justify-center" />
          {block.lead && <p className="max-w-2xl text-lead text-ink-2">{block.lead}</p>}
          <Ctas block={block} tone="ink" />
        </Container>
        {imgs.length > 0 && (
          <div
            aria-hidden
            className="relative mx-auto mt-8 h-[46vw] max-h-[34rem] min-h-[16rem] w-full max-w-[96rem]"
          >
            {imgs.slice(0, 8).map((m, i) => (
              <div
                key={m.id}
                className={cn("absolute", collageLayout[i])}
                style={{ transform: `rotate(${rotations[i % rotations.length]}deg)` }}
              >
                <BlockImage
                  media={m}
                  size="card"
                  sizes="(min-width: 1024px) 18vw, 28vw"
                  aspect={(m.width ?? 1) > (m.height ?? 1) ? "aspect-[4/3]" : "aspect-[4/5]"}
                  priority={i < 3}
                  className="shadow-lift"
                />
              </div>
            ))}
          </div>
        )}
      </Section>
    );
  }

  if (variant === "photo-cards") {
    return (
      <Section tone="teal" padding="default" className="overflow-hidden">
        <Container className="relative z-10 flex min-h-[28rem] flex-col items-center justify-center gap-6 text-center">
          {block.eyebrow && <Eyebrow tone="paper">{block.eyebrow}</Eyebrow>}
          <Heading as="h1" size="h1" className="max-w-4xl text-white">
            {renderHighlights(block.heading, "coral")}
          </Heading>
          {block.lead && <p className="max-w-2xl text-lead text-white/80">{block.lead}</p>}
          <Stickers block={block} className="justify-center" />
          <Ctas block={block} tone="paper" />
        </Container>
        {imgs.length > 0 && (
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {imgs.slice(0, 5).map((m, i) => (
              <div
                key={m.id}
                className={cn("absolute w-[22%] max-w-[14rem] lg:w-[14%]", collageLayout[i])}
                style={{ transform: `rotate(${rotations[i % rotations.length]}deg)` }}
              >
                <BlockImage
                  media={m}
                  size="card"
                  sizes="14vw"
                  aspect="aspect-[3/4]"
                  className="rounded-xl shadow-lift"
                  priority={i < 2}
                />
              </div>
            ))}
          </div>
        )}
      </Section>
    );
  }

  if (variant === "dark") {
    return (
      <Section tone="teal-ink" padding="default">
        <Container className="flex flex-col gap-6">
          {block.eyebrow && <Eyebrow tone="paper">{block.eyebrow}</Eyebrow>}
          <Heading as="h1" size="display" className="max-w-5xl">
            {renderHighlights(block.heading, "coral")}
          </Heading>
          {block.lead && <p className="max-w-2xl text-lead text-paper/75">{block.lead}</p>}
          <Stickers block={block} />
          <Ctas block={block} tone="paper" />
          {block.showContact && <ContactLine tone="paper" />}
        </Container>
      </Section>
    );
  }

  // editorial (default)
  const main = imgs[0];
  return (
    <Section grid padding="default">
      <Container className="grid items-end gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col gap-6">
          {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
          <Heading as="h1" size="h1" className="max-w-4xl">
            {renderHighlights(block.heading)}
          </Heading>
          <Stickers block={block} />
          {block.lead && <p className="max-w-2xl text-lead text-ink-2">{block.lead}</p>}
          <Ctas block={block} tone="ink" />
          {block.showContact && <ContactLine tone="ink" />}
        </div>
        {main && (
          <BlockImage
            media={main}
            size="large"
            sizes="(min-width: 1024px) 40vw, 100vw"
            aspect="aspect-[4/3]"
            priority
            className="rounded-xl shadow-card"
          />
        )}
      </Container>
    </Section>
  );
}
