import { EvidenceModel } from "./evidence-model";
import { EvidenceAudit } from "./evidence-audit";
import { EvidenceEngine } from "./evidence-engine";
import { EvidenceRouter } from "./evidence-router";
import { EvidenceGovernor } from "./evidence-governor";

export interface Phase17BootstrapResult {
  model: EvidenceModel;
  audit: EvidenceAudit;
  engine: EvidenceEngine;
  router: EvidenceRouter;
  governor: EvidenceGovernor;
  initialised: boolean;
  timestamp: number;
}

/**
 * Phase 17 Bootstrap
 * Establishes the canonical evidence layer by wiring all five components.
 * This forms the root integration point for the evidence chain in WyneOS.
 */
export function bootstrapPhase17(): Phase17BootstrapResult {
  const timestamp = Date.now();

  const model = new EvidenceModel();
  const audit = new EvidenceAudit();
  const engine = new EvidenceEngine(model, audit);
  const router = new EvidenceRouter(engine);
  const governor = new EvidenceGovernor(router, audit);

  return {
    model,
    audit,
    engine,
    router,
    governor,
    initialised: true,
    timestamp
  };
}

/**
 * Optional startup hook for kernel.ts or Orchestration layer.
 * Calling this will prepare the Evidence Layer for consumption
 * by upstream governors, predictive units, or SGI-Core.
 */
export function initialiseEvidenceLayer() {
  return bootstrapPhase17();
}
