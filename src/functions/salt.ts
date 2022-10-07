import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

/**The salt is a random string of bytes that is used to make the password harder to guess. */
export function saltIt(data: string): string {
  const salt = randomBytes(32).toString("hex");
  const key = scryptSync(data, salt, 16, { N: 1024 }).toString("hex");
  return salt + ":" + key;
}

/**Compare the salt and the key to make sure the password is correct(and makes it time safe)*/
export function compareSalt(salted: string, data: string): boolean {
  const [salt, key] = salted.split(":");
  const keyBuffered = Buffer.from(key, "hex");

  const dataBuffered = scryptSync(data, salt, 16, { N: 1024 });
  return timingSafeEqual(dataBuffered, keyBuffered);
}
