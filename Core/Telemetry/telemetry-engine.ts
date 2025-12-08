import { createTelemetryEvent } from "./telemetry-event";
import { TelemetryRegistry } from "./telemetry-registry";

export class TelemetryEngine {
  private registry = new TelemetryRegistry();

  record(type: string, payload: any) {
    const event = createTelemetryEvent(type, payload);
    return this.registry.emit(event);
  }

  on(type: string, handler: (e: any) => void) {
    this.registry.on(type, handler);
  }

  list() {
    return this.registry.listEventTypes();
  }
}
