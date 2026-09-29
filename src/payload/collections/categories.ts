import type { CollectionConfig } from "payload";

import { anyone, authenticated } from "@/payload/access";
import { slugField } from "@/payload/fields/slug";
import { revalidateShared } from "@/payload/hooks/revalidate";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: { useAsTitle: "title", group: "Blog", defaultColumns: ["title", "slug"] },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: revalidateShared,
  fields: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea" },
    slugField(),
  ],
};
