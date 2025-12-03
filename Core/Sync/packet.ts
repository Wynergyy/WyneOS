import crypto from "crypto";
import { buildSyncManifest } from "./manifest";
import { readTelemetryQueue } from "@/Core/Telemetry/queue";

/**
 * Build a complete outbound sync packet.
 * Combines:
 *  - Sync manifest
 *  - Compressed telemetry queue snapshot
 *  - Packet-level integrity hash
 */
export function buildSyncPacket() {
  const manifest = buildSyncManifest();
  const telemetry = readTelemetryQueue();

  const packet = {
    manifest,
    telemetry,
    generatedAt: new Date().toISOString()
  };

  const packetString = JSON.stringify(packet);
  const packetHash = crypto
    .createHash("sha256")
    .update(packetString)
    .digest("hex");

  const packetSize = Buffer.byteLength(packetString, "utf8");

  return {
    packet,
    packetHash,
    packetSize
  };
}
