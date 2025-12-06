// Phase 16 — Risk Engine
// Evaluates risk events against the model and assigns severity scores.

import { RiskModel } from "./risk-model";
import { RiskEvent } from "./risk-event";

export class RiskEngine {
  private model: RiskModel;

  constructor(model: RiskModel) {
    this.model = model;
  }

  evaluate(event: RiskEvent) {
    // Step 1: Base lookup
    const base = this.model.definitions[event.type];

    if (!base) {
      return {
        ok: false,
        reason: "Unknown risk event",
        score: 0,
        tier: "none"
      };
    }

    // Step 2: Weighted scoring
    const weight = event.weight ?? 1;
    const score = base.baseScore * weight;

    // Step 3: Tiering
    let tier = "low";
    if (score >= this.model.thresholds.high) tier = "high";
    else if (score >= this.model.thresholds.medium) tier = "medium";

    return {
      ok: true,
      type: event.type,
      score,
      tier,
      timestamp: Date.now()
    };
  }
}
