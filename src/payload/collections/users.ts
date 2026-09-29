import type { CollectionConfig } from "payload";

import { authenticated } from "@/payload/access";

export const Users: CollectionConfig = {
  slug: "users",
  admin: { useAsTitle: "email", group: "System" },
  auth: true,
  access: {
    admin: ({ req }) => Boolean(req.user),
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: "name", type: "text", required: true },
    // Single admin role today; a `role` select can be added here later (ADR 0001 #8).
  ],
};
