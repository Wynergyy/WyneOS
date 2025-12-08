/**
 * TelemetryFusion Broadcaster
 * Dispatches fused telemetry outputs to all subscribed downstream systems.
 *
 * Responsibilities:
 * - Forward TelemetryFusionResult to core WyneOS layers
 * - Support multi-sink broadcasting
 * - Provide a clean, decoupled event surface
 */

import { TelemetryFusionResult } from "./telemetryfusion-engine";

export type TelemetryFusionSink = (result: TelemetryFusionResult) => void;

export class TelemetryFusionBroadcaster {
  private sinks: TelemetryFusionSink[] = [];

  /** Register a new downstream sink */
  registerSink(sink: TelemetryFusionSink): void {
    this.sinks.push(sink);
  }

  /** Remove a sink if it exists */
  unregisterSink(sink: TelemetryFusionSink): void {
    this.sinks = this.sinks.filter(s => s !== sink);
  }

  /** Broadcast a fused telemetry result */
  broadcast(result: TelemetryFusionResult): void {
    for (const sink of this.sinks) {
      try {
        sink(result);
      } catch (err) {
        // Silent isolation: one sink must never break the broadcast chain
        console.error("[TelemetryFusionBroadcaster] Sink error:", err);
      }
    }
  }
}
