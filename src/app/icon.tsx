import { brandIcon } from "@/lib/brand-icon";

export const contentType = "image/png";

/** Browser-tab icon plus the larger sizes the web manifest points at. */
export function generateImageMetadata() {
  return [
    { id: "32", size: { width: 32, height: 32 }, contentType },
    { id: "192", size: { width: 192, height: 192 }, contentType },
    { id: "512", size: { width: 512, height: 512 }, contentType },
  ];
}

export default async function Icon({ id }: { id: Promise<string | number> }) {
  const size = Number(await id);
  // Tab-sized icon gets soft corners; the large ones stay square for Android to mask.
  return brandIcon(size, size <= 64 ? { rounded: true } : { padding: Math.round(size * 0.1) });
}
