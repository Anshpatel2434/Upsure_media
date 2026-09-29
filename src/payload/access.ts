import type { Access } from "payload";

/** Public read. */
export const anyone: Access = () => true;

/** Any logged-in admin user. Single `admin` role for now (ADR 0001 #8). */
export const authenticated: Access = ({ req: { user } }) => Boolean(user);

/** Logged-in users see everything; the public only sees published docs. */
export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) return true;
  return { _status: { equals: "published" } };
};
