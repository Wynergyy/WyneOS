import { TelemetryEvent } from "./telemetry-event";

export type TelemetryHandler = (event: TelemetryEvent) => Promise<void> | void;

export class TelemetryRegistry {
  private handlers = new Map<string, TelemetryHandler[]>();

  on(eventType: string, handler: TelemetryHandler) {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }
    this.handlers.get(eventType)!.push(handler);
  }

  async emit(event: TelemetryEvent) {
    const handlers = this.handlers.get(event.type) || [];
    for (const handler of handlers) {
      await handler(event);
    }
  }

  listEventTypes() {
    return Array.from(this.handlers.keys());
  }
}
