/**
 * Phase 20 Bootstrap
 * Initialises the Guardian Mesh Layer:
 * - Guardian Ingest
 * - Guardian Engine
 * - Guardian Router
 * - Guardian Governor
 */

import { buildGuardianBundle } from "./guardian-ingest";
import { GuardianEngine } from "./guardian-engine";
import { GuardianRouter } from "./guardian-router";
import { GuardianGovernor } from "./guardian-governor";

export interface Phase20BootstrapResult {
  ingest: typeof buildGuardianBundle;
  engine: GuardianEngine;
  router: GuardianRouter;
  governor: GuardianGovernor;
  initialised: boolean;
  timestamp: number;
}

/**
 * Initialise the Guardian Mesh Layer.
 */
export function bootstrapPhase20(): Phase20BootstrapResult {
  return {
    ingest: buildGuardianBundle,
    engine: new GuardianEngine(),
    router: new GuardianRouter(),
    governor: new GuardianGovernor(),
    initialised: true,
    timestamp: Date.now()
  };
}

/**
 * Convenience hook for kernel.ts or orchestration layers.
 */
export function initialiseGuardianLayer() {
  return bootstrapPhase20();
}
