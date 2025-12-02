/**
 * WyneOS Integrity Engine – Phase 0.2
 * Generates signatures, verifies module integrity and records via TelemetryMatrix.
 */

import { Hasher } from "./hasher";
import { TelemetryMatrix } from "../Telemetry/telemetry-matrix";

export class IntegrityEngine {
  private static registry: Map<string, string> = new Map();

  static register(name: string, data: any) {
    const signature = Hasher.hashObject(data);
    this.registry.set(name, signature);
    TelemetryMatrix.record("integrity.register", { name, signature });
    return signature;
  }

  static verify(name: string, currentData: any) {
    const existing = this.registry.get(name);
    const current = Hasher.hashObject(currentData);

    const valid = existing === current;

    TelemetryMatrix.record("integrity.verify", {
      name,
      valid,
      expected: existing,
      actual: current
    });

    return valid;
  }

  static list() {
    return Array.from(this.registry.entries());
  }
}
