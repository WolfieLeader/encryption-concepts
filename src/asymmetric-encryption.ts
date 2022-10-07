import { publicEncrypt, privateDecrypt } from "crypto";

/** Asymmetric encryption using public key*/
export function asymmetricEncrypt(data: string, publicKey: string): string {
  return publicEncrypt(publicKey, Buffer.from(data)).toString("base64");
}

/** Asymmetric decryption using private key*/
export function asymmetricDecrypt(data: string, privateKey: string): string {
  return privateDecrypt(privateKey, Buffer.from(data, "base64")).toString("utf8");
}
