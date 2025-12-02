/* ------------------------------------------------------------
   SENTINEL ORCHESTRATOR v5
   Purpose:
   - Collect and unify outputs from all Sentinel modules
   - Produce a hardened composite anomaly score
   - Feed TelemetryMatrix, Guardian Mesh, Bamfy, JJJ, Susanne
   - Ensure consistent, predictable monitoring cycles
------------------------------------------------------------ */

import { captureSystemSnapshot, analyseSystem } from "./sentinel.system";
import { captureBehaviourSnapshot, analyseBehaviour } from "./sentinel.behaviour";
import { captureFlowSnapshot, analyseFlow } from "./sentinel.flow";

export interface SentinelComposite {
  timestamp: string;
  systemScore: number;
  behaviourScore: number;
  flowScore: number;
  compositeScore: number;
}

export async function runSentinelCycle(): Promise<SentinelComposite> {
  const timestamp = new Date().toISOString();

  // Capture snapshots
  const systemSnap = captureSystemSnapshot();
  const behaviourSnap = await captureBehaviourSnapshot();
  const flowSnap = await captureFlowSnapshot();

  // Analyse snapshots
  const systemScore = analyseSystem(systemSnap);
  const behaviourScore = analyseBehaviour(behaviourSnap);
  const flowScore = analyseFlow(flowSnap);

  // Composite anomaly score (hardened weighting strategy)
  const compositeScore = (
    systemScore * 0.3 +
    behaviourScore * 0.4 +
    flowScore * 0.3
  );

  return {
    timestamp,
    systemScore,
    behaviourScore,
    flowScore,
    compositeScore
  };
}
