/**
 * Phase 5 – Signal Forecaster
 *
 * Produces deterministic forward-looking signal hints based on
 * recent predictive graph activity.
 *
 * No side effects.
 * No I/O.
 */

import { PredictiveGraph } from "./predictive-graph";

export interface ForecastResult {
  readonly status: "ok" | "insufficient_data";
  readonly basedOn?: string;
  readonly prediction?: string;
  readonly confidence?: number;
}

const DEFAULT_WINDOW_SIZE = 5;
const DEFAULT_CONFIDENCE = 0.72;

export class SignalForecaster {
  static forecast(): ForecastResult {
    const recent = PredictiveGraph.getLast(DEFAULT_WINDOW_SIZE);

    if (recent.length === 0) {
      return {
        status: "insufficient_data",
      };
    }

    const last = recent[recent.length - 1];

    return {
      status: "ok",
      basedOn: last.type,
      prediction: `next_${last.type}`,
      confidence: DEFAULT_CONFIDENCE,
    };
  }
}
