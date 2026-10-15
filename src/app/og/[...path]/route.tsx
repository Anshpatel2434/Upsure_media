import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";
import sharp from "sharp";

import { shareCard, shareCardPaths, type ShareCard } from "@/lib/share-card";

/**
 * Link-preview images (Open Graph / X cards), one 1200×630 PNG per page,
 * rendered at build time. PNG rather than WebP because WhatsApp and LinkedIn
 * do not reliably show WebP previews. Text-only design keeps each file small;
 * WhatsApp drops previews whose image is too heavy.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

const SIZE = { width: 1200, height: 630 };
const C = {
  paper: "#faf8f3",
  ink: "#0b0d10",
  muted: "#5d626b",
  teal: "#0b7577",
  tealSoft: "#d8efee",
  sun: "#ffd166",
  line: "#e6e2d8",
};

export function generateStaticParams() {
  return shareCardPaths().map((path) => ({
    path: (path === "/" ? "index" : path.slice(1))
      .split("/")
      .map((seg, i, all) => (i === all.length - 1 ? `${seg}.png` : seg)),
  }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const joined = path.join("/").replace(/\.png$/, "");
  const card = shareCard(joined === "index" ? "/" : `/${joined}`);
  if (!card) return new Response("Not found", { status: 404 });

  const [medium, semibold, logo] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/fonts/instrument-sans-500.woff")),
    readFile(join(process.cwd(), "src/assets/fonts/instrument-sans-600.woff")),
    card.client ? whiteLogo(card.client.logo) : null,
  ]);

  return new ImageResponse(<Card card={card} logo={logo} />, {
    ...SIZE,
    fonts: [
      { name: "Instrument Sans", data: medium, weight: 500, style: "normal" },
      { name: "Instrument Sans", data: semibold, weight: 600, style: "normal" },
    ],
    headers: { "cache-control": "public, max-age=86400, s-maxage=31536000, immutable" },
  });
}

/** Client logo recoloured white, as a PNG data URL (Satori cannot read WebP). */
async function whiteLogo(slug: string): Promise<{ src: string; width: number; height: number }> {
  const file = join(process.cwd(), "public/images/clients", `${slug}.webp`);
  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) data[i] = data[i + 1] = data[i + 2] = 255;
  const png = await sharp(data, { raw: info }).png().toBuffer();
  return { src: `data:image/png;base64,${png.toString("base64")}`, ...info };
}

function Card({
  card,
  logo,
}: {
  card: ShareCard;
  logo: { src: string; width: number; height: number } | null;
}) {
  const plainLength = card.title.replace(/\[\[|\]\]/g, "").length;
  const titleSize = plainLength > 60 ? 54 : plainLength > 40 ? 60 : plainLength > 22 ? 72 : 84;
  const withPanel = Boolean(card.client && logo);
  // Long titles carry the card on their own; a subtitle would only crowd it.
  const subtitle = plainLength > 40 ? undefined : card.subtitle;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: C.paper,
        fontFamily: "Instrument Sans",
        color: C.ink,
      }}
    >
      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: withPanel ? 760 : "100%",
          padding: "64px 72px",
          position: "relative",
        }}
      >
        {!withPanel && (
          <>
            {/* Brand shapes, kept to the right edge so a square crop stays clean. */}
            <div
              style={{
                position: "absolute",
                right: -110,
                top: -120,
                width: 360,
                height: 360,
                borderRadius: 9999,
                background: C.tealSoft,
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 70,
                top: 150,
                width: 96,
                height: 96,
                borderRadius: 9999,
                background: C.sun,
              }}
            />
          </>
        )}

        <Wordmark />

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            gap: 20,
            padding: "28px 0",
            width: withPanel ? 616 : 880,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: C.teal,
            }}
          >
            {card.eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: titleSize,
              fontWeight: 600,
              lineHeight: 1.04,
              letterSpacing: -2,
            }}
          >
            {splitHighlights(card.title).map((part, i) => (
              <span
                key={i}
                style={{
                  color: part.highlight ? C.teal : C.ink,
                  whiteSpace: "pre-wrap",
                }}
              >
                {part.text}
              </span>
            ))}
          </div>
          {subtitle && (
            <div
              style={{
                display: "flex",
                fontSize: 28,
                fontWeight: 500,
                lineHeight: 1.35,
                color: C.muted,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${C.line}`,
            paddingTop: 22,
            fontSize: 24,
            fontWeight: 500,
            color: C.muted,
          }}
        >
          <span>upsuremedia.com</span>
          <span
            style={{
              display: "flex",
              background: C.sun,
              color: C.ink,
              fontWeight: 600,
              padding: "10px 22px",
              borderRadius: 9999,
            }}
          >
            Start a project →
          </span>
        </div>
      </div>

      {/* Case studies: client logo on its brand colour */}
      {withPanel && logo && (
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: card.client!.colour,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> */}
          <img
            src={logo.src}
            alt=""
            width={Math.min(300, Math.round((logo.width / logo.height) * 120))}
            height={Math.round(
              Math.min(300, Math.round((logo.width / logo.height) * 120)) /
                (logo.width / logo.height),
            )}
          />
        </div>
      )}
    </div>
  );
}

function Wordmark() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        fontSize: 40,
        fontWeight: 600,
        letterSpacing: -1.5,
      }}
    >
      upsure
      <div
        style={{
          width: 11,
          height: 11,
          borderRadius: 9999,
          background: C.teal,
          marginLeft: 2,
          marginBottom: 9,
        }}
      />
    </div>
  );
}

/** "[[love.]]" markers → coloured spans, preserving spaces between words. */
function splitHighlights(title: string): { text: string; highlight: boolean }[] {
  return title
    .split(/(\[\[[^\]]+\]\])/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("[[")
        ? { text: part.slice(2, -2), highlight: true }
        : { text: part, highlight: false },
    );
}
