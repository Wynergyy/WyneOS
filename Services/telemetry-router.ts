import { emitTelemetryEvent, TelemetryEvent } from "../Core/Telemetry";
import { ServiceRegistry } from "./service-registry";

/**
 * Telemetry Router
 *
 * Routes telemetry events through the public telemetry boundary.
 * Contains no telemetry implementation logic.
 *
 * No side effects.
 * No logging.
 * Deterministic dispatch only.
 */
export class TelemetryRouter {
  static initialise(): void {
    // Intentionally inert. Initialisation is handled upstream.
  }

  static route(event: TelemetryEvent): void {
    emitTelemetryEvent(event);
  }
}

ServiceRegistry.register("telemetry", TelemetryRouter);
