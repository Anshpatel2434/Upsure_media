import type { CollectionConfig } from "payload";

import { anyone, authenticated } from "@/payload/access";
import { revalidateShared } from "@/payload/hooks/revalidate";

export const Authors: CollectionConfig = {
  slug: "authors",
  admin: { useAsTitle: "name", group: "Blog" },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: revalidateShared,
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text" },
    { name: "avatar", type: "upload", relationTo: "media" },
  ],
};
