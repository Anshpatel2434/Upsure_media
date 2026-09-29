import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

/** Turns draft mode off and returns the editor to the public version of the page. */
export async function GET(req: NextRequest): Promise<Response> {
  (await draftMode()).disable();
  const to = new URL(req.url).searchParams.get("path") ?? "/";
  redirect(to.startsWith("/") && !to.startsWith("//") ? to : "/");
}
