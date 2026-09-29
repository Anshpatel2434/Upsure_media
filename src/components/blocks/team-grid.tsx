import { BlockImage } from "@/components/blocks/block-image";
import type { BlockProps } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { Container } from "@/components/ui/container";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { Sticker } from "@/components/ui/sticker";
import { getTeam } from "@/lib/cms/queries";
import { cn } from "@/lib/cn";

export async function TeamGridBlock({ block, index }: BlockProps<"teamGrid">) {
  const members = await getTeam(block.members);
  if (!members.length) return null;
  const tone = block.tone ?? "paper";
  const dark = tone === "teal-ink" || tone === "teal";

  return (
    <Section tone={tone}>
      <Container className="flex flex-col gap-12">
        <SectionHeader
          index={index}
          eyebrow={block.eyebrow}
          heading={block.heading}
          intro={block.intro}
          tone={dark ? "paper" : "ink"}
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m, i) => (
            <li key={m.id} className="flex flex-col gap-4">
              <div className="relative">
                <BlockImage
                  media={m.photo}
                  size="card"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  aspect="aspect-[4/5]"
                  className="rounded-xl"
                />
                {m.founder && (
                  <Sticker tone="sun" rotate={i % 2 ? 4 : -4} className="absolute top-4 left-4">
                    Founder
                  </Sticker>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-h3">{m.name}</h3>
                <p className={dark ? "text-paper/70" : "text-muted"}>{m.role}</p>
                {m.bio && (
                  <p className={cn("mt-2 text-small", dark ? "text-paper/70" : "text-ink-2")}>
                    {m.bio}
                  </p>
                )}
                {(m.socials?.length ?? 0) > 0 && (
                  <ul className="mt-2 flex flex-wrap gap-3 text-small">
                    {m.socials!.map((s) => (
                      <li key={s.id ?? s.url}>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
                        >
                          {s.platform}
                          <ArrowUpRightIcon size={14} />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
