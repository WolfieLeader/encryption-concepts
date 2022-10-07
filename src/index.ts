import { log } from "./helpers/console";
import { Colors, Background, Actions } from "./helpers/colors";
import { setTimer } from "./helpers/timer";
import promptSync from "prompt-sync";
import { randomBytes } from "crypto";
const prompt = promptSync();

import { hashIt } from "./functions/hash";
import { compareSalt, saltIt } from "./functions/salt";
import { hmacIt } from "./functions/hmac";
import { symmetricEncrypt, symmetricDecrypt } from "./functions/symmetric-encryption";
import { asymmetricEncrypt, asymmetricDecrypt } from "./functions/asymmetric-encryption";
import { getKeyPair } from "./functions/keypair";
import { signIt, verifyIt } from "./functions/sign";

log("\tWelcome To:", Colors.yellow);
log("🤔🔐Encryption Concepts🔐🤔", Colors.yellow, Actions.bright, Actions.underscore);

const categories = ["Hash", "Salt", "Hmac", "Symmetric Encryption", "Asymmetric Encryption", "Signature"];
const main = async () => {
  while (true) {
    log("Select a category:", Colors.green, Actions.bright);
    categories.forEach((category, index) => log(`${index + 1}-${category}`, Colors.green));
    log("Any other key to exit", Colors.red);
    const userInput = prompt(`Enter number between 1 to ${categories.length}:`);
    switch (userInput) {
      /**--------------------------------------------------------------------------*/
      case "1":
        log("Hashing", Colors.green, Actions.bright);
        const message1 = "CommonPassword";
        log(`"${message1}" has been hashed to: "${hashIt(message1)}"`);
        log(
          "Hashing is great since it is a one-way function, but its flaw is that the same input will always produce the same output. Thus, hackers can use a rainbow table to crack the hash.",
          Colors.yellow,
          Actions.bright
        );
        await setTimer(3000);
        break;
      /**--------------------------------------------------------------------------*/
      case "2":
        log("Salting", Colors.green, Actions.bright);
        const message2A = "password";
        const message2B = "ps1234";
        log(`"${message2A}" has been salted to: "${saltIt(message2A)}"`);
        log(`"${message2B}" is compared to "${message2A}", results: "${compareSalt(saltIt(message2A), message2B)}"`);
        log(`"${message2A}" is compared to "${message2A}", results: "${compareSalt(saltIt(message2A), message2A)}"`);
        log(
          "Just like hashing, salting is a one-way function but adds randomness to the message. For this reason, it's pretty common in databases.",
          Colors.yellow,
          Actions.bright
        );
        await setTimer(3000);
        break;
      /**--------------------------------------------------------------------------*/
      case "3":
        log("Hmac", Colors.green, Actions.bright);
        const message3 = "The quick brown fox jumps over the lazy dog";
        const hmacKey = "OurLittleSecret";
        log(`"${message3}" has been hashed with key "${hmacKey}" to: "${hmacIt(message3, hmacKey)}"`);
        log(
          "Hmac stands for Hash-Based Message Authentication Code. It is a way to authenticate a message by using a secret key. It is similar to hashing but uses a key to produce a unique hash.",
          Colors.yellow,
          Actions.bright
        );
        await setTimer(3000);
        break;
      /**--------------------------------------------------------------------------*/
      case "4":
        log("Symmetric Encryption", Colors.green, Actions.bright);
        const message4 = "I Have A Secret Message For You";
        const symmetricKey = randomBytes(32);
        const symmetricIv = randomBytes(16);
        const encryptedMessage = symmetricEncrypt(message4, symmetricKey, symmetricIv);
        log(`"${message4}" has been encrypted to: "${encryptedMessage}"`);
        log(
          `"${encryptedMessage}" has been decrypted to: "${symmetricDecrypt(
            encryptedMessage,
            symmetricKey,
            symmetricIv
          )}"`
        );
        log(
          "Symmetric encryption uses the same key for both encryption and decryption. This is great for speed, but the key must be shared between the sender and receiver.",
          Colors.yellow,
          Actions.bright
        );
        await setTimer(3000);
        break;
      /**--------------------------------------------------------------------------*/
      case "5":
        log("Asymmetric Encryption", Colors.green, Actions.bright);
        const message5 = "Data from client to server";
        const receiver = getKeyPair();
        const encryptedAsymmetricMessage = asymmetricEncrypt(message5, receiver.publicKey);
        log(
          `"${message5}" has been encrypted to: "${encryptedAsymmetricMessage}" by the sender, using the receiver's public key`
        );
        log(
          `"${encryptedAsymmetricMessage}" has been decrypted to: "${asymmetricDecrypt(
            encryptedAsymmetricMessage,
            receiver.privateKey
          )}" by the receiver, using their private key`
        );
        log(
          "Asymmetric encryption uses a public key for encryption and a private key for decryption.",
          Colors.yellow,
          Actions.bright
        );
        await setTimer(3000);
        break;
      /**--------------------------------------------------------------------------*/
      case "6":
        log("Signature", Colors.green, Actions.bright);
        const message6 = "Blockchain Tech";
        const sender = getKeyPair();
        const signature = signIt(message6, sender.privateKey);
        log(
          `"${message6}" has been signed and its signature is: "${signature}" by the sender, using their private key`
        );
        log(
          `The receiver can verify the signature using the sender's public key: "${verifyIt(
            message6,
            signature,
            sender.publicKey
          )}"`
        );
        log(
          "A signature is a way to verify that a message came from a specific sender. It is done by signing the message with the sender's private key and verifying it with the sender's public key.",
          Colors.yellow,
          Actions.bright
        );
        await setTimer(3000);
        break;

      default:
        log("Bye Bye!", Colors.red);
        process.exit(0);
    }
  }
};

main();
