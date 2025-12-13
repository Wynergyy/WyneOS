/**
 * Phase 5 – Anomaly Predictor
 *
 * Produces deterministic anomaly assessments based on
 * predictive graph correlation patterns.
 *
 * No side effects.
 * No I/O.
 */

import { PredictiveGraph } from "./predictive-graph";

export type AnomalyLevel = "low" | "medium";

export interface AnomalyResult {
  readonly status: "ok" | "insufficient_data";
  readonly level: AnomalyLevel;
  readonly details: string;
}

const MIN_HISTORY_SIZE = 10;
const HEARTBEAT_RATIO_THRESHOLD = 0.4;

export class AnomalyPredictor {
  static score(): AnomalyResult {
    const total = PredictiveGraph.getAll().length;

    if (total < MIN_HISTORY_SIZE) {
      return {
        status: "insufficient_data",
        level: "low",
        details: "Insufficient history for anomaly detection",
      };
    }

    const heartbeatCount = PredictiveGraph.correlation("heartbeat");
    const ratio = heartbeatCount / total;

    if (ratio < HEARTBEAT_RATIO_THRESHOLD) {
      return {
        status: "ok",
        level: "medium",
        details: "Heartbeat frequency lower than expected",
      };
    }

    return {
      status: "ok",
      level: "low",
      details: "Normal pattern detected",
    };
  }
}
