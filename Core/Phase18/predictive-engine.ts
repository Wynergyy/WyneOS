/**
 * Predictive Engine
 * Applies rules, heuristics and preliminary scoring logic
 * to PredictiveFeatures produced by predictive-ingest.ts.
 */

import { PredictiveFeatures } from "./predictive-ingest";

export interface PredictiveEngineResult {
  score: number;
  factors: string[];
  alerts: string[];
  timestamp: number;
}

export class PredictiveEngine {
  /**
   * Primary scoring function.
   * Converts PredictiveFeatures into a consolidated risk score.
   */
  evaluate(features: PredictiveFeatures): PredictiveEngineResult {
    const factors: string[] = [];
    const alerts: string[] = [];
    let score = 0;

    // Base score from underlying evidence risk
    score += features.riskScore;
    factors.push("base_risk");

    // Penalise deep chain positions
    if (features.chainDepth > 500) {
      score += 10;
      factors.push("deep_chain");
    }

    // Penalise heavy audit activity
    if (features.auditCount > 20) {
      score += 15;
      factors.push("heavy_audit");
    }

    // Jurisdiction-specific adjustments
    if (features.jurisdiction === "UK-HIGH") {
      score += 5;
      factors.push("uk_high_priority");
    }

    // Anomaly flags directly increase score
    if (features.anomalyFlags.includes("high_risk")) {
      alerts.push("critical_risk");
      score += 20;
      factors.push("anomaly_high_risk");
    }

    if (features.anomalyFlags.includes("excessive_audit")) {
      alerts.push("audit_anomaly");
      score += 10;
      factors.push("anomaly_excessive_audit");
    }

    if (features.anomalyFlags.includes("deep_chain")) {
      alerts.push("chain_anomaly");
      score += 8;
      factors.push("anomaly_deep_chain");
    }

    // Clamp score to 0–100 for now
    if (score < 0) score = 0;
    if (score > 100) score = 100;

    return {
      score,
      factors,
      alerts,
      timestamp: Date.now()
    };
  }
}
