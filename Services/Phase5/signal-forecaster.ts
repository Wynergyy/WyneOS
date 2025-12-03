/**
 * Phase 5 – SignalForecaster
 * Uses PredictiveGraph to infer next likely system events.
 */

import { PredictiveGraph } from "./predictive-graph";

export class SignalForecaster {
  static forecast() {
    const recent = PredictiveGraph.getLast(5);

    if (recent.length === 0) {
      return { status: "insufficient_data" };
    }

    const last = recent[recent.length - 1];

    return {
      basedOn: last.type,
      prediction: `next_${last.type}`,
      confidence: 0.72
    };
  }
}
