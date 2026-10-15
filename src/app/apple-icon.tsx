import { brandIcon } from "@/lib/brand-icon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** iOS home-screen icon. Square: iOS applies its own rounded mask. */
export default function AppleIcon() {
  return brandIcon(180, { padding: 14 });
}
