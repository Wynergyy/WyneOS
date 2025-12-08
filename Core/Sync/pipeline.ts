import fs from "fs";
import path from "path";
import { readSyncConfig } from "./config";
import { buildSyncPacket } from "./packet";
import { encryptPacket } from "./encrypt";
import { signPacket } from "./sign";

/**
 * Build the full outbound sync package:
 *  - raw packet
 *  - optional encrypted packet
 *  - optional signed packet
 *  - store all locally
 */
export function assembleSyncPackage() {
  const cfg = readSyncConfig();
  const { packet, packetHash, packetSize } = buildSyncPacket();

  const baseDir = path.join(process.cwd(), "tmp", "sync-outbound");
  if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const baseName = `sync_${timestamp}`;

  // 1. Save RAW packet
  const rawFile = path.join(baseDir, `${baseName}_raw.json`);
  fs.writeFileSync(rawFile, JSON.stringify(packet, null, 2), "utf8");

  let encrypted: any = null;
  let encryptedFile: string | null = null;

  if (cfg.encryption.enabled && cfg.encryption.key) {
    encrypted = encryptPacket(packet, cfg.encryption.key);
    encryptedFile = path.join(baseDir, `${baseName}_encrypted.json`);
    fs.writeFileSync(encryptedFile, JSON.stringify(encrypted, null, 2), "utf8");
  }

  let signature: string | null = null;
  let signatureFile: string | null = null;

  if (cfg.signing.enabled && cfg.signing.privateKey) {
    signature = signPacket(packet, cfg.signing.privateKey);
    signatureFile = path.join(baseDir, `${baseName}_signature.txt`);
    fs.writeFileSync(signatureFile, signature, "utf8");
  }

  return {
    ok: true,
    rawFile,
    encryptedFile,
    signatureFile,
    packetHash,
    packetSize,
    encryptionEnabled: cfg.encryption.enabled,
    signingEnabled: cfg.signing.enabled,
    timestamp
  };
}
