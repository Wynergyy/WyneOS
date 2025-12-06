/**
 * Phase 18 Bootstrap
 * Initialises the Predictive Integrity Layer by wiring together:
 * - Predictive Ingest
 * - Predictive Engine
 * - Predictive Governor
 */

import { buildPredictiveFeatures } from "./predictive-ingest";
import { PredictiveEngine } from "./predictive-engine";
import { PredictiveGovernor } from "./predictive-governor";

export interface Phase18BootstrapResult {
  ingest: typeof buildPredictiveFeatures;
  engine: PredictiveEngine;
  governor: PredictiveGovernor;
  initialised: boolean;
  timestamp: number;
}

/**
 * Initialise Phase 18 Predictive Layer.
 */
export function bootstrapPhase18(): Phase18BootstrapResult {
  return {
    ingest: buildPredictiveFeatures,
    engine: new PredictiveEngine(),
    governor: new PredictiveGovernor(),
    initialised: true,
    timestamp: Date.now()
  };
}

/**
 * Convenience wrapper for kernel.ts or upstream orchestration layers.
 */
export function initialisePredictiveLayer() {
  return bootstrapPhase18();
}
