import path from "node:path";
import { fileURLToPath } from "node:url";

import type { CollectionConfig } from "payload";

import { anyone, authenticated } from "@/payload/access";
import { generateBlurDataURL } from "@/payload/hooks/media-blur";

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Images and files. Every upload gets responsive sizes plus an OG crop.
 * In development files live on local disk under ./media (git-ignored); in
 * production the S3 storage adapter takes over (see payload.config.ts).
 */
export const Media: CollectionConfig = {
  slug: "media",
  admin: { group: "Content", description: "Images, logos and videos used across the site." },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: { beforeChange: [generateBlurDataURL] },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description:
          "Describe the image for screen readers and SEO. Use a short empty description like “decorative” only for purely decorative images.",
      },
    },
    {
      name: "blurDataURL",
      type: "text",
      admin: { hidden: true, description: "Generated on upload; used for blur-up placeholders." },
    },
  ],
  upload: {
    staticDir: path.resolve(dirname, "../../../media"),
    mimeTypes: ["image/*", "video/mp4", "video/webm"],
    focalPoint: true,
    adminThumbnail: "thumbnail",
    formatOptions: { format: "webp", options: { quality: 82 } },
    imageSizes: [
      {
        name: "thumbnail",
        width: 320,
        formatOptions: { format: "webp", options: { quality: 70 } },
      },
      { name: "card", width: 720 },
      { name: "medium", width: 1080 },
      { name: "large", width: 1600 },
      { name: "hero", width: 2200 },
      { name: "og", width: 1200, height: 630, crop: "center" },
    ],
  },
};
