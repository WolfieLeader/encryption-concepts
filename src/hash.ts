import { createHash } from "crypto";

/** Hash a string using SHA256 */
export function hashIt(data: string): string {
  return createHash("sha256").update(data).digest("hex");
}
