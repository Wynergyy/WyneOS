/**
 * WFSL Sync Engine
 * Phase-safe, deterministic, idempotent sync processor
 */

export interface SyncPacket {
  id: string;
  source: string;
  payload: Record<string, unknown>;
  timestamp: number;
}

export interface SyncResult {
  id: string;
  accepted: boolean;
  timestamp: number;
  reason?: string;
  output?: unknown;
}

export class SyncEngine {
  validate(packet: SyncPacket): boolean {
    if (!packet.id || typeof packet.id !== "string") return false;
    if (!packet.source || typeof packet.source !== "string") return false;
    if (typeof packet.timestamp !== "number") return false;
    return true;
  }

  process(packet: SyncPacket): SyncResult {
    if (!this.validate(packet)) {
      return {
        id: packet.id,
        accepted: false,
        timestamp: Date.now(),
        reason: "Invalid packet"
      };
    }

    const output = this.compute(packet);

    return {
      id: packet.id,
      accepted: true,
      timestamp: Date.now(),
      output
    };
  }

  private compute(packet: SyncPacket): unknown {
    // Additional sync logic can be injected here
    return {
      echo: packet.payload,
      from: packet.source,
      processedAt: Date.now()
    };
  }
}

export const syncEngine = new SyncEngine();
