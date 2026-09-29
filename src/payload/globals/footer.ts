import type { GlobalConfig } from "payload";

import { anyone, authenticated } from "@/payload/access";
import { linkArrayField } from "@/payload/fields/link";
import { revalidateGlobal } from "@/payload/hooks/revalidate";

export const Footer: GlobalConfig = {
  slug: "footer",
  admin: { group: "Settings" },
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      name: "description",
      type: "textarea",
      admin: { description: "Short agency description at the top of the footer." },
    },
    {
      name: "columns",
      type: "array",
      maxRows: 4,
      admin: { initCollapsed: true },
      fields: [
        { name: "heading", type: "text", required: true },
        linkArrayField("links", "Links", 10),
      ],
    },
    {
      name: "newsletter",
      type: "group",
      fields: [
        { name: "heading", type: "text", defaultValue: "Subscribe to The Upshot" },
        {
          name: "text",
          type: "textarea",
          defaultValue:
            "Sharp takes on brand, growth, and applied AI. Sent monthly, from our screen to yours.",
        },
        { name: "placeholder", type: "text", defaultValue: "Enter your email" },
        { name: "buttonLabel", type: "text", defaultValue: "Subscribe" },
      ],
    },
    linkArrayField("legal", "Legal links", 4),
    { name: "copyright", type: "text", defaultValue: "Upsure" },
  ],
};
