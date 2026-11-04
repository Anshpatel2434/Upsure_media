import { ImageResponse } from "next/og";

import { markSvg, svgDataUri } from "@/lib/brand-mark";

/**
 * The site icon: the supplied "u." mark in white on near-black. Shared by
 * app/icon, app/apple-icon and the manifest icons, so the tab, the Android
 * home screen and iOS all show the same artwork as the wordmark in the
 * header.
 *
 * The mark is embedded as an <img> rather than as SVG nodes because satori
 * rasterises an embedded SVG image far more predictably than raw paths.
 */
export async function brandIcon(
  size: number,
  { rounded = false, padding = 0 }: { rounded?: boolean; padding?: number } = {},
) {
  const inner = size - padding * 2;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b0d10",
        borderRadius: rounded ? size * 0.22 : 0,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={svgDataUri(markSvg("#ffffff"))}
        alt=""
        width={Math.round(inner * 0.66)}
        height={Math.round(inner * 0.66)}
      />
    </div>,
    { width: size, height: size },
  );
}
