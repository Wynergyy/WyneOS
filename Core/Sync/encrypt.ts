import crypto from "crypto";

/**
 * Encrypt a sync packet using AES-256-GCM.
 * key: base64 encoded 32-byte key
 */
export function encryptPacket(packet: any, keyBase64: string) {
  const key = Buffer.from(keyBase64, "base64");
  if (key.length !== 32) {
    throw new Error("Encryption key must be 32 bytes (base64-encoded).");
  }

  const iv = crypto.randomBytes(12); // GCM recommended IV length
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  const json = JSON.stringify(packet);
  const encrypted = Buffer.concat([cipher.update(json, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return {
    iv: iv.toString("base64"),
    ciphertext: encrypted.toString("base64"),
    tag: authTag.toString("base64"),
  };
}

/**
 * Decrypt previously encrypted packet.
 */
export function decryptPacket(enc: any, keyBase64: string) {
  const key = Buffer.from(keyBase64, "base64");
  if (key.length !== 32) {
    throw new Error("Encryption key must be 32 bytes (base64-encoded).");
  }

  const iv = Buffer.from(enc.iv, "base64");
  const tag = Buffer.from(enc.tag, "base64");
  const ciphertext = Buffer.from(enc.ciphertext, "base64");

  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);

  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return JSON.parse(decrypted.toString("utf8"));
}
