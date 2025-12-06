// Phase 16 — Risk Governor
// Loads model defaults, applies safety bounds, and validates incoming updates.

import { RiskModel } from "./risk-model";

export class RiskGovernor {
  static loadDefaultModel(): RiskModel {
    return new RiskModel(
      {
        "integrity_violation": { baseScore: 90 },
        "licence_mismatch": { baseScore: 75 },
        "identity_anomaly": { baseScore: 60 },
        "system_deviation": { baseScore: 40 },
        "usage_spike": { baseScore: 25 }
      },
      {
        medium: 50,
        high: 80
      }
    );
  }

  static validateUpdate(update: any): { ok: boolean; reason?: string } {
    if (!update) return { ok: false, reason: "No update payload provided" };
    if (!update.definitions || typeof update.definitions !== "object")
      return { ok: false, reason: "Invalid definitions block" };
    if (!update.thresholds || typeof update.thresholds !== "object")
      return { ok: false, reason: "Invalid thresholds block" };

    return { ok: true };
  }
}
