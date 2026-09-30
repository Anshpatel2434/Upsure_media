/**
 * Content relations are either a resolved document or a bare id
 * (and `null` when unset). `typeof null === "object"`, so always use this.
 */
export function isDoc<T extends object>(value: T | number | string | null | undefined): value is T {
  return value !== null && value !== undefined && typeof value === "object";
}
