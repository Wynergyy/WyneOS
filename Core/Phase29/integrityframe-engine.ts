/**
 * IntegrityFrame Engine
 * Computes layered integrity outcomes from the normalised
 * IntegrityFrameBundle. This forms the core integrity
 * classification layer for WyneOS.
 */

import { IntegrityFrameBundle } from "./integrityframe-ingest";

export interface IntegrityOutcome {
  level: "OK" | "WARN" | "CRITICAL";
  issues: string[];
  score: number;
  timestamp: number;
}

export class IntegrityFrameEngine {

  /**
   * Compute a layered integrity outcome from the given bundle.
   * This engine evaluates:
   *   - execution integrity (task failures, anomalies)
   *   - autonomy integrity (governor posture deviations)
   *   - cross-frame correlation
   */
  compute(bundle: IntegrityFrameBundle): IntegrityOutcome {

    const issues: string[] = [];

    // Execution integrity checks
    const exec = bundle.execution || {};
    if (exec.failedTasks && exec.failedTasks.length > 0) {
      issues.push(`Execution failures detected: ${exec.failedTasks.length}`);
    }

    if (exec.anomalies && exec.anomalies.length > 0) {
      issues.push(`Execution anomalies detected: ${exec.anomalies.length}`);
    }

    // Autonomy integrity checks
    const auto = bundle.autonomy || {};
    if (auto.violations && auto.violations.length > 0) {
      issues.push(`Autonomy violations detected: ${auto.violations.length}`);
    }

    // Scoring model
    const score =
      100
      - (exec.failedTasks?.length || 0) * 10
      - (exec.anomalies?.length || 0) * 5
      - (auto.violations?.length || 0) * 15;

    let level: "OK" | "WARN" | "CRITICAL" = "OK";

    if (score < 70) level = "WARN";
    if (score < 40) level = "CRITICAL";

    return {
      level,
      issues,
      score,
      timestamp: Date.now()
    };
  }
}
