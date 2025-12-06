/**
 * Autonomy Ingest
 * Normalises inputs from Guardian, Coherence, Predictive and Telemetry
 * into a unified recovery package consumed by the Autonomy Engine.
 */

import { GuardianAssessment } from "../Phase20/guardian-engine";
import { CoherenceState } from "../Phase19/coherence-engine";
import { PredictiveSignal } from "../Phase18/predictive-governor";

export interface AutonomyTelemetry {
  cpuLoad: number;
  memoryUsage: number;
  processesDegraded: boolean;
  timestamp: number;
}

export interface AutonomyInputBundle {
  guardian: GuardianAssessment;
  coherence: CoherenceState;
  predictive: PredictiveSignal;
  telemetry: AutonomyTelemetry;
  timestamp: number;
}

/**
 * Build a unified Autonomy input package.
 */
export function buildAutonomyBundle(
  guardian: GuardianAssessment,
  coherence: CoherenceState,
  predictive: PredictiveSignal,
  telemetry: AutonomyTelemetry
): AutonomyInputBundle {
  return {
    guardian,
    coherence,
    predictive,
    telemetry,
    timestamp: Date.now()
  };
}
