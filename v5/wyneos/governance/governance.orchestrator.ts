/**
 * WyneOS Governance Orchestrator
 * Coordinates policy binding, enforcement and state transitions.
 */

import { governanceBinder } from "./governance.bind";

export interface GovernancePolicy {
  name: string;
  enabled: boolean;
}

export interface GovernanceOrchestrationResult {
  ok: boolean;
  timestamp: number;
  appliedPolicies: GovernancePolicy[];
  error?: string;
}

export class GovernanceOrchestrator {
  orchestrate(policies: GovernancePolicy[]): GovernanceOrchestrationResult {
    if (!Array.isArray(policies)) {
      return {
        ok: false,
        timestamp: Date.now(),
        appliedPolicies: [],
        error: "Invalid policy list"
      };
    }

    const applied: GovernancePolicy[] = [];

    for (const policy of policies) {
      const result = governanceBinder.bind(policy.name, policy.enabled);
      if (result.ok && result.binding) {
        applied.push(result.binding);
      }
    }

    return {
      ok: true,
      timestamp: Date.now(),
      appliedPolicies: applied
    };
  }
}

export const governanceOrchestrator = new GovernanceOrchestrator();
