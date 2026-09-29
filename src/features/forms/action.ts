"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { getCms } from "@/lib/cms/client";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
};

/* Simple in-memory rate limit: 5 submissions per IP per 10 minutes. */
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured (dev): honeypot + rate limit only
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ secret, response: token, remoteip: ip }),
    });
    const json = (await res.json()) as { success?: boolean };
    return Boolean(json.success);
  } catch {
    return false;
  }
}

/**
 * Generic submit for any Form Builder form. Validates required fields against
 * the form definition in the CMS, stores the submission, and lets the plugin
 * send its configured emails.
 */
export async function submitForm(_prev: FormState, formData: FormData): Promise<FormState> {
  const cms = await getCms();
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";

  const formId = String(formData.get("__form") ?? "");
  if (!formId) return { status: "error", message: "Form not found." };
  if (String(formData.get("website") ?? "")) return { status: "success", message: "Thanks!" }; // honeypot
  if (rateLimited(ip))
    return { status: "error", message: "Too many submissions. Please try again later." };
  if (!(await verifyTurnstile(String(formData.get("cf-turnstile-response") ?? ""), ip))) {
    return { status: "error", message: "Spam check failed. Please try again." };
  }

  const form = await cms.findByID({ collection: "forms", id: formId, depth: 0 }).catch(() => null);
  if (!form) return { status: "error", message: "Form not found." };

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

  try {
    await cms.create({
      collection: "form-submissions",
      data: {
        form: form.id,
        submissionData: Object.entries(parsed.data)
          .filter(([, v]) => v !== undefined && v !== "")
          .map(([field, value]) => ({ field, value: String(value) })),
      },
      overrideAccess: true,
    });
  } catch (error) {
    cms.logger.error({ err: error }, "Form submission failed");
    return { status: "error", message: "Something went wrong. Please email us instead." };
  }

  const confirmation =
    form.confirmationType === "message" && form.confirmationMessage
      ? extractText(form.confirmationMessage)
      : "Thanks — we'll be in touch within one business day.";
  return { status: "success", message: confirmation };
}

function extractText(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const n = node as { text?: string; children?: unknown[]; root?: unknown };
  if (n.root) return extractText(n.root);
  if (typeof n.text === "string") return n.text;
  return (n.children ?? []).map(extractText).join(" ").replace(/\s+/g, " ").trim();
}
