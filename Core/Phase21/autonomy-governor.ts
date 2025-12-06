/**
 * Autonomy Governor
 * Supervises long-term system recovery posture and ensures safe,
 * controlled execution of recovery cycles.
 */

import { AutonomyAssessment } from "./autonomy-engine";

export interface AutonomyDirective {
  mode: "steady" | "recovering" | "restricted" | "critical_recovery";
  message: string;
  actions: string[];
  timestamp: number;
}

export class AutonomyGovernor {
  evaluate(assessment: AutonomyAssessment): AutonomyDirective {
    let mode: AutonomyDirective["mode"] = "steady";
    const actions: string[] = [];
    let message = "System operating within normal bounds";

    // Moderate recovery required
    if (assessment.recoveryLevel === "moderate") {
      mode = "recovering";
      message = "System entering controlled recovery mode";
      actions.push("limit_nonessential_operations");
    }

    // Major instability
    if (assessment.recoveryLevel === "major") {
      mode = "restricted";
      message = "Significant instability detected";
      actions.push(
        "restrict_external_access",
        "prioritise_core_processes"
      );
    }

    // Critical instability
    if (assessment.recoveryLevel === "critical") {
      mode = "critical_recovery";
      message = "Critical system degradation. Full recovery required.";
      actions.push(
        "halt_low_priority_tasks",
        "activate_emergency_recovery",
        "focus_all_resources_on_stability"
      );
    }

    return {
      mode,
      message,
      actions,
      timestamp: Date.now()
    };
  }
}
