import sharp from "sharp";

type Palette = "teal" | "coral" | "sun" | "ink" | "paper";

const colours: Record<Palette, { bg: string; fg: string }> = {
  teal: { bg: "#0F8B8D", fg: "#FAF8F3" },
  coral: { bg: "#FF6B4A", fg: "#FAF8F3" },
  sun: { bg: "#FFD166", fg: "#0B0D10" },
  ink: { bg: "#0A1E21", fg: "#FAF8F3" },
  paper: { bg: "#F1EEE6", fg: "#0B0D10" },
};

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Renders a branded placeholder image (label + "PLACEHOLDER" stamp) as WebP.
 * Deterministic, so re-seeding produces identical files.
 */
export async function placeholderImage(
  label: string,
  width = 1600,
  height = 1000,
  palette: Palette = "paper",
): Promise<Buffer> {
  const { bg, fg } = colours[palette];
  const font = Math.round(Math.min(width, height) / 12);
  const small = Math.round(font / 2.2);
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${bg}"/>
  <g stroke="${fg}" stroke-opacity="0.12" stroke-width="2">
    ${Array.from({ length: Math.ceil(width / 120) }, (_, i) => `<line x1="${i * 120}" y1="0" x2="${i * 120}" y2="${height}"/>`).join("")}
    ${Array.from({ length: Math.ceil(height / 120) }, (_, i) => `<line x1="0" y1="${i * 120}" x2="${width}" y2="${i * 120}"/>`).join("")}
  </g>
  <circle cx="${width * 0.78}" cy="${height * 0.3}" r="${Math.min(width, height) * 0.18}" fill="${fg}" fill-opacity="0.08"/>
  <text x="${width * 0.06}" y="${height * 0.5}" font-family="Arial, Helvetica, sans-serif" font-size="${font}" font-weight="700" fill="${fg}">${escape(label)}</text>
  <text x="${width * 0.06}" y="${height * 0.5 + font * 1.1}" font-family="Arial, Helvetica, sans-serif" font-size="${small}" letter-spacing="4" fill="${fg}" fill-opacity="0.7">PLACEHOLDER IMAGE · ${width}×${height}</text>
</svg>`;
  return sharp(Buffer.from(svg)).webp({ quality: 80 }).toBuffer();
}

/** Simple wordmark used as a placeholder client logo (SVG). */
export function placeholderLogo(name: string): Buffer {
  const width = Math.max(240, name.length * 34);
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="80" viewBox="0 0 ${width} 80">
  <text x="0" y="56" font-family="Arial, Helvetica, sans-serif" font-size="44" font-weight="800" letter-spacing="-1" fill="#0B0D10">${escape(name.toUpperCase())}</text>
</svg>`;
  return Buffer.from(svg);
}

/** 1-second silent MP4 is impractical to synthesise here; videos stay as URL placeholders. */
