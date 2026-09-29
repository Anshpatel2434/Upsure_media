import type { CollectionConfig } from "payload";

import { anyone, authenticated } from "@/payload/access";
import { placeholderField } from "@/payload/fields/placeholder";
import { revalidateShared } from "@/payload/hooks/revalidate";

/** Client logos shown in the "Trusted by" marquee. */
export const Clients: CollectionConfig = {
  slug: "clients",
  admin: {
    useAsTitle: "name",
    group: "Content",
    defaultColumns: ["name", "order", "featured"],
    description: "Logos for the client marquee. Lower order = earlier in the ticker.",
  },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: revalidateShared,
  defaultSort: "order",
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      admin: { description: "SVG preferred. Mono/dark version; it is tinted on dark bands." },
    },
    { name: "website", type: "text" },
    { name: "featured", type: "checkbox", defaultValue: true, admin: { position: "sidebar" } },
    { name: "order", type: "number", defaultValue: 100, admin: { position: "sidebar" } },
    placeholderField,
  ],
};
