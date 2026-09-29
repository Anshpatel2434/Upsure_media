import type { CollectionConfig } from "payload";

import { anyone, authenticated } from "@/payload/access";
import { placeholderField } from "@/payload/fields/placeholder";
import { revalidateShared } from "@/payload/hooks/revalidate";

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  admin: { useAsTitle: "name", group: "Content", defaultColumns: ["name", "role", "order"] },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: revalidateShared,
  defaultSort: "order",
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", required: true },
    { name: "photo", type: "upload", relationTo: "media" },
    { name: "bio", type: "textarea" },
    {
      name: "socials",
      type: "array",
      maxRows: 4,
      fields: [
        {
          name: "platform",
          type: "select",
          options: ["LinkedIn", "Instagram", "X", "Website"],
          required: true,
        },
        { name: "url", type: "text", required: true },
      ],
    },
    {
      name: "founder",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar", description: "Founders get the spotlight block on Culture." },
    },
    { name: "order", type: "number", defaultValue: 100, admin: { position: "sidebar" } },
    placeholderField,
  ],
};
