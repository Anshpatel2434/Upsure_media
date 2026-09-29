import type { CollectionConfig } from "payload";

import { authenticated, authenticatedOrPublished } from "@/payload/access";
import { contentBlocks } from "@/payload/blocks";
import { placeholderField } from "@/payload/fields/placeholder";
import { seoTab } from "@/payload/fields/seo";
import { slugField } from "@/payload/fields/slug";
import { revalidateCollection } from "@/payload/hooks/revalidate";
import { previewUrl } from "@/payload/preview";

const revalidate = revalidateCollection("/services");

export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "title",
    group: "Site",
    defaultColumns: ["title", "slug", "order", "_status"],
    livePreview: { url: ({ data }) => previewUrl(`/services/${data?.slug ?? ""}`) },
    preview: (data) => previewUrl(`/services/${(data as { slug?: string })?.slug ?? ""}`),
  },
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: { afterChange: [revalidate.afterChange], afterDelete: [revalidate.afterDelete] },
  versions: { drafts: { autosave: { interval: 300 }, schedulePublish: true }, maxPerDoc: 30 },
  defaultSort: "order",
  fields: [
    { name: "title", type: "text", required: true },
    {
      type: "tabs",
      tabs: [
        {
          label: "Card",
          description: "How this service appears in grids on Home and Services.",
          fields: [
            {
              name: "tags",
              type: "array",
              maxRows: 3,
              fields: [{ name: "label", type: "text", required: true }],
            },
            { name: "blurb", type: "textarea", required: true },
            { name: "cardImage", type: "upload", relationTo: "media" },
          ],
        },
        {
          label: "Page",
          fields: [
            {
              name: "eyebrow",
              type: "text",
              admin: { description: "e.g. “Branding agency in Ahmedabad”." },
            },
            {
              name: "heading",
              type: "text",
              required: true,
              admin: { description: "Page H1. Wrap words in [[double brackets]] to highlight." },
            },
            { name: "lead", type: "textarea" },
            {
              name: "subServices",
              type: "array",
              maxRows: 8,
              admin: { description: "Pills under the heading, e.g. Brand strategy · Identity." },
              fields: [{ name: "label", type: "text", required: true }],
            },
            { name: "heroImage", type: "upload", relationTo: "media" },
            {
              name: "checklistHeading",
              type: "text",
              admin: { description: "e.g. “We build brands to perform”." },
            },
            { name: "checklistIntro", type: "textarea" },
            {
              name: "checklist",
              type: "array",
              maxRows: 8,
              fields: [{ name: "item", type: "text", required: true }],
            },
            {
              name: "form",
              type: "relationship",
              relationTo: "forms",
              admin: { description: "Inline consultation form shown in the hero." },
            },
            {
              name: "body",
              type: "blocks",
              blocks: contentBlocks,
              admin: { initCollapsed: true, description: "Extra sections below the checklist." },
            },
            {
              name: "relatedWork",
              type: "relationship",
              relationTo: "case-studies",
              hasMany: true,
              admin: { description: "Leave empty to show case studies tagged with this service." },
            },
          ],
        },
        seoTab,
      ],
    },
    slugField(),
    placeholderField,
    { name: "order", type: "number", defaultValue: 100, admin: { position: "sidebar" } },
    {
      name: "icon",
      type: "select",
      admin: { position: "sidebar" },
      options: ["brand", "design", "growth", "social", "ai", "consulting"],
    },
  ],
};
