const { createSign, createVerify } = require("crypto");

export function signIt(data: string, privateKey: string): string {
  return createSign("RSA-SHA256").update(data).sign(privateKey, "hex");
}

export function verifyIt(data: string, signature: string, publicKey: string): boolean {
  return createVerify("RSA-SHA256").update(data).verify(publicKey, signature, "hex");
}
