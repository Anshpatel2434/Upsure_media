import type { CollectionConfig } from "payload";

import { authenticated } from "@/payload/access";

/** "The Upshot" subscribers. Created by the public subscribe form via a server action. */
export const NewsletterSubscribers: CollectionConfig = {
  slug: "newsletter-subscribers",
  admin: {
    useAsTitle: "email",
    group: "Inbox",
    defaultColumns: ["email", "source", "createdAt"],
    description: "People who subscribed to The Upshot. Export as CSV for your email tool.",
  },
  access: {
    read: authenticated,
    create: () => false,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: "email", type: "email", required: true, unique: true, index: true },
    { name: "source", type: "text", admin: { description: "Page the form was submitted from." } },
    { name: "confirmed", type: "checkbox", defaultValue: true },
  ],
};
