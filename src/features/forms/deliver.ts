import type { Notification } from "@/lib/email";

/** Action state that may ask the browser to deliver the submission. */
export type DeliverableState = {
  status: "idle" | "success" | "error" | "deliver";
  message?: string;
  deliver?: Notification;
};

const FAILED = "Something went wrong. Please email us instead.";

/** Posts a notification to Web3Forms from the browser (its free plan requires this). */
async function sendViaWeb3Forms({ subject, fields, replyTo }: Notification): Promise<boolean> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) return false;
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject,
        from_name: "Upsure website",
        ...(replyTo ? { replyto: replyTo } : {}),
        ...Object.fromEntries(fields),
      }),
    });
    const json = (await res.json().catch(() => ({}))) as { success?: boolean };
    return res.ok && json.success === true;
  } catch {
    return false;
  }
}

/**
 * Wraps a server action so that, when the server validated a submission and
 * asked for browser delivery, the client posts it to Web3Forms before the
 * form shows success. Errors and server-side deliveries pass straight through.
 */
export function withBrowserDelivery<S extends DeliverableState>(
  action: (prev: S, formData: FormData) => Promise<S>,
) {
  return async (prev: S, formData: FormData): Promise<S> => {
    const state = await action(prev, formData);
    if (state.status !== "deliver" || !state.deliver) return state;
    const ok = await sendViaWeb3Forms(state.deliver);
    return ok
      ? { ...state, status: "success", deliver: undefined }
      : { ...state, status: "error", message: FAILED, deliver: undefined };
  };
}
