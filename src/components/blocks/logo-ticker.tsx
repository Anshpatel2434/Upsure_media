import Image from "next/image";
import type { CSSProperties } from "react";

import type { BlockProps } from "@/components/blocks/render-blocks";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Marquee } from "@/components/ui/marquee";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";
import { imageProps } from "@/lib/media";
import { getClients } from "@/lib/queries";

type Client = Awaited<ReturnType<typeof getClients>>[number];

/**
 * Optical sizing: give every logo roughly the same visual area, so wide
 * wordmarks render shorter and square marks taller. Returns the desktop
 * height in px; smaller screens scale it down in CSS.
 */
const LOGO_AREA = 3400;
function logoHeight(width: number, height: number): number {
  const aspect = width / height;
  return Math.round(Math.min(54, Math.max(24, Math.sqrt(LOGO_AREA / aspect))));
}

/**
 * Client logos as a full-width white band drifting past slowly. Logos are
 * optically sized and greyscale, taking their brand colour on hover. The
 * heading is kept for screen readers; an optional statement and link can
 * follow underneath.
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
        gap="clamp(3rem, 7vw, 7rem)"
        className="py-7 md:py-12 xl:py-[55px]"
      >
        {clients.map((c) => (
          <span
            key={c.id}
            className="group/logo flex h-12 shrink-0 items-center md:h-16"
            title={c.name}
          >
            <LogoMark client={c} dark={dark} />
          </span>
        ))}
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

/** One logo, optically sized, greyscale until hovered (hover lives on the parent group). */
function LogoMark({ client, dark }: { client: Client; dark: boolean }) {
  const logo = imageProps(client.logo, "thumbnail");
  if (!logo) return <span className="text-body font-semibold">{client.name}</span>;
  return (
    <Image
      src={logo.src}
      alt={client.name}
      width={logo.width}
      height={logo.height}
      sizes="200px"
      style={{ "--logo-h": logoHeight(logo.width, logo.height) } as CSSProperties}
      className={cn(
        "h-[calc(var(--logo-h)*0.85px)] w-auto md:h-[calc(var(--logo-h)*1px)]",
        "opacity-85 brightness-[0.55] contrast-125 grayscale transition-[filter,opacity] duration-(--duration-base) ease-(--ease-smooth) group-hover/logo:opacity-100 group-hover/logo:brightness-100 group-hover/logo:contrast-100 group-hover/logo:grayscale-0",
        dark && "brightness-0 invert",
      )}
    />
  );
}
