import { getPayload, type Payload } from "payload";

import config from "@payload-config";

/**
 * Payload Local API client. `getPayload` memoises the instance internally, so
 * calling this in every server component is cheap; the wrapper just keeps the
 * config import in one place.
 */
export function getCms(): Promise<Payload> {
  return getPayload({ config });
}
