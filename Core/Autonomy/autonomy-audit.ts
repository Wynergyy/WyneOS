import { PredictiveOutput } from "./autonomy-predict";

export interface AutonomyAuditEntry {
  timestamp: string;
  cycle: number;
  stable: boolean;
  predictive: PredictiveOutput;
}

export function buildAuditEntry(
  cycle: number,
  stable: boolean,
  predictive: PredictiveOutput
): AutonomyAuditEntry {
  return {
    timestamp: new Date().toISOString(),
    cycle,
    stable,
    predictive
  };
}
