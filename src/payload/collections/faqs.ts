import type { CollectionConfig } from "payload";

import { anyone, authenticated } from "@/payload/access";
import { placeholderField } from "@/payload/fields/placeholder";
import { revalidateShared } from "@/payload/hooks/revalidate";

export const Faqs: CollectionConfig = {
  slug: "faqs",
  admin: {
    useAsTitle: "question",
    group: "Content",
    defaultColumns: ["question", "scope", "order"],
    description: "Questions for the FAQ accordions. Scope decides where each one appears.",
  },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: revalidateShared,
  defaultSort: "order",
  fields: [
    { name: "question", type: "text", required: true },
    { name: "answer", type: "textarea", required: true },
    {
      name: "scope",
      type: "select",
      hasMany: true,
      defaultValue: ["services"],
      options: [
        { label: "Home", value: "home" },
        { label: "Services overview", value: "services" },
        { label: "Contact", value: "contact" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "service",
      type: "relationship",
      relationTo: "services",
      admin: { position: "sidebar", description: "Also show on this specific service page." },
    },
    { name: "order", type: "number", defaultValue: 100, admin: { position: "sidebar" } },
    placeholderField,
  ],
};
