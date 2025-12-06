/**
 * Predictive Governor
 * Supervises predictive outcomes, applies escalation thresholds
 * and produces integrity signals for Guardian Mesh and SGI-Core.
 */

import { PredictiveFeatures } from "./predictive-ingest";
import { PredictiveEngine, PredictiveEngineResult } from "./predictive-engine";

export interface PredictiveSignal {
  severity: "info" | "warning" | "critical";
  message: string;
  factors: string[];
  timestamp: number;
}

export class PredictiveGovernor {
  private engine = new PredictiveEngine();

  /**
   * Process PredictiveFeatures through the engine
   * and produce a normalised PredictiveSignal.
   */
  evaluate(features: PredictiveFeatures): PredictiveSignal {
    const result: PredictiveEngineResult = this.engine.evaluate(features);

    // Determine severity level
    let severity: PredictiveSignal["severity"] = "info";

    if (result.score >= 70) severity = "warning";
    if (result.score >= 90 || result.alerts.includes("critical_risk")) {
      severity = "critical";
    }

    const message = this.buildMessage(severity, result);

    return {
      severity,
      message,
      factors: result.factors,
      timestamp: result.timestamp
    };
  }

  /**
   * Human-readable signal message generator.
   */
  private buildMessage(
    severity: PredictiveSignal["severity"],
    result: PredictiveEngineResult
  ): string {
    if (severity === "critical") {
      return "Critical integrity risk detected";
    }
    if (severity === "warning") {
      return "Elevated predictive risk";
    }
    return "Predictive evaluation completed";
  }
}
