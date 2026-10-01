"use server";

import { z } from "zod";

import { store } from "@/content/store";
import { notify } from "@/lib/email";
import { checkSpam } from "@/lib/spam";

import type { DeliverableState } from "./deliver";

export type FormState = DeliverableState & { errors?: Record<string, string> };

/**
 * Generic submit for every site form. Validates the fields against the form
 * definition in src/content, then emails the submission to the team. Nothing
 * is stored.
 */
export async function submitForm(_prev: FormState, formData: FormData): Promise<FormState> {
  const formKey = String(formData.get("__form") ?? "");
  const form = Object.hasOwn(store.forms, formKey)
    ? store.forms[formKey as keyof typeof store.forms]
    : undefined;
  if (!form) return { status: "error", message: "Form not found." };
  if (String(formData.get("website") ?? "")) return { status: "success", message: "Thanks!" }; // honeypot

  const spam = await checkSpam(formData, "form", 5);
  if (spam) return { status: "error", message: spam };

  // Build a Zod schema from the form definition.
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const field of form.fields ?? []) {
    if (!("name" in field) || !field.name) continue;
    let s: z.ZodTypeAny;
    switch (field.blockType) {
      case "email":
        s = z.string().trim().email("Enter a valid email address");
        break;
      case "number":
        s = z.coerce.number();
        break;
      case "checkbox":
        s = z.coerce.boolean();
        break;
      default:
        s = z.string().trim().max(5000);
    }
    const required = "required" in field && Boolean(field.required);
    shape[field.name] = required
      ? field.blockType === "checkbox"
        ? s.refine((v) => v === true, "Required")
        : (s as z.ZodString).min(1, "Required")
      : s.optional().or(z.literal(""));
  }
  const parsed = z.object(shape).safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "");
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", errors };
  }

  const fields = Object.entries(parsed.data).filter(([, v]) => v !== undefined && v !== "");
  const labelOf = (name: string) => {
    const field = form.fields?.find((f) => "name" in f && f.name === name);
    return (field && "label" in field && field.label) || name;
  };
  const notification = {
    subject: `New ${form.title.toLowerCase()} from the website`,
    fields: fields.map(([name, value]) => [labelOf(name), String(value)] as [string, string]),
    replyTo: typeof parsed.data.email === "string" ? parsed.data.email : undefined,
  };
  const delivery = await notify(notification);
  if (delivery === "failed") {
    return { status: "error", message: "Something went wrong. Please email us instead." };
  }

  const message = form.confirmationMessage ?? "Thanks — we'll be in touch within one business day.";
  return delivery === "browser"
    ? { status: "deliver", message, deliver: notification }
    : { status: "success", message };
}
