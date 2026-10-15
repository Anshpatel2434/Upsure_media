/** A form submission to forward to the team: labelled fields, no HTML. */
export type Notification = {
  subject: string;
  fields: [label: string, value: string][];
  replyTo?: string;
};

/**
 * How a validated submission is delivered. Web3Forms is the only transport,
 * and its free plan only accepts submissions from the visitor's browser, so
 * "browser" means the server hands the notification back for the client to
 * post (see features/forms/deliver.ts). Without the access key, development
 * prints it to the server console ("logged") and production fails visibly
 * ("failed"), so a lead is never dropped silently. Nothing is stored.
 */
export type DeliveryResult = "browser" | "logged" | "failed";

export async function notify(notification: Notification): Promise<DeliveryResult> {
  if (process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY) return "browser";
  if (process.env.NODE_ENV === "production") {
    console.error(
      `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not set; "${notification.subject}" was not delivered.`,
    );
    return "failed";
  }
  const text = notification.fields.map(([label, value]) => `${label}: ${value}`).join("\n");
  console.warn(`\n[form] ${notification.subject}\n${text}\n`);
  return "logged";
}
