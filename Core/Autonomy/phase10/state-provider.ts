import { runDetection } from "./detection-engine.ts";
import { analyseDetection } from "./analysis-engine.ts";
import { simulateActions } from "./simulation-engine.ts";
import { sealTelemetry } from "./telemetry-sealer.ts";
import { Phase10StateBundle } from "./phase10-types.ts";

// These imports expect your existing modules to expose these getters.
import { getIntegrityState } from "../../Integrity/integrity-provider";
import { getMeshState } from "../../Prediction/mesh-provider";
import { getLicenceState } from "../../../WFSL-LICENCE/licence-provider";

/**
 * Phase 10 State Provider
 * Collects integrity, mesh, and licence states into a unified, normalised bundle.
 * Does not execute any action. Purely provides data to Phase 10 engines.
 */
export const buildPhase10State = async (): Promise<Phase10StateBundle> => {
  const integrity = await getIntegrityState();
  const mesh = await getMeshState();
  const licence = await getLicenceState();

  return {
    timestamp: Date.now(),
    integrity,
    mesh,
    licence
  };
};

/**
 * High-level helper that produces the full Phase 10 analysis chain.
 * Still SAFE. No actions performed. No enforcement.
 */
export const buildPhase10Report = async () => {
  const state = await buildPhase10State();

  const detection = await runDetection(
    state.integrity.snapshot,
    state.mesh,
    state.licence
  );

  const analysis = analyseDetection(detection);
  const simulation = await simulateActions(analysis);

  const sealed = sealTelemetry({
    state,
    detection,
    analysis,
    simulation
  });

  return sealed;
};
