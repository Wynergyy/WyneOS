/**
 * Process Ingest
 * Normalises inputs from Autonomy, Guardian, and Coherence Layers
 * into a unified system-action package for the Process Manager.
 */

import { GuardianAssessment } from "../Phase20/guardian-engine";
import { AutonomyAssessment } from "../Phase21/autonomy-engine";
import { CoherenceState } from "../Phase19/coherence-engine";

export interface ProcessInputBundle {
  guardian: GuardianAssessment;
  autonomy: AutonomyAssessment;
  coherence: CoherenceState;
  timestamp: number;
}

/**
 * Build a normalised Process Manager input bundle.
 */
export function buildProcessBundle(
  guardian: GuardianAssessment,
  autonomy: AutonomyAssessment,
  coherence: CoherenceState
): ProcessInputBundle {
  return {
    guardian,
    autonomy,
    coherence,
    timestamp: Date.now()
  };
}
