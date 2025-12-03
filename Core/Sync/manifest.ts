import fs from "fs";
import path from "path";
import crypto from "crypto";
import { readTelemetryQueue } from "@/Core/Telemetry/queue";

const syncStateFile = path.join(process.cwd(), "tmp", "sync-state.json");

/**
 * Ensure sync-state.json exists.
 */
function ensureSyncState() {
  try {
    if (!fs.existsSync(path.dirname(syncStateFile))) {
      fs.mkdirSync(path.dirname(syncStateFile), { recursive: true });
    }
    if (!fs.existsSync(syncStateFile)) {
      fs.writeFileSync(
        syncStateFile,
        JSON.stringify({ lastSyncId: 0 }, null, 2),
        "utf8"
      );
    }
  } catch (err) {
    console.error("Failed to initialise sync state:", err);
  }
}

export function readSyncState() {
  try {
    ensureSyncState();
    const raw = fs.readFileSync(syncStateFile, "utf8");
    return JSON.parse(raw);
  } catch {
    return { lastSyncId: 0 };
  }
}

export function writeSyncState(state: any) {
  try {
    ensureSyncState();
    fs.writeFileSync(syncStateFile, JSON.stringify(state, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to write sync state:", err);
  }
}

/**
 * Build an outbound sync manifest.
 */
export function buildSyncManifest() {
  const telemetryQueue = readTelemetryQueue();
  const state = readSyncState();

  const queueHash = crypto
    .createHash("sha256")
    .update(JSON.stringify(telemetryQueue))
    .digest("hex")
    .slice(0, 16);

  const nextSyncId = state.lastSyncId + 1;

  const manifest = {
    syncId: nextSyncId,
    timestamp: new Date().toISOString(),
    telemetryCount: telemetryQueue.length,
    queueHash,
    engine: {
      module: "WFSL-Integrity-Engine",
      version: "3.0.0"
    }
  };

  return manifest;
}
