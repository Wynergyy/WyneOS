import { createHash } from "crypto";

export function sha256(data: string | Buffer): string {
  const hash = createHash("sha256");
  hash.update(data);
  return hash.digest("hex");
}

export function hashObject(obj: unknown): string {
  return sha256(JSON.stringify(obj));
}
