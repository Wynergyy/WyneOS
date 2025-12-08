/**
 * Coherence Governor
 * Supervises global coherence state. Applies escalation thresholds
 * and outputs system-wide guidance for stabilisation or intervention.
 */

import { CoherenceState } from "./coherence-engine";

export interface CoherenceDirective {
  level: "normal" | "elevated" | "crisis";
  message: string;
  actions: string[];
  timestamp: number;
}

export class CoherenceGovernor {
  /**
   * Convert a fused CoherenceState into a system directive.
   */
  evaluate(state: CoherenceState): CoherenceDirective {
    let level: CoherenceDirective["level"] = "normal";
    const actions: string[] = [];
    let message = "System stable.";

    if (state.status === "elevated") {
      level = "elevated";
      message = "Integrity pressure detected.";
      actions.push("increase_monitoring", "activate_predictive_watchers");
    }

    if (state.status === "critical") {
      level = "crisis";
      message = "Critical system instability.";
      actions.push(
        "issue_guardian_alert",
        "freeze_nonessential_processes",
        "begin_autonomy_recovery"
      );
    }

    return {
      level,
      message,
      actions,
      timestamp: Date.now()
    };
  }
}
