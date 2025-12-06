/**
 * Phase 23 Bootstrap
 * Initialises the IntegrityChain Expansion Layer:
 * - IntegrityChain Ingest
 * - IntegrityChain Engine
 * - IntegrityChain Validator
 * - IntegrityChain Repair
 */

import { buildIntegrityChainInput } from "./integritychain-ingest";
import { IntegrityChainEngine } from "./integritychain-engine";
import { IntegrityChainValidator } from "./integritychain-validator";
import { IntegrityChainRepair } from "./integritychain-repair";

export interface Phase23BootstrapResult {
  ingest: typeof buildIntegrityChainInput;
  engine: IntegrityChainEngine;
  validator: IntegrityChainValidator;
  repair: IntegrityChainRepair;
  initialised: boolean;
  timestamp: number;
}

/**
 * Initialise the full IntegrityChain Layer.
 */
export function bootstrapPhase23(): Phase23BootstrapResult {
  return {
    ingest: buildIntegrityChainInput,
    engine: new IntegrityChainEngine(),
    validator: new IntegrityChainValidator(),
    repair: new IntegrityChainRepair(),
    initialised: true,
    timestamp: Date.now()
  };
}

/**
 * Convenience entrypoint for kernel.ts and orchestration layers.
 */
export function initialiseIntegrityChainLayer() {
  return bootstrapPhase23();
}
