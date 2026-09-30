import { BlockImage } from "@/components/blocks/block-image";
import type { BlockProps } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { Container } from "@/components/ui/container";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Sticker } from "@/components/ui/sticker";
import { getTeam } from "@/lib/queries";
import { cn } from "@/lib/cn";

/** Offset masonry: alternating portrait/landscape crops, every second column pushed down. */
export async function TeamGridBlock({ block, index }: BlockProps<"teamGrid">) {
  const members = await getTeam(block.members);
  if (!members.length) return null;
  const tone = block.tone ?? "paper";
  const dark = tone === "teal-ink" || tone === "teal";

  return (
    <Section tone={tone}>
      <Container>
        <Reveal self={false} className="flex flex-col gap-14">
          <SectionHeader
            index={index}
            eyebrow={block.eyebrow}
            heading={block.heading}
            intro={block.intro}
            tone={dark ? "paper" : "ink"}
            align="right"
          />
          <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((m, i) => (
              <RevealItem
                as="li"
                key={m.id}
                index={i + 3}
                direction="image"
                className={cn(
                  "flex flex-col gap-4",
                  i % 3 === 1 && "lg:mt-16",
                  i % 2 === 1 && "sm:mt-10 lg:mt-0",
                )}
              >
                <div className="group relative overflow-hidden rounded-xl shadow-card">
                  <BlockImage
                    media={m.photo}
                    size="card"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    aspect={i % 3 === 1 ? "aspect-[4/3]" : "aspect-[4/5]"}
                    rounded={false}
                    className="transition-transform duration-[5s] ease-[cubic-bezier(.25,.7,.2,1)] group-hover:scale-105"
                  />
                  {m.founder && (
                    <Sticker tone="sun" rotate={i % 2 ? 4 : -4} className="absolute top-4 left-4">
                      Founder
                    </Sticker>
                  )}
                </div>
                <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4">
                  <div className="flex flex-col">
                    <h3 className="text-h3">{m.name}</h3>
                    <p className={dark ? "text-paper/70" : "text-muted"}>{m.role}</p>
                  </div>
                  {(m.socials?.length ?? 0) > 0 && (
                    <a
                      href={m.socials![0]!.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${m.name} on ${m.socials![0]!.platform}`}
                      className="inline-flex size-10 shrink-0 items-center justify-center rounded-pill border border-line-strong hover:bg-ink hover:text-paper"
                    >
                      <ArrowUpRightIcon size={18} />
                    </a>
                  )}
                </div>
                {m.bio && (
                  <p className={cn("text-small", dark ? "text-paper/70" : "text-ink-2")}>{m.bio}</p>
                )}
              </RevealItem>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
