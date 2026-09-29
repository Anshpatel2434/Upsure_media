import sharp from "sharp";

export type Palette = "teal" | "coral" | "sun" | "ink" | "paper";

const palettes: Record<Palette, { a: string; b: string; c: string }> = {
  teal: { a: "#0b7577", b: "#0a1e21", c: "#8fd3d0" },
  coral: { a: "#ff6b4a", b: "#c73f24", c: "#ffd166" },
  sun: { a: "#ffd166", b: "#ff9f43", c: "#faf8f3" },
  ink: { a: "#0a1e21", b: "#2a2e35", c: "#0f8b8d" },
  paper: { a: "#f1eee6", b: "#d8efee", c: "#ffd166" },
};

/** Deterministic pseudo-random from a seed string. */
function rng(seed: string) {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => {
    h += 0x6d2b79f5;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Text-free brand artwork: layered gradient, soft blurred blobs, a faint grid
 * and grain. Used for service tiles, hero chips and social covers.
 */
export async function demoArt(
  seed: string,
  width = 1600,
  height = 1000,
  palette: Palette = "teal",
): Promise<Buffer> {
  const { a, b, c } = palettes[palette];
  const r = rng(seed);
  const blobs = Array.from({ length: 4 }, (_, i) => {
    const cx = Math.round(width * (0.15 + r() * 0.7));
    const cy = Math.round(height * (0.15 + r() * 0.7));
    const rad = Math.round(Math.min(width, height) * (0.22 + r() * 0.28));
    const fill = i % 2 ? c : a;
    return `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="${fill}" fill-opacity="${0.35 + r() * 0.35}" filter="url(#blur)"/>`;
  }).join("");
  const angle = Math.round(r() * 360);
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="g" gradientTransform="rotate(${angle})">
      <stop offset="0" stop-color="${a}"/>
      <stop offset="1" stop-color="${b}"/>
    </linearGradient>
    <filter id="blur"><feGaussianBlur stdDeviation="${Math.round(Math.min(width, height) / 9)}"/></filter>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="table" tableValues="0 0.08"/></feComponentTransfer>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  ${blobs}
  <g stroke="#ffffff" stroke-opacity="0.08" stroke-width="1.5">
    ${Array.from({ length: Math.ceil(width / 140) }, (_, i) => `<line x1="${i * 140}" y1="0" x2="${i * 140}" y2="${height}"/>`).join("")}
    ${Array.from({ length: Math.ceil(height / 140) }, (_, i) => `<line x1="0" y1="${i * 140}" x2="${width}" y2="${i * 140}"/>`).join("")}
  </g>
  <rect width="100%" height="100%" filter="url(#grain)"/>
</svg>`;
  return sharp(Buffer.from(svg)).webp({ quality: 82 }).toBuffer();
}

/**
 * Demo photograph from Lorem Picsum (Unsplash-licensed, free to use), fetched
 * by a fixed seed so re-seeding is deterministic. Falls back to artwork if the
 * network is unavailable.
 */
export async function demoPhoto(
  seed: string,
  width = 1600,
  height = 1000,
  fallback: Palette = "paper",
): Promise<Buffer> {
  try {
    const res = await fetch(
      `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`,
      {
        signal: AbortSignal.timeout(20000),
        redirect: "follow",
      },
    );
    if (!res.ok) throw new Error(`picsum ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    return await sharp(buf)
      .resize(width, height, { fit: "cover" })
      .webp({ quality: 82 })
      .toBuffer();
  } catch (error) {
    console.warn(`  photo ${seed} unavailable (${(error as Error).message}); using artwork`);
    return demoArt(seed, width, height, fallback);
  }
}

/** Demo client wordmark (SVG). Real logos replace these in the admin. */
export function demoLogo(name: string): Buffer {
  const width = Math.max(240, name.length * 34);
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="80" viewBox="0 0 ${width} 80">
  <text x="0" y="56" font-family="Arial, Helvetica, sans-serif" font-size="44" font-weight="800" letter-spacing="-1" fill="#0B0D10">${name.replace(/&/g, "&amp;").toUpperCase()}</text>
</svg>`;
  return Buffer.from(svg);
}
