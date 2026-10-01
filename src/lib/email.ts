import { CONTACT_EMAIL } from "@/content/data";

/**
 * Sends a plain-text notification email through Resend's HTTP API. Nothing is
 * stored on our side. Without RESEND_API_KEY (local development) the message
 * is written to the server console instead, so forms still work end to end.
 */
export async function sendEmail({
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
    // In production a missing key would silently drop leads, so fail visibly:
    // the form shows its error and asks the visitor to email instead.
    if (process.env.NODE_ENV === "production") {
      console.error(`RESEND_API_KEY is not set; "${subject}" was not delivered.`);
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
