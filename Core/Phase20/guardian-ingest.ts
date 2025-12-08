/**
 * Guardian Ingest
 * Normalises inputs from Coherence and Predictive layers
 * into a unified threat evaluation payload for Guardian Mesh.
 */

import { CoherenceState } from "../Phase19/coherence-engine";
import { PredictiveSignal } from "../Phase18/predictive-governor";

export interface GuardianInputBundle {
  coherence: CoherenceState;
  predictive: PredictiveSignal;
  timestamp: number;
}

/**
 * Build a normalised Guardian input package.
 */
export function buildGuardianBundle(
  coherence: CoherenceState,
  predictive: PredictiveSignal
): GuardianInputBundle {
  return {
    coherence,
    predictive,
    timestamp: Date.now()
  };
}
