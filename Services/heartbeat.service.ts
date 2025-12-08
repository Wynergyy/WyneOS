export class HeartbeatService {
  static ping(): void {
    console.log("[HEARTBEAT]");
  }

  static pulse(meta?: Record<string, unknown>): void {
    const payload = {
      timestamp: Date.now(),
      meta: meta || null
    };
    console.log("[HEARTBEAT:PULSE]", payload);
  }
}

export const heartbeatService = new HeartbeatService();
