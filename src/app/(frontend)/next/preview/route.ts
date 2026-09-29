import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { getPayload, type PayloadRequest } from "payload";
import { getSafeRedirect } from "payload/shared";

import config from "@payload-config";

/**
 * Entry point for the admin panel's Live Preview and "Preview" buttons.
 * Checks the shared secret and that the caller is a logged-in admin, turns on
 * Next draft mode and redirects to the `/preview` route space, which renders
 * unpublished content.
 */
export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");
  const secret = searchParams.get("secret");

  if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET) {
    return new Response("Invalid preview secret", { status: 403 });
  }
  if (!path) return new Response("Missing path", { status: 400 });

  const safePath = getSafeRedirect({ fallbackTo: "", redirectTo: path });
  if (!safePath) return new Response("Only relative paths can be previewed", { status: 400 });

  const payload = await getPayload({ config });
  try {
    const { user } = await payload.auth({
      req: req as unknown as PayloadRequest,
      headers: req.headers,
    });
    if (!user) return new Response("Log in to the admin panel to preview", { status: 403 });
  } catch (error) {
    payload.logger.error({ err: error }, "Preview auth failed");
    return new Response("Log in to the admin panel to preview", { status: 403 });
  }

  (await draftMode()).enable();
  redirect(`/preview${safePath === "/" ? "" : safePath}`);
}
