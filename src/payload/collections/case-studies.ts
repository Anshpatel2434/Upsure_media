import type { CollectionConfig } from "payload";

import { authenticated, authenticatedOrPublished } from "@/payload/access";
import { contentBlocks } from "@/payload/blocks";
import { placeholderField } from "@/payload/fields/placeholder";
import { seoTab } from "@/payload/fields/seo";
import { slugField } from "@/payload/fields/slug";
import { revalidateCollection } from "@/payload/hooks/revalidate";
import { previewUrl } from "@/payload/preview";

const revalidate = revalidateCollection("/work");

export const CaseStudies: CollectionConfig = {
  slug: "case-studies",
  labels: { singular: "Case study", plural: "Case studies" },
  admin: {
    useAsTitle: "title",
    group: "Site",
    defaultColumns: ["title", "client", "services", "_status", "publishedAt"],
    livePreview: { url: ({ data }) => previewUrl(`/work/${data?.slug ?? ""}`) },
    preview: (data) => previewUrl(`/work/${(data as { slug?: string })?.slug ?? ""}`),
  },
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: { afterChange: [revalidate.afterChange], afterDelete: [revalidate.afterDelete] },
  versions: { drafts: { autosave: { interval: 300 }, schedulePublish: true }, maxPerDoc: 30 },
  defaultSort: "-publishedAt",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      admin: { description: "Usually the client name." },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Overview",
          fields: [
            { name: "client", type: "text", required: true },
            { name: "industry", type: "text" },
            {
              name: "services",
              type: "relationship",
              relationTo: "services",
              hasMany: true,
              required: true,
            },
            {
              name: "summary",
              type: "textarea",
              required: true,
              admin: { description: "Card blurb, 1–2 sentences." },
            },
            { name: "cover", type: "upload", relationTo: "media" },
            {
              name: "stats",
              type: "array",
              maxRows: 4,
              admin: { description: "Headline results, e.g. 400% / Organic traffic increase." },
              fields: [
                { name: "value", type: "text", required: true },
                { name: "label", type: "text", required: true },
              ],
            },
          ],
        },
        {
          label: "Story",
          fields: [
            {
              name: "intro",
              type: "textarea",
              admin: { description: "Opening paragraph under the title." },
            },
            {
              name: "objective",
              type: "textarea",
              admin: {
                description: "The brief. Wrap phrases in [[double brackets]] to emphasise.",
              },
            },
            {
              name: "sections",
              type: "array",
              maxRows: 6,
              fields: [
                { name: "eyebrow", type: "text" },
                { name: "heading", type: "text", required: true },
                { name: "body", type: "textarea", required: true },
                { name: "image", type: "upload", relationTo: "media" },
              ],
            },
            {
              name: "beforeAfter",
              type: "group",
              admin: { description: "Optional before/after image slider." },
              fields: [
                { name: "before", type: "upload", relationTo: "media" },
                { name: "after", type: "upload", relationTo: "media" },
                { name: "caption", type: "text" },
              ],
            },
            {
              name: "timeline",
              type: "array",
              maxRows: 6,
              admin: { description: "Outcome timeline, e.g. Week 0 → Launch → +90 days." },
              fields: [
                { name: "when", type: "text", required: true },
                { name: "what", type: "text", required: true },
              ],
            },
            {
              name: "video",
              type: "group",
              fields: [
                {
                  name: "file",
                  type: "upload",
                  relationTo: "media",
                  admin: { description: "MP4/WebM upload." },
                },
                { name: "url", type: "text", admin: { description: "Or a YouTube/Vimeo URL." } },
                { name: "poster", type: "upload", relationTo: "media" },
              ],
            },
            {
              name: "testimonial",
              type: "relationship",
              relationTo: "testimonials",
            },
            {
              name: "body",
              type: "blocks",
              blocks: contentBlocks,
              admin: { initCollapsed: true, description: "Extra sections." },
            },
          ],
        },
        seoTab,
      ],
    },
    slugField(),
    placeholderField,
    { name: "publishedAt", type: "date", admin: { position: "sidebar" } },
    { name: "featured", type: "checkbox", defaultValue: false, admin: { position: "sidebar" } },
  ],
};
