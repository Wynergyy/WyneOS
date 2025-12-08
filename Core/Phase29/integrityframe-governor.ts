/**
 * IntegrityFrame Governor
 * Applies global posture rules, escalation logic, and safety constraints
 * for the Phase 29 IntegrityFrame.
 */

export type IntegrityPosture =
  | "stable"
  | "elevated"
  | "degraded"
  | "critical";

export interface IntegrityDirective {
  posture: IntegrityPosture;
  message: string;
  actions: string[];
  timestamp: number;
}

export interface IntegrityFrameEngineOutput {
  overallScore: number;
  violations: {
    chain: string;
    count: number;
    severity: "low" | "medium" | "high";
  }[];
  signals: Record<string, any>;
}

/**
 * Governor applies system-wide interpretation of engine output.
 * Produces posture, actions, and policy-driven responses.
 */
export class IntegrityFrameGovernor {

  evaluate(engineOutput: IntegrityFrameEngineOutput): IntegrityDirective {

    const { overallScore, violations } = engineOutput;

    let posture: IntegrityPosture = "stable";
    let message = "Integrity stable";
    const actions: string[] = [];

    // Escalation thresholds
    if (overallScore < 0.85) {
      posture = "elevated";
      message = "Integrity pressure detected";
      actions.push("increase_sampling");
    }

    if (overallScore < 0.65) {
      posture = "degraded";
      message = "Integrity degradation observed";
      actions.push("invoke_chain_repair", "checkpoint_state");
    }

    if (overallScore < 0.45 || violations.some(v => v.severity === "high")) {
      posture = "critical";
      message = "Critical integrity failure risk";
      actions.push(
        "lock_subsystems",
        "halt_high_risk_processes",
        "force_recovery_mode"
      );
    }

    return {
      posture,
      message,
      actions,
      timestamp: Date.now()
    };
  }
}
