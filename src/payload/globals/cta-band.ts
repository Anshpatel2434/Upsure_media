import type { GlobalConfig } from "payload";

import { anyone, authenticated } from "@/payload/access";
import { linkField } from "@/payload/fields/link";
import { revalidateGlobal } from "@/payload/hooks/revalidate";

/** The "Ready to move forward?" band shown above the footer on most pages. */
export const CtaBand: GlobalConfig = {
  slug: "cta-band",
  label: "CTA band",
  admin: { group: "Settings" },
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      name: "emoji",
      type: "text",
      defaultValue: "👋",
      admin: { description: "Optional emoji above the heading." },
    },
    { name: "heading", type: "text", required: true, defaultValue: "Ready to move forward?" },
    { name: "subheading", type: "text", defaultValue: "Let's work together!" },
    linkField("link"),
  ],
};
