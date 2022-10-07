import { createCipheriv, randomBytes, createDecipheriv } from "crypto";

/** Symmetric encryption using algorithm AES-256-GCM with key and iv */
export const symmetricEncrypt = (message: string, key: Buffer, iv: Buffer): string => {
  const cipher = createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(message, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

/** Symmetric decryption using algorithm AES-256-GCM with key and iv */
export const symmetricDecrypt = (message: string, key: Buffer, iv: Buffer): string => {
  const decipher = createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(message, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

export const symmetricEncrypt2 = (message: string): string => {
  const key = randomBytes(32);
  const iv = randomBytes(16);
  const cipher = createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(message, "utf8", "hex");
  encrypted += cipher.final("hex");
  return key.toString("base64url") + ":" + iv.toString("base64url") + ":" + encrypted;
};

export const symmetricDecrypt2 = (message: string): string => {
  const [key, iv, encrypted] = message.split(":");
  const decipher = createDecipheriv("aes-256-cbc", Buffer.from(key, "base64url"), Buffer.from(iv, "base64url"));
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
