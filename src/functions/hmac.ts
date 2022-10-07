import { createHmac } from "crypto";

/** HMAC stands for Hash-based Message Authentication Code. Using SHA256*/
export function hmacIt(data: string, key: string): string {
  return createHmac("sha256", key).update(data).digest("hex");
}
