"use client";

import { RefreshRouteOnSave } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";

/** Inside the admin Live Preview iframe: re-renders the route whenever the editor saves. */
export function LivePreviewListener({ serverURL }: { serverURL: string }) {
  const router = useRouter();
  return <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={serverURL} />;
}
