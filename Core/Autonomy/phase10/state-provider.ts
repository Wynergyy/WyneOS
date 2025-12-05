import { runDetection } from "./detection-engine.ts";
import { analyseDetection } from "./analysis-engine.ts";
import { simulateActions } from "./simulation-engine.ts";
import { sealTelemetry } from "./telemetry-sealer.ts";
import { Phase10StateBundle } from "./phase10-types.ts";

import { getIntegrityState } from "./stubs/integrity-provider.ts";
import { getMeshState } from "./stubs/mesh-provider.ts";
import { getLicenceState } from "./stubs/licence-provider.ts";

export const buildPhase10State = async (): Promise<Phase10StateBundle> => {
  const integrity = await getIntegrityState();
  const mesh = await getMeshState();
  const licence = await getLicenceState();

  return { timestamp: Date.now(), integrity, mesh, licence };
};

export const buildPhase10Report = async () => {
  const state = await buildPhase10State();

  const detection = await runDetection(state.integrity.snapshot, state.mesh, state.licence);
  const analysis = analyseDetection(detection);
  const simulation = await simulateActions(analysis);

  return sealTelemetry({ state, detection, analysis, simulation });
};
