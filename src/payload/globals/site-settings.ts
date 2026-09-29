import type { GlobalConfig } from "payload";

import { anyone, authenticated } from "@/payload/access";
import { revalidateGlobal } from "@/payload/hooks/revalidate";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site settings",
  admin: {
    group: "Settings",
    description: "Contact details, socials and defaults used everywhere.",
  },
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Studio",
          fields: [
            { name: "name", type: "text", required: true, defaultValue: "Upsure" },
            { name: "tagline", type: "text", defaultValue: "We design brands people love" },
            { name: "email", type: "email", required: true },
            {
              name: "phone",
              type: "text",
              admin: { description: "[PLACEHOLDER] until the real number is supplied." },
            },
            {
              name: "phoneHref",
              type: "text",
              admin: { description: "tel: link, digits only e.g. +919876543210" },
            },
            { name: "addressLine1", type: "text" },
            { name: "addressLine2", type: "text" },
            { name: "city", type: "text", defaultValue: "Ahmedabad, India" },
            { name: "hours", type: "text", defaultValue: "Mon – Fri, 10:00 – 18:00 IST" },
            { name: "mapUrl", type: "text" },
          ],
        },
        {
          label: "Social",
          fields: [
            {
              name: "socials",
              type: "array",
              maxRows: 6,
              fields: [
                {
                  name: "platform",
                  type: "select",
                  required: true,
                  options: ["Instagram", "LinkedIn", "X", "YouTube", "Behance", "Dribbble"],
                },
                { name: "url", type: "text", required: true },
              ],
            },
          ],
        },
        {
          label: "Proof",
          fields: [
            {
              name: "stats",
              type: "array",
              maxRows: 4,
              admin: { description: "Headline numbers reused across the site." },
              fields: [
                { name: "value", type: "number", required: true },
                { name: "suffix", type: "text" },
                { name: "label", type: "text", required: true },
              ],
            },
            {
              name: "badges",
              type: "array",
              maxRows: 4,
              admin: { description: "Trust badges shown as stickers in heroes, e.g. “Est. 20XX”." },
              fields: [{ name: "text", type: "text", required: true }],
            },
          ],
        },
        {
          label: "SEO defaults",
          fields: [
            {
              name: "defaultTitle",
              type: "text",
              defaultValue: "Upsure – Creative & growth agency in Ahmedabad",
            },
            { name: "defaultDescription", type: "textarea" },
            { name: "defaultImage", type: "upload", relationTo: "media" },
            {
              name: "analyticsId",
              type: "text",
              admin: { description: "Reserved for later. Leave empty." },
            },
          ],
        },
        {
          label: "Legal",
          fields: [
            { name: "legalName", type: "text", defaultValue: "Upsure" },
            {
              name: "registrationNumbers",
              type: "text",
              admin: { description: "e.g. GSTIN / CIN. [PLACEHOLDER]" },
            },
          ],
        },
      ],
    },
  ],
};
