/**
 * Process Governor
 * Supervises global process management posture and applies
 * safety constraints across the entire WyneOS system.
 */

import { ProcessAssessment } from "./process-engine";

export interface ProcessDirective {
  mode: "normal" | "restricted" | "stressed" | "critical_lockdown";
  message: string;
  controls: string[];
  timestamp: number;
}

export class ProcessGovernor {
  evaluate(assessment: ProcessAssessment): ProcessDirective {
    let mode: ProcessDirective["mode"] = "normal";
    let message = "Processes operating normally";
    const controls: string[] = [];

    // Medium or high severity
    if (assessment.severity === "high") {
      mode = "stressed";
      message = "System under operational stress";
      controls.push(
        "defer_nonessential_actions",
        "increase_monitoring_frequency"
      );
    }

    // Critical severity
    if (assessment.severity === "critical") {
      mode = "critical_lockdown";
      message = "Critical conditions. Restricting system operations.";
      controls.push(
        "halt_noncritical_units",
        "restrict_external_channels",
        "prioritise_protective_actions"
      );
    }

    return {
      mode,
      message,
      controls,
      timestamp: Date.now()
    };
  }
}
