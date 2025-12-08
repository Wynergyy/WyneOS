import { Phase10Detection, Phase10Signal } from "./phase10-types.ts";

/**
 * Phase 10 Detection Engine
 * SAFE: This engine never modifies system state.
 * It only inspects integrity, mesh and licence data.
 */

export const runDetection = async (
  snapshot: any,
  meshState: any,
  licence: any
): Promise<Phase10Detection> => {

  const anomalies: Phase10Signal[] = [];

  // Integrity drift check
  if (!snapshot?.valid) {
    anomalies.push({
      type: "integrity-drift",
      message: snapshot?.reason || "Integrity drift detected"
    });
  }

  // Mesh trust anomalies
  if (meshState?.predictedAnomalies?.length > 0) {
    anomalies.push({
      type: "mesh-anomaly",
      message: "Mesh trust anomalies detected",
      detail: meshState.predictedAnomalies
    });
  }

  // Licence failure
  if (!licence?.valid) {
    anomalies.push({
      type: "licence-failure",
      message: licence?.reason || "Licence invalid or tampered"
    });
  }

  return {
    timestamp: Date.now(),
    snapshot,
    meshState,
    licence,
    anomalies,
    sealed: false
  };
};
