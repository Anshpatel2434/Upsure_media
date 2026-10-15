import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

/**
 * The site icon: a white "u" with the brand's yellow full stop on near-black,
 * echoing the "upsure." wordmark (and the previous site's white-"u" icon).
 * Shared by app/icon, app/apple-icon and the manifest icons.
 */
export async function brandIcon(
  size: number,
  { rounded = false, padding = 0 }: { rounded?: boolean; padding?: number } = {},
) {
  const font = await readFile(join(process.cwd(), "src/assets/fonts/instrument-sans-600.woff"));
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
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          // Optically centre the "u" + dot pair (the dot adds visual weight right).
          marginLeft: -inner * 0.04,
          marginTop: -inner * 0.16,
        }}
      >
        <span
          style={{
            fontFamily: "Instrument Sans",
            fontWeight: 600,
            fontSize: inner * 0.82,
            lineHeight: 1,
            letterSpacing: -inner * 0.02,
            color: "#ffffff",
          }}
        >
          u
        </span>
        <div
          style={{
            width: inner * 0.15,
            height: inner * 0.15,
            borderRadius: 9999,
            background: "#ffd166",
            marginLeft: inner * 0.02,
            marginBottom: inner * 0.115,
          }}
        />
      </div>
    </div>,
    {
      width: size,
      height: size,
      fonts: [{ name: "Instrument Sans", data: font, weight: 600, style: "normal" }],
    },
  );
}
