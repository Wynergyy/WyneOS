/**
 * WyneOS Phase 4 Integration Module
 * Bridges behaviour engine and behaviour log services.
 */

import { behaviourEngine, BehaviourContext } from "./behaviour-engine";
import { behaviourLog } from "./behaviour-log";

export interface BehaviourIntegrationResult {
  ok: boolean;
  timestamp: number;
  decision: string;
}

export function runBehaviourIntegration(
  context: BehaviourContext
): BehaviourIntegrationResult {
  const decision = behaviourEngine.evaluate(context);
  behaviourLog.record(`Decision processed: ${decision.decision}`);

  return {
    ok: true,
    timestamp: Date.now(),
    decision: decision.decision
  };
}
