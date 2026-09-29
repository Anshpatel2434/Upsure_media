import Image from "next/image";

import type { BlockProps } from "@/components/blocks/render-blocks";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Marquee } from "@/components/ui/marquee";
import { Reveal, RevealItem } from "@/components/ui/reveal";
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
      <Reveal self={false}>
        <Container>
          {block.heading && (
            <RevealItem index={0}>
              <p
                className={cn(
                  "text-eyebrow font-semibold tracking-(--text-eyebrow--letter-spacing) uppercase",
                  dark ? "text-paper/60" : "text-muted",
                )}
              >
                {block.heading}
              </p>
            </RevealItem>
          )}
        </Container>
        <RevealItem index={1} direction="fade">
          <Marquee
            label="Client logos"
            duration={Math.max(30, clients.length * 2.5)}
            className="mt-6"
          >
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
                      className={cn(
                        "h-8 w-auto object-contain opacity-60 transition-opacity duration-(--duration-base) hover:opacity-100",
                        dark && "invert",
                      )}
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
        </RevealItem>
        {(block.statement || block.cta?.href) && (
          <Container className="mt-12 grid gap-6 lg:grid-cols-12">
            {block.statement && (
              <RevealItem index={2} className="lg:col-span-7 lg:col-start-3">
                <p
                  className={cn(
                    "text-h3 font-medium text-balance",
                    dark ? "text-paper/85" : "text-ink",
                  )}
                >
                  {block.statement}
                </p>
              </RevealItem>
            )}
            {block.cta?.href && block.cta.label && (
              <RevealItem index={3} className="lg:col-span-3 lg:self-end lg:justify-self-end">
                <Button
                  href={block.cta.href}
                  variant="ghost"
                  tone={dark ? "paper" : "ink"}
                  withArrow
                >
                  {block.cta.label}
                </Button>
              </RevealItem>
            )}
          </Container>
        )}
      </Reveal>
    </Section>
  );
}
