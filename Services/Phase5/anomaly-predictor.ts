/**
 * Phase 5 – AnomalyPredictor
 * Scores deviations and unusual patterns.
 */

import { PredictiveGraph } from "./predictive-graph";

export class AnomalyPredictor {
  static score() {
    const total = PredictiveGraph.getAll().length;
    if (total < 10) return { level: "low", details: "insufficient history" };

    const heartbeat = PredictiveGraph.correlation("heartbeat");
    const ratio = heartbeat / total;

    if (ratio < 0.4)
      return { level: "medium", details: "heartbeat frequency lower than expected" };

    return { level: "low", details: "normal pattern" };
  }
}
