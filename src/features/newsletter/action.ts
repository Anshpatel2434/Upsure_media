"use server";

import { z } from "zod";

import { getCms } from "@/lib/cms/client";

export type NewsletterState = { status: "idle" | "success" | "error"; message?: string };

const schema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  source: z.string().max(200).optional(),
  // Honeypot: real users never fill this.
  website: z.string().max(0).optional(),
});

export async function subscribe(
  _prev: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Please check the form.",
    };
  }
  if (parsed.data.website) return { status: "success", message: "You're on the list." }; // silently drop bots

  const cms = await getCms();
  try {
    const existing = await cms.find({
      collection: "newsletter-subscribers",
      where: { email: { equals: parsed.data.email.toLowerCase() } },
      limit: 1,
      depth: 0,
    });
    if (!existing.docs.length) {
      await cms.create({
        collection: "newsletter-subscribers",
        data: {
          email: parsed.data.email.toLowerCase(),
          source: parsed.data.source,
          confirmed: true,
        },
        overrideAccess: true,
      });
    }
    return { status: "success", message: "You're on the list. Sharp takes, once a month." };
  } catch (error) {
    cms.logger.error({ err: error }, "Newsletter subscribe failed");
    return { status: "error", message: "Something went wrong. Please try again." };
  }
}
