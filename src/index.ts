import { colors, log } from "./colorsForConsole";
import promptSync from "prompt-sync";
const prompt = promptSync();

log("💰🔐Crypto Concepts🔐💰", colors.fg.yellow);
log("1-Hash\n 2-Salt\n 3-Hmac\n 4-Symmetric Encryption\n 5-Asymmetric Encryption\n 6-Signature", colors.fg.green);
const userInput = prompt("Enter number between 1 to 6:");
/**--------------------------------------------------------------------------*/

import { hashIt } from "./hash";
if (userInput === "1") {
  log("Hashing", colors.fg.red);
  const wallet = "Hello World";
  log(`"${wallet}" has been hashed to: "${hashIt(wallet)}"`);
}

/**--------------------------------------------------------------------------*/

import { compareSalt, saltIt } from "./salt";

if (userInput === "2") {
  log("Salting", colors.fg.red);
  const password = "password";
  const password2 = "ps1234";
  log(`"${password}" has been salted to: "${saltIt(password)}"`);
  log(`"${password2}" is compared to "${password}", results: "${compareSalt(saltIt(password), password2)}"`);
  log(`"${password}" is compared to "${password}", results: "${compareSalt(saltIt(password), password)}"`);
}
/**--------------------------------------------------------------------------*/

import { hmacIt } from "./hmac";

if (userInput === "3") {
  log("Hmac", colors.fg.red);
  const key = "secret";
  const message = "Hello World";
  log(`"${message}" has been hmac with the key "${key}" to: "${hmacIt(message, key)}"`);
}

/**--------------------------------------------------------------------------*/
import { symmetricEncrypt2, symmetricDecrypt2 } from "./symmetric-encryption";

if (userInput === "4") {
  log("Symmetric Encryption", colors.fg.red);
  const message = "Hello World";
  const encrypted = symmetricEncrypt2(message);
  const decrypted = symmetricDecrypt2(encrypted);
  log(`"${message}" has been encrypted to: "${encrypted}"`);
  log(`"${encrypted}" has been decrypted to: "${decrypted}"`);
}

/**--------------------------------------------------------------------------*/
import { getKeyPair } from "./keypair";
import { asymmetricEncrypt, asymmetricDecrypt } from "./asymmetric-encryption";

if (userInput === "5") {
  log("Asymmetric Encryption", colors.fg.red);

  const keyPair = getKeyPair();
  log(`Public Key: "${keyPair.publicKey}"`);
  log(`Private Key: "${keyPair.privateKey}"`);

  const message = "Hello World";
  const encrypted = asymmetricEncrypt(message, keyPair.publicKey);
  const decrypted = asymmetricDecrypt(encrypted, keyPair.privateKey);
  log(`"${message}" has been encrypted to: "${encrypted}"`);
  log(`"${encrypted}" has been decrypted to: "${decrypted}"`);
}

/**--------------------------------------------------------------------------*/

import { signIt, verifyIt } from "./sign";

if (userInput === "6") {
  log("Signing", colors.fg.red);

  const keyPair = getKeyPair();
  log(`Public Key: "${keyPair.publicKey}"`);
  log(`Private Key: "${keyPair.privateKey}"`);

  const message = "Hello World";
  const signature = signIt(message, keyPair.privateKey);
  log(`"${message}" has been signed to: "${signature}"`);
  log(`"${signature}" has been verified to: "${verifyIt(message, signature, keyPair.publicKey)}"`);
}
