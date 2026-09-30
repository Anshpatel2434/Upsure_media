import Image from "next/image";

import type { BlockProps } from "@/components/blocks/render-blocks";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Marquee } from "@/components/ui/marquee";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";
import { imageProps } from "@/lib/media";
import { getClients } from "@/lib/queries";

/**
 * Client logos as a full-width white band: large, full-strength logos with
 * generous spacing drifting past slowly. The heading is kept for screen
 * readers; an optional statement and link can follow underneath.
 */
export async function LogoTickerBlock({ block }: BlockProps<"logoTicker">) {
  const clients = await getClients();
  if (!clients.length) return null;
  const dark = block.tone === "teal-ink" || block.tone === "teal";

  return (
    <section
      className={cn("relative isolate", dark ? "bg-teal-ink text-paper" : "bg-white text-ink")}
    >
      {block.heading && <h2 className="sr-only">{block.heading}</h2>}
      <Marquee
        label="Client logos"
        duration={Math.max(40, clients.length * 3.5)}
        gap="clamp(3.5rem, 8vw, 8.5rem)"
        className="py-10 md:py-12 xl:py-[55px]"
      >
        {clients.map((c) => {
          const logo = imageProps(c.logo, "thumbnail");
          return (
            <span key={c.id} className="flex h-12 shrink-0 items-center md:h-16" title={c.name}>
              {logo ? (
                <Image
                  src={logo.src}
                  alt={c.name}
                  width={logo.width}
                  height={logo.height}
                  unoptimized={logo.src.endsWith(".svg")}
                  className={cn("h-8 w-auto md:h-11 xl:h-12", dark && "invert")}
                />
              ) : (
                <span className="text-h3 font-semibold">{c.name}</span>
              )}
            </span>
          );
        })}
      </Marquee>
      {(block.statement || block.cta?.href) && (
        <Reveal self={false}>
          <Container className="grid gap-6 pb-12 lg:grid-cols-12">
            {block.statement && (
              <RevealItem index={0} className="lg:col-span-7 lg:col-start-3">
                <p className="text-h3 font-medium text-balance">{block.statement}</p>
              </RevealItem>
            )}
            {block.cta?.href && block.cta.label && (
              <RevealItem index={1} className="lg:col-span-3 lg:self-end lg:justify-self-end">
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
        </Reveal>
      )}
    </section>
  );
}
