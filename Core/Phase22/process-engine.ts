/**
 * Process Engine
 * Determines system-level actions based on fused signals from
 * Guardian, Autonomy and Coherence Layers.
 */

import { ProcessInputBundle } from "./process-ingest";

export interface SystemAction {
  id: string;
  type: "restart_unit" | "scale_resources" | "suspend_module" | "resume_module" | "reset_state" | "emergency_stop";
  reason: string;
  timestamp: number;
}

export interface ProcessAssessment {
  actions: SystemAction[];
  severity: "low" | "medium" | "high" | "critical";
  timestamp: number;
}

export class ProcessEngine {
  evaluate(input: ProcessInputBundle): ProcessAssessment {
    const actions: SystemAction[] = [];
    let severity: ProcessAssessment["severity"] = "low";

    // Guardian signals
    if (input.guardian.threatLevel === "high") {
      severity = "high";
      actions.push({
        id: "restart-unit-guardian",
        type: "restart_unit",
        reason: "Guardian detected high threat level",
        timestamp: Date.now()
      });
    }

    if (input.guardian.threatLevel === "critical") {
      severity = "critical";
      actions.push({
        id: "emergency-stop-guardian",
        type: "emergency_stop",
        reason: "Guardian indicates critical threat",
        timestamp: Date.now()
      });
    }

    // Autonomy recovery tasks
    if (input.autonomy.recoveryLevel === "major") {
      actions.push({
        id: "scale-resources",
        type: "scale_resources",
        reason: "Autonomy requires additional system resources",
        timestamp: Date.now()
      });
    }

    if (input.autonomy.recoveryLevel === "critical") {
      actions.push({
        id: "suspend-modules",
        type: "suspend_module",
        reason: "Critical recovery mode requires suspending non-core modules",
        timestamp: Date.now()
      });
    }

    // Coherence instability
    if (input.coherence.status === "elevated") {
      actions.push({
        id: "reset-state-elevated",
        type: "reset_state",
        reason: "Coherence indicated elevated instability",
        timestamp: Date.now()
      });
    }

    if (input.coherence.status === "critical") {
      severity = "critical";
      actions.push({
        id: "reset-state-critical",
        type: "reset_state",
        reason: "Critical coherence instability requires state reset",
        timestamp: Date.now()
      });
    }

    return {
      actions,
      severity,
      timestamp: Date.now()
    };
  }
}
