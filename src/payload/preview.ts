/**
 * Builds the URL the admin panel opens for Live Preview / "Preview" buttons.
 * The route enables Next draft mode (after checking the secret and the admin
 * session) and redirects to `/preview<path>`, which renders draft content.
 */
export function previewUrl(path: string): string {
  const params = new URLSearchParams({
    path,
    secret: process.env.PREVIEW_SECRET ?? "",
  });
  return `/next/preview?${params.toString()}`;
}
