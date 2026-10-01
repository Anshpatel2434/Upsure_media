"use server";

import { z } from "zod";

import { sendEmail } from "@/lib/email";
import { checkSpam } from "@/lib/spam";

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

  const spam = await checkSpam(formData, "newsletter", 3);
  if (spam) return { status: "error", message: spam };

  const sent = await sendEmail({
    subject: "New newsletter subscriber",
    text: `Email: ${parsed.data.email.toLowerCase()}
Source: ${parsed.data.source ?? "website"}`,
  });
  return sent
    ? { status: "success", message: "You're on the list. Sharp takes, once a month." }
    : { status: "error", message: "Something went wrong. Please try again." };
}
