import crypto from "crypto";
import { TelemetryEvent } from "./event";

/**
 * Compress a telemetry event into a compact structure.
 * Removes unnecessary fields, shortens keys, and reduces payload size.
 */
export function compressEvent(event: TelemetryEvent) {
  const payloadString = JSON.stringify(event.payload);

  // Generate a short hash representing the payload
  const payloadHash = crypto
    .createHash("sha256")
    .update(payloadString)
    .digest("hex")
    .slice(0, 12);

  return {
    id: event.id,
    t: event.type,
    ts: event.timestamp,
    h: payloadHash,
    m: event.source.module,
    v: event.source.version
  };
}

/**
 * Lightweight hash for queue integrity.
 */
export function hashCompressed(event: any) {
  const content = JSON.stringify(event);
  return crypto.createHash("sha256").update(content).digest("hex").slice(0, 16);
}
