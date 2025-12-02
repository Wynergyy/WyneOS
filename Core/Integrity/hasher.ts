/**
 * WyneOS Integrity Hasher – Phase 0.2
 * Provides SHA-256 hashing for files, objects and buffers.
 */

import { createHash } from "crypto";

export class Hasher {
  static hashString(data: string): string {
    return createHash("sha256").update(data).digest("hex");
  }

  static hashObject(obj: any): string {
    const json = JSON.stringify(obj, Object.keys(obj).sort());
    return this.hashString(json);
  }

  static hashBuffer(buffer: Buffer): string {
    return createHash("sha256").update(buffer).digest("hex");
  }
}
