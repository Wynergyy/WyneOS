/**
 * TelemetryMatrix – Phase 0 Core
 *
 * Unified event stream and structured logging matrix for all WyneOS modules.
 */

export class TelemetryMatrix {
  private static stream: Array<any> = [];
  private static maxRecords = 5000;

  static record(event: string, payload: any = {}) {
    const entry = {
      id: crypto.randomUUID(),
      event,
      payload,
      timestamp: new Date().toISOString()
    };

    this.stream.push(entry);

    if (this.stream.length > this.maxRecords) {
      this.stream.shift();
    }

    console.log("[TelemetryMatrix]", entry);
    return entry;
  }

  static all() {
    return [...this.stream];
  }

  static findByEvent(event: string) {
    return this.stream.filter(e => e.event === event);
  }

  static flush() {
    this.stream = [];
    console.log("[TelemetryMatrix] Stream flushed");
  }
}
