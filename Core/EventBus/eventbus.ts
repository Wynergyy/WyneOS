/**
 * WyneOS EventBus – Phase 0 Core
 * Global synchronous event dispatcher
 * All WyneOS modules (TelemetryMatrix, Heartbeat, Compliance, Registry)
 * communicate strictly through this bus to ensure predictable behaviour.
 */

type EventHandler = (payload: any) => void;

class EventBus {
  private channels: Map<string, EventHandler[]> = new Map();

  subscribe(event: string, handler: EventHandler) {
    if (!this.channels.has(event)) {
      this.channels.set(event, []);
    }
    this.channels.get(event)!.push(handler);
  }

  publish(event: string, payload: any = {}) {
    const handlers = this.channels.get(event);
    if (!handlers || handlers.length === 0) return;

    for (const handler of handlers) {
      try {
        handler(payload);
      } catch (err) {
        console.error(`EventBus handler error for event ${event}:`, err);
      }
    }
  }
}

export const WyneEventBus = new EventBus();
