/**
 * Phase 21 Bootstrap
 * Initialises the Autonomy Recovery Layer:
 * - Autonomy Ingest
 * - Autonomy Engine
 * - Autonomy Executor
 * - Autonomy Governor
 */

import { buildAutonomyBundle } from "./autonomy-ingest";
import { AutonomyEngine } from "./autonomy-engine";
import { AutonomyExecutor } from "./autonomy-executor";
import { AutonomyGovernor } from "./autonomy-governor";

export interface Phase21BootstrapResult {
  ingest: typeof buildAutonomyBundle;
  engine: AutonomyEngine;
  executor: AutonomyExecutor;
  governor: AutonomyGovernor;
  initialised: boolean;
  timestamp: number;
}

/**
 * Initialise the full Autonomy Layer.
 */
export function bootstrapPhase21(): Phase21BootstrapResult {
  return {
    ingest: buildAutonomyBundle,
    engine: new AutonomyEngine(),
    executor: new AutonomyExecutor(),
    governor: new AutonomyGovernor(),
    initialised: true,
    timestamp: Date.now()
  };
}

/**
 * Convenience entrypoint for kernel.ts or orchestration layers.
 */
export function initialiseAutonomyLayer() {
  return bootstrapPhase21();
}
