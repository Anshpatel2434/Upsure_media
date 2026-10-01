import { CONTACT_EMAIL } from "@/content/data";

/** A form submission to forward to the team: labelled fields, no HTML. */
export type Notification = {
  subject: string;
  fields: [label: string, value: string][];
  replyTo?: string;
};

/**
 * Where a notification went. "browser" means Web3Forms is the transport: its
 * free plan only accepts submissions from the visitor's browser, so the
 * server hands the validated notification back for the client to post.
 */
export type DeliveryResult = "sent" | "failed" | "browser";

/**
 * Forwards a validated submission to the team. Resend (server side) when
 * RESEND_API_KEY is set, otherwise Web3Forms (browser side) when its access
 * key is set. Nothing is stored on our side.
 */
export async function notify(notification: Notification): Promise<DeliveryResult> {
  if (!process.env.RESEND_API_KEY && process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY) {
    return "browser";
  }
  const text = notification.fields.map(([label, value]) => `${label}: ${value}`).join("\n");
  const sent = await sendEmail({
    subject: notification.subject,
    text,
    replyTo: notification.replyTo,
  });
  return sent ? "sent" : "failed";
}

/**
 * Sends a plain-text notification email through Resend's HTTP API. Without
 * RESEND_API_KEY (local development) the message is written to the server
 * console instead, so forms still work end to end.
 */
async function sendEmail({
  subject,
  text,
  replyTo,
}: {
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.EMAIL_TO || CONTACT_EMAIL;
  const from = process.env.EMAIL_FROM ?? "Upsure website <onboarding@resend.dev>";

  if (!key) {
    // In production a missing transport would silently drop leads, so fail
    // visibly: the form shows its error and asks the visitor to email instead.
    if (process.env.NODE_ENV === "production") {
      console.error(`No email transport configured; "${subject}" was not delivered.`);
      return false;
    }
    console.warn(`\n[email → ${to}] ${subject}\n${text}\n`);
    return true;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify({ from, to: [to], subject, text, reply_to: replyTo }),
    });
    if (!res.ok) console.error("Email send failed", res.status, await res.text());
    return res.ok;
  } catch (error) {
    console.error("Email send failed", error);
    return false;
  }
}
