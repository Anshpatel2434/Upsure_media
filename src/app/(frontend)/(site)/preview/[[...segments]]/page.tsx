import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { LivePreviewListener } from "@/components/layout/live-preview-listener";
import { resolveRoute } from "@/features/site/resolve";
import { getSiteUrl } from "@/lib/site";

/**
 * Draft preview of any route. Only reachable with Next draft mode on, which
 * /next/preview grants after checking the secret and the admin session.
 * Always dynamic; never indexed.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = { robots: { index: false, follow: false } };

type Props = { params: Promise<{ segments?: string[] }> };

export default async function PreviewPage({ params }: Props) {
  const { isEnabled } = await draftMode();
  const { segments = [] } = await params;
  if (!isEnabled) redirect(`/${segments.join("/")}`);

  const result = await resolveRoute(segments, { draft: true });
  if (!result) notFound();

  return (
    <>
      <div className="sticky top-0 z-50 flex items-center justify-between gap-4 bg-sun px-gutter py-2 text-small text-ink">
        <span>
          <strong>Preview mode</strong> — showing unpublished changes.
        </span>
        <a
          href={`/next/exit-preview?path=/${segments.join("/")}`}
          className="font-medium underline underline-offset-4"
        >
          Exit preview
        </a>
      </div>
      <LivePreviewListener serverURL={getSiteUrl()} />
      {result.node}
    </>
  );
}
