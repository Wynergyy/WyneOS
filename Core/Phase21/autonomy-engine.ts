/**
 * Autonomy Engine
 * Determines recovery actions based on system instability signals.
 * Produces structured recovery tasks for execution.
 */

import { AutonomyInputBundle } from "./autonomy-ingest";

export interface RecoveryTask {
  id: string;
  action: "reduce_load" | "restart_service" | "clear_cache" | "rebalance_processes" | "full_recovery";
  reason: string;
  timestamp: number;
}

export interface AutonomyAssessment {
  recoveryLevel: "minor" | "moderate" | "major" | "critical";
  tasks: RecoveryTask[];
  timestamp: number;
}

export class AutonomyEngine {
  evaluate(input: AutonomyInputBundle): AutonomyAssessment {
    let severityScore = 0;
    const tasks: RecoveryTask[] = [];

    // Guardian threat influence
    if (input.guardian.threatLevel === "high") severityScore += 30;
    if (input.guardian.threatLevel === "critical") severityScore += 50;

    // Coherence influence
    if (input.coherence.status === "elevated") severityScore += 20;
    if (input.coherence.status === "critical") severityScore += 40;

    // Predictive influence
    if (input.predictive.severity === "warning") severityScore += 10;
    if (input.predictive.severity === "critical") severityScore += 25;

    // Telemetry influence
    if (input.telemetry.cpuLoad > 0.85) {
      severityScore += 15;
      tasks.push({
        id: "reduce-load",
        action: "reduce_load",
        reason: "CPU pressure detected",
        timestamp: Date.now()
      });
    }

    if (input.telemetry.memoryUsage > 0.85) {
      severityScore += 15;
      tasks.push({
        id: "clear-cache",
        action: "clear_cache",
        reason: "Memory pressure detected",
        timestamp: Date.now()
      });
    }

    if (input.telemetry.processesDegraded) {
      severityScore += 20;
      tasks.push({
        id: "rebalance-processes",
        action: "rebalance_processes",
        reason: "Process degradation detected",
        timestamp: Date.now()
      });
    }

    // Determine recovery level
    let recoveryLevel: AutonomyAssessment["recoveryLevel"] = "minor";
    if (severityScore >= 40) recoveryLevel = "moderate";
    if (severityScore >= 70) recoveryLevel = "major";
    if (severityScore >= 100) {
      recoveryLevel = "critical";
      tasks.push({
        id: "full-recovery",
        action: "full_recovery",
        reason: "Critical instability requires full recovery",
        timestamp: Date.now()
      });
    }

    return {
      recoveryLevel,
      tasks,
      timestamp: Date.now()
    };
  }
}
