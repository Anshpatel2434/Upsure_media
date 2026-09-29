import type { CollectionConfig } from "payload";

import { anyone, authenticated } from "@/payload/access";
import { placeholderField } from "@/payload/fields/placeholder";
import { revalidateShared } from "@/payload/hooks/revalidate";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "name",
    group: "Content",
    defaultColumns: ["name", "company", "featured", "updatedAt"],
  },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: revalidateShared,
  fields: [
    { name: "quote", type: "textarea", required: true },
    { name: "name", type: "text", required: true },
    { name: "role", type: "text" },
    { name: "company", type: "text" },
    { name: "avatar", type: "upload", relationTo: "media" },
    { name: "logo", type: "upload", relationTo: "media" },
    {
      name: "service",
      type: "relationship",
      relationTo: "services",
      admin: { position: "sidebar", description: "Shown on this service's page." },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar", description: "Featured quotes appear in the Home carousel." },
    },
    { name: "order", type: "number", defaultValue: 100, admin: { position: "sidebar" } },
    placeholderField,
  ],
};
