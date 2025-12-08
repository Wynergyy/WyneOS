/**
 * Phase 22 Bootstrap
 * Initialises the Process Manager Evolution Layer:
 * - Process Ingest
 * - Process Engine
 * - Process Executor
 * - Process Governor
 */

import { buildProcessBundle } from "./process-ingest";
import { ProcessEngine } from "./process-engine";
import { ProcessExecutor } from "./process-executor";
import { ProcessGovernor } from "./process-governor";

export interface Phase22BootstrapResult {
  ingest: typeof buildProcessBundle;
  engine: ProcessEngine;
  executor: ProcessExecutor;
  governor: ProcessGovernor;
  initialised: boolean;
  timestamp: number;
}

/**
 * Initialise the Process Manager Evolution Layer.
 */
export function bootstrapPhase22(): Phase22BootstrapResult {
  return {
    ingest: buildProcessBundle,
    engine: new ProcessEngine(),
    executor: new ProcessExecutor(),
    governor: new ProcessGovernor(),
    initialised: true,
    timestamp: Date.now()
  };
}

/**
 * Convenience entrypoint for kernel.ts and orchestration layers.
 */
export function initialiseProcessLayer() {
  return bootstrapPhase22();
}
