/**
 * WFSL Telemetry Queue
 * Deterministic, memory-safe event queue for lightweight telemetry transport
 */

export interface TelemetryEvent {
  id: string;
  type: string;
  data: Record<string, unknown>;
  timestamp: number;
}

export interface TelemetryDispatch {
  id: string;
  dispatched: boolean;
  timestamp: number;
  reason?: string;
}

export class TelemetryQueue {
  private buffer: TelemetryEvent[] = [];

  enqueue(evt: TelemetryEvent): TelemetryDispatch {
    if (!this.valid(evt)) {
      return {
        id: evt.id,
        dispatched: false,
        timestamp: Date.now(),
        reason: "Invalid telemetry event"
      };
    }

    this.buffer.push(evt);

    return {
      id: evt.id,
      dispatched: true,
      timestamp: Date.now()
    };
  }

  drain(): TelemetryEvent[] {
    const items = [...this.buffer];
    this.buffer.length = 0;
    return items;
  }

  peek(): TelemetryEvent[] {
    return [...this.buffer];
  }

  size(): number {
    return this.buffer.length;
  }

  private valid(evt: TelemetryEvent): boolean {
    if (!evt.id || typeof evt.id !== "string") return false;
    if (!evt.type || typeof evt.type !== "string") return false;
    if (!evt.timestamp || typeof evt.timestamp !== "number") return false;
    if (typeof evt.data !== "object" || evt.data === null) return false;
    return true;
  }
}

export const telemetryQueue = new TelemetryQueue();
