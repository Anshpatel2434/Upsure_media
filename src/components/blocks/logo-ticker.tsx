import Image from "next/image";

import type { BlockProps } from "@/components/blocks/render-blocks";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Marquee } from "@/components/ui/marquee";
import { Section } from "@/components/ui/section";
import { getClients } from "@/lib/cms/queries";
import { cn } from "@/lib/cn";
import { imageProps } from "@/lib/media";

export async function LogoTickerBlock({ block }: BlockProps<"logoTicker">) {
  const clients = await getClients();
  if (!clients.length) return null;
  const tone = block.tone ?? "paper";
  const dark = tone === "teal-ink" || tone === "teal";

  return (
    <Section tone={tone} padding="tight">
      <Container className="flex flex-col gap-6">
        {block.heading && (
          <p
            className={cn(
              "text-eyebrow font-semibold tracking-(--text-eyebrow--letter-spacing) uppercase",
              dark ? "text-paper/60" : "text-muted",
            )}
          >
            {block.heading}
          </p>
        )}
      </Container>
      <Marquee label="Client logos" duration={Math.max(30, clients.length * 2.5)} className="mt-4">
        {clients.map((c) => {
          const logo = imageProps(c.logo, "thumbnail");
          return (
            <span key={c.id} className="flex h-10 items-center" title={c.name}>
              {logo ? (
                <Image
                  src={logo.src}
                  alt={c.name}
                  width={Math.round((logo.width / logo.height) * 40) || 160}
                  height={40}
                  unoptimized={logo.src.endsWith(".svg")}
                  className={cn("h-8 w-auto object-contain opacity-70", dark && "invert")}
                />
              ) : (
                <span
                  className={cn("text-h3 font-semibold", dark ? "text-paper/70" : "text-muted")}
                >
                  {c.name}
                </span>
              )}
            </span>
          );
        })}
      </Marquee>
      {(block.statement || block.cta?.href) && (
        <Container className="mt-10 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          {block.statement && (
            <p className={cn("max-w-2xl text-lead", dark ? "text-paper/80" : "text-ink-2")}>
              {block.statement}
            </p>
          )}
          {block.cta?.href && block.cta.label && (
            <Button href={block.cta.href} variant="ghost" tone={dark ? "paper" : "ink"} withArrow>
              {block.cta.label}
            </Button>
          )}
        </Container>
      )}
    </Section>
  );
}
