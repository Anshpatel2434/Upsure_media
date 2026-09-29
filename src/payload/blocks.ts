import type { Block, Field } from "payload";

import { linkArrayField, linkField } from "@/payload/fields/link";

/* ----------------------------------------------------------------------------
   Shared field fragments
   ---------------------------------------------------------------------------- */

const eyebrow: Field = {
  name: "eyebrow",
  type: "text",
  admin: {
    description:
      "Small label above the heading, e.g. “Services”. The number is added automatically.",
  },
};
const heading: Field = { name: "heading", type: "text", required: true };
const intro: Field = { name: "intro", type: "textarea" };
const tone: Field = {
  name: "tone",
  type: "select",
  defaultValue: "paper",
  options: [
    { label: "Paper (light)", value: "paper" },
    { label: "Paper 2 (warm grey)", value: "paper-2" },
    { label: "White", value: "white" },
    { label: "Teal ink (dark)", value: "teal-ink" },
    { label: "Teal", value: "teal" },
  ],
  admin: { description: "Background band colour." },
};

/* ----------------------------------------------------------------------------
   Blocks
   ---------------------------------------------------------------------------- */

export const Hero: Block = {
  slug: "hero",
  labels: { singular: "Hero", plural: "Heroes" },
  fields: [
    {
      name: "variant",
      type: "select",
      defaultValue: "collage",
      options: [
        { label: "Collage (illustrated cards, Home)", value: "collage" },
        { label: "Editorial (big heading + image, listing pages)", value: "editorial" },
        { label: "Photo cards on teal (About)", value: "photo-cards" },
        { label: "Dark (Contact)", value: "dark" },
      ],
    },
    eyebrow,
    {
      name: "heading",
      type: "text",
      required: true,
      admin: { description: "Wrap words in [[double brackets]] to highlight them." },
    },
    { name: "lead", type: "textarea" },
    {
      name: "stickers",
      type: "array",
      maxRows: 3,
      admin: { description: "Rotated labels next to the heading, e.g. “Est. 20XX”." },
      fields: [
        { name: "text", type: "text", required: true },
        {
          name: "tone",
          type: "select",
          defaultValue: "sun",
          options: ["sun", "coral", "teal", "ink"],
        },
      ],
    },
    linkArrayField("ctas", "Buttons", 2),
    {
      name: "images",
      type: "array",
      maxRows: 8,
      admin: {
        description:
          "Collage / photo-card images. The first one is the main image on editorial heroes.",
      },
      fields: [{ name: "image", type: "upload", relationTo: "media", required: true }],
    },
    {
      name: "showContact",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Show email and phone from Site Settings under the lead text." },
    },
  ],
};

export const Statement: Block = {
  slug: "statement",
  labels: { singular: "Statement", plural: "Statements" },
  fields: [
    eyebrow,
    {
      name: "text",
      type: "textarea",
      required: true,
      admin: {
        description: "One big paragraph. Wrap phrases in [[double brackets]] to emphasise.",
      },
    },
    linkField("cta", { required: false } as Partial<Field>),
    tone,
  ],
};

export const Stats: Block = {
  slug: "stats",
  labels: { singular: "Stats row", plural: "Stats rows" },
  fields: [
    eyebrow,
    { name: "heading", type: "text" },
    {
      name: "items",
      type: "array",
      minRows: 2,
      maxRows: 4,
      fields: [
        { name: "value", type: "number", required: true },
        { name: "suffix", type: "text", admin: { description: "e.g. + or %" } },
        { name: "label", type: "text", required: true },
      ],
    },
    tone,
  ],
};

export const LogoTicker: Block = {
  slug: "logoTicker",
  labels: { singular: "Client logo ticker", plural: "Client logo tickers" },
  fields: [
    { name: "heading", type: "text", defaultValue: "Trusted by India's leading brands" },
    { name: "statement", type: "textarea" },
    linkField("cta", { required: false } as Partial<Field>),
    tone,
  ],
};

export const ProofTicker: Block = {
  slug: "proofTicker",
  labels: { singular: "Proof ticker", plural: "Proof tickers" },
  fields: [
    {
      name: "items",
      type: "array",
      minRows: 3,
      fields: [{ name: "text", type: "text", required: true }],
    },
    { name: "heading", type: "text" },
    linkField("cta", { required: false } as Partial<Field>),
  ],
};

export const ServiceGrid: Block = {
  slug: "serviceGrid",
  labels: { singular: "Service grid", plural: "Service grids" },
  fields: [
    eyebrow,
    heading,
    intro,
    {
      name: "services",
      type: "relationship",
      relationTo: "services",
      hasMany: true,
      admin: { description: "Leave empty to show all services in their order." },
    },
    {
      name: "layout",
      type: "select",
      defaultValue: "cards",
      options: [
        { label: "Cards", value: "cards" },
        { label: "Accordion rows", value: "accordion" },
      ],
    },
    tone,
  ],
};

export const WorkGrid: Block = {
  slug: "workGrid",
  labels: { singular: "Case-study grid", plural: "Case-study grids" },
  fields: [
    eyebrow,
    heading,
    intro,
    {
      name: "items",
      type: "relationship",
      relationTo: "case-studies",
      hasMany: true,
      admin: { description: "Leave empty to show the latest." },
    },
    { name: "limit", type: "number", defaultValue: 4 },
    {
      name: "layout",
      type: "select",
      defaultValue: "grid",
      options: ["grid", "carousel"],
    },
    linkField("cta", { required: false } as Partial<Field>),
    { ...tone, defaultValue: "teal-ink" },
  ],
};

export const TestimonialCarousel: Block = {
  slug: "testimonialCarousel",
  labels: { singular: "Testimonial carousel", plural: "Testimonial carousels" },
  fields: [
    eyebrow,
    { name: "heading", type: "text" },
    {
      name: "items",
      type: "relationship",
      relationTo: "testimonials",
      hasMany: true,
      admin: { description: "Leave empty to show featured testimonials." },
    },
    tone,
  ],
};

export const NeedPicker: Block = {
  slug: "needPicker",
  labels: { singular: "Need picker", plural: "Need pickers" },
  fields: [
    eyebrow,
    { name: "heading", type: "text", defaultValue: "How can we help you?" },
    { name: "subheading", type: "text", defaultValue: "Choose what fits your needs" },
    {
      name: "items",
      type: "array",
      minRows: 3,
      maxRows: 10,
      fields: [
        { name: "label", type: "text", required: true },
        {
          name: "service",
          type: "relationship",
          relationTo: "services",
          admin: { description: "Where this need leads. Also pre-fills the brief builder." },
        },
      ],
    },
    tone,
  ],
};

export const Capabilities: Block = {
  slug: "capabilities",
  labels: { singular: "Capabilities cloud", plural: "Capabilities clouds" },
  fields: [
    eyebrow,
    { name: "heading", type: "text", defaultValue: "Capabilities" },
    {
      name: "items",
      type: "array",
      minRows: 3,
      fields: [{ name: "label", type: "text", required: true }],
    },
    tone,
  ],
};

export const ApproachSteps: Block = {
  slug: "approachSteps",
  labels: { singular: "Approach steps", plural: "Approach steps" },
  fields: [
    eyebrow,
    { name: "heading", type: "text", defaultValue: "Our approach" },
    {
      name: "steps",
      type: "array",
      minRows: 2,
      maxRows: 6,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "subtitle", type: "text" },
        { name: "body", type: "textarea", required: true },
        { name: "image", type: "upload", relationTo: "media" },
      ],
    },
    tone,
  ],
};

export const FeatureList: Block = {
  slug: "featureList",
  labels: { singular: "Feature list (why us / values)", plural: "Feature lists" },
  fields: [
    eyebrow,
    { name: "heading", type: "text" },
    { name: "image", type: "upload", relationTo: "media" },
    {
      name: "items",
      type: "array",
      minRows: 2,
      maxRows: 6,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
      ],
    },
    tone,
  ],
};

export const Faq: Block = {
  slug: "faq",
  labels: { singular: "FAQ", plural: "FAQs" },
  fields: [
    eyebrow,
    { name: "heading", type: "text", defaultValue: "Good questions" },
    {
      name: "scope",
      type: "select",
      defaultValue: "services",
      options: [
        { label: "Home", value: "home" },
        { label: "Services overview", value: "services" },
        { label: "Contact", value: "contact" },
        { label: "Pick manually", value: "custom" },
      ],
    },
    {
      name: "items",
      type: "relationship",
      relationTo: "faqs",
      hasMany: true,
      admin: { condition: (_, siblingData) => siblingData?.scope === "custom" },
    },
    { name: "image", type: "upload", relationTo: "media" },
    tone,
  ],
};

export const TeamGrid: Block = {
  slug: "teamGrid",
  labels: { singular: "Team grid", plural: "Team grids" },
  fields: [
    eyebrow,
    { name: "heading", type: "text" },
    intro,
    {
      name: "members",
      type: "relationship",
      relationTo: "team-members",
      hasMany: true,
      admin: { description: "Leave empty to show everyone." },
    },
    tone,
  ],
};

export const BlogCarousel: Block = {
  slug: "blogCarousel",
  labels: { singular: "Blog carousel", plural: "Blog carousels" },
  fields: [
    eyebrow,
    { name: "heading", type: "text", defaultValue: "What's happening?" },
    { name: "limit", type: "number", defaultValue: 4 },
    { name: "category", type: "relationship", relationTo: "categories" },
    { ...tone, defaultValue: "teal-ink" },
  ],
};

export const LeadForm: Block = {
  slug: "leadForm",
  labels: { singular: "Lead form", plural: "Lead forms" },
  fields: [
    eyebrow,
    { name: "heading", type: "text", required: true },
    intro,
    {
      name: "form",
      type: "relationship",
      relationTo: "forms",
      required: true,
      admin: { description: "Forms are managed under Inbox → Forms." },
    },
    {
      name: "layout",
      type: "select",
      defaultValue: "split",
      options: [
        { label: "Split (copy left, form right)", value: "split" },
        { label: "Stacked", value: "stacked" },
      ],
    },
    tone,
  ],
};

export const MediaBlock: Block = {
  slug: "media",
  labels: { singular: "Media", plural: "Media blocks" },
  fields: [
    { name: "media", type: "upload", relationTo: "media", required: true },
    { name: "poster", type: "upload", relationTo: "media", admin: { description: "For videos." } },
    { name: "caption", type: "text" },
    {
      name: "aspect",
      type: "select",
      defaultValue: "16/9",
      options: ["16/9", "4/3", "1/1", "21/9"],
    },
    tone,
  ],
};

export const RichTextBlock: Block = {
  slug: "richText",
  labels: { singular: "Rich text", plural: "Rich text blocks" },
  fields: [
    { name: "content", type: "richText", required: true },
    {
      name: "width",
      type: "select",
      defaultValue: "narrow",
      options: ["narrow", "default"],
    },
    tone,
  ],
};

export const Cta: Block = {
  slug: "cta",
  labels: { singular: "Call to action", plural: "Calls to action" },
  fields: [
    { name: "heading", type: "text", required: true },
    { name: "text", type: "textarea" },
    linkField("link"),
    { ...tone, defaultValue: "teal" },
  ],
};

export const EngagementModels: Block = {
  slug: "engagementModels",
  labels: { singular: "Engagement models", plural: "Engagement models" },
  fields: [
    eyebrow,
    { name: "heading", type: "text", defaultValue: "How we work together" },
    intro,
    {
      name: "items",
      type: "array",
      minRows: 2,
      maxRows: 4,
      fields: [
        { name: "name", type: "text", required: true },
        { name: "bestFor", type: "text", required: true },
        { name: "length", type: "text" },
        {
          name: "includes",
          type: "array",
          fields: [{ name: "item", type: "text", required: true }],
        },
        { name: "highlight", type: "checkbox", defaultValue: false },
      ],
    },
    tone,
  ],
};

export const Comparison: Block = {
  slug: "comparison",
  labels: { singular: "Comparison table", plural: "Comparison tables" },
  fields: [
    eyebrow,
    { name: "heading", type: "text", defaultValue: "Upsure vs a typical agency" },
    { name: "usLabel", type: "text", defaultValue: "Upsure" },
    { name: "themLabel", type: "text", defaultValue: "Typical agency" },
    {
      name: "rows",
      type: "array",
      minRows: 3,
      fields: [
        { name: "label", type: "text", required: true },
        { name: "us", type: "text", required: true },
        { name: "them", type: "text", required: true },
      ],
    },
    tone,
  ],
};

export const ProcessSteps: Block = {
  slug: "processSteps",
  labels: { singular: "Process steps", plural: "Process steps" },
  fields: [
    eyebrow,
    { name: "heading", type: "text", required: true },
    {
      name: "steps",
      type: "array",
      minRows: 2,
      maxRows: 5,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
        linkField("link", { required: false } as Partial<Field>),
      ],
    },
    tone,
  ],
};

export const Newsletter: Block = {
  slug: "newsletter",
  labels: { singular: "Newsletter band", plural: "Newsletter bands" },
  fields: [
    { name: "eyebrow", type: "text", defaultValue: "The Upshot" },
    { name: "heading", type: "text", required: true },
    { name: "buttonLabel", type: "text", defaultValue: "Subscribe" },
    { ...tone, defaultValue: "teal-ink" },
  ],
};

export const TextColumns: Block = {
  slug: "textColumns",
  labels: { singular: "Text columns", plural: "Text columns" },
  fields: [
    eyebrow,
    {
      name: "columns",
      type: "array",
      minRows: 1,
      maxRows: 3,
      fields: [
        { name: "heading", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
        linkField("link", { required: false } as Partial<Field>),
      ],
    },
    {
      name: "images",
      type: "array",
      maxRows: 3,
      fields: [{ name: "image", type: "upload", relationTo: "media", required: true }],
    },
    tone,
  ],
};

/** Every block a page-builder layout may contain. */
export const pageBlocks: Block[] = [
  Hero,
  Statement,
  Stats,
  LogoTicker,
  ProofTicker,
  ServiceGrid,
  WorkGrid,
  TestimonialCarousel,
  NeedPicker,
  Capabilities,
  ApproachSteps,
  FeatureList,
  Faq,
  TeamGrid,
  BlogCarousel,
  LeadForm,
  EngagementModels,
  Comparison,
  ProcessSteps,
  Newsletter,
  TextColumns,
  MediaBlock,
  RichTextBlock,
  Cta,
];

/** Blocks allowed inside a service or case-study body. */
export const contentBlocks: Block[] = [
  RichTextBlock,
  MediaBlock,
  Stats,
  FeatureList,
  TextColumns,
  TestimonialCarousel,
  Faq,
  LeadForm,
  Cta,
];
