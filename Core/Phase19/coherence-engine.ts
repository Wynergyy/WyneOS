/**
 * Coherence Engine
 * Fuses multi-channel signals (Evidence, Predictive, Behaviour, Telemetry)
 * into a single coherent system state.
 */

import { CoherenceInputBundle } from "./coherence-ingest";

export interface CoherenceState {
  score: number;
  status: "stable" | "elevated" | "critical";
  factors: string[];
  timestamp: number;
}

/**
 * The Coherence Engine combines multiple signals and calculates
 * an overall coherence score representing system integrity.
 */
export class CoherenceEngine {
  evaluate(bundle: CoherenceInputBundle): CoherenceState {
    const factors: string[] = [];
    let score = 0;

    // Evidence influence
    score += bundle.evidence.risk.score;
    factors.push("evidence_risk");

    // Predictive influence
    if (bundle.predictive.severity === "warning") {
      score += 15;
      factors.push("predictive_warning");
    }
    if (bundle.predictive.severity === "critical") {
      score += 30;
      factors.push("predictive_critical");
    }

    // Behaviour influence
    if (bundle.behaviour.severity > 50) {
      score += 20;
      factors.push("behaviour_high");
    }

    // Telemetry influence
    if (bundle.telemetry.cpuLoad > 0.9) {
      score += 10;
      factors.push("cpu_pressure");
    }
    if (bundle.telemetry.memoryUsage > 0.9) {
      score += 10;
      factors.push("memory_pressure");
    }
    if (bundle.telemetry.processHealth !== "OK") {
      score += 25;
      factors.push("process_degraded");
    }

    // Determine coherence status
    let status: CoherenceState["status"] = "stable";
    if (score >= 70) status = "elevated";
    if (score >= 90) status = "critical";

    return {
      score,
      status,
      factors,
      timestamp: Date.now()
    };
  }
}
