import type { GlobalConfig } from "payload";

import { anyone, authenticated } from "@/payload/access";
import { linkArrayField } from "@/payload/fields/link";
import { revalidateGlobal } from "@/payload/hooks/revalidate";

export const Header: GlobalConfig = {
  slug: "header",
  admin: {
    group: "Settings",
    description: "Main navigation. Items with children become dropdown menus.",
  },
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      name: "items",
      type: "array",
      maxRows: 7,
      admin: { initCollapsed: true },
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
        {
          name: "children",
          type: "array",
          maxRows: 8,
          admin: { description: "Dropdown entries." },
          fields: [
            { name: "label", type: "text", required: true },
            { name: "href", type: "text", required: true },
            { name: "description", type: "text" },
          ],
        },
      ],
    },
    {
      name: "cta",
      type: "group",
      fields: [
        { name: "label", type: "text", required: true, defaultValue: "Start a project" },
        { name: "href", type: "text", required: true, defaultValue: "/start-a-project" },
      ],
    },
    linkArrayField("secondary", "Secondary links (shown in the mobile drawer)", 4),
  ],
};
