/**
 * Orchestrator Governor
 * Provides system-wide oversight, safety posture, and policy enforcement.
 */

import { OrchestratorFrame } from "./orchestrator-engine";

export interface OrchestratorDirective {
  posture: "normal" | "elevated" | "restricted" | "halt";
  message: string;
  actions: string[];
  timestamp: number;
}

export class OrchestratorGovernor {
  evaluate(frame: OrchestratorFrame): OrchestratorDirective {
    let posture: OrchestratorDirective["posture"] = "normal";
    const actions: string[] = [];
    let message = "Operational";

    // Elevated: unusual latency or timing drift
    if (frame.latency && frame.latency > 120) {
      posture = "elevated";
      message = "Scheduling drift detected";
      actions.push("adjust_cycle_timing");
    }

    // Restricted: repeated anomalies or conflicts
    if (frame.anomalies && frame.anomalies.length >= 3) {
      posture = "restricted";
      message = "Multiple anomalies detected";
      actions.push("limit_parallel_execution");
    }

    // Halt: critical state conflicts
    if (frame.conflicts && frame.conflicts.length > 0) {
      posture = "halt";
      message = "Critical conflicts detected — orchestration halted";
      actions.push(
        "freeze_orchestrator",
        "log_critical_fault",
        "await_manual_intervention"
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
