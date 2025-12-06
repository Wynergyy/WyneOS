/**
 * Guardian Engine
 * Evaluates GuardianInputBundle and determines protective actions,
 * intervention thresholds and real-time threat mitigation responses.
 */

import { GuardianInputBundle } from "./guardian-ingest";

export interface GuardianAction {
  type: "observe" | "throttle" | "quarantine" | "halt";
  reason: string;
  timestamp: number;
}

export interface GuardianAssessment {
  threatLevel: "low" | "medium" | "high" | "critical";
  actions: GuardianAction[];
  score: number;
  timestamp: number;
}

export class GuardianEngine {
  evaluate(input: GuardianInputBundle): GuardianAssessment {
    let score = 0;
    const actions: GuardianAction[] = [];

    // Coherence state influence
    if (input.coherence.status === "elevated") score += 20;
    if (input.coherence.status === "critical") score += 40;

    // Predictive severity influence
    if (input.predictive.severity === "warning") score += 15;
    if (input.predictive.severity === "critical") score += 35;

    // Threat level determination
    let threatLevel: GuardianAssessment["threatLevel"] = "low";
    if (score >= 30) threatLevel = "medium";
    if (score >= 60) threatLevel = "high";
    if (score >= 85) threatLevel = "critical";

    // Recommended actions based on threat level
    if (threatLevel === "medium") {
      actions.push({
        type: "observe",
        reason: "Integrity pressure detected",
        timestamp: Date.now()
      });
    }

    if (threatLevel === "high") {
      actions.push(
        {
          type: "throttle",
          reason: "Elevated instability",
          timestamp: Date.now()
        },
        {
          type: "observe",
          reason: "Continuous monitoring required",
          timestamp: Date.now()
        }
      );
    }

    if (threatLevel === "critical") {
      actions.push(
        {
          type: "quarantine",
          reason: "Critical threat detected",
          timestamp: Date.now()
        },
        {
          type: "halt",
          reason: "Immediate protective intervention",
          timestamp: Date.now()
        }
      );
    }

    return {
      threatLevel,
      actions,
      score,
      timestamp: Date.now()
    };
  }
}
