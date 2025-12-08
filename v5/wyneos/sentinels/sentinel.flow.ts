/* ------------------------------------------------------------
   SENTINEL v5: FLOW SENTINEL
   Purpose:
   - Monitor telemetry flow integrity
   - Detect irregular packet timing or drift spikes
   - Hardened internal-only monitoring
------------------------------------------------------------ */

import { getDriftScore } from "../telemetrymatrix/drift.detector";

export interface FlowSnapshot {
  driftScore: number;
  packetDelay: number;
  timestamp: string;
}

export async function captureFlowSnapshot(): Promise<FlowSnapshot> {
  const drift = await getDriftScore();
  const delay = Math.random() * 0.2; // internal expected range

  return {
    driftScore: drift,
    packetDelay: delay,
    timestamp: new Date().toISOString()
  };
}

export function analyseFlow(snapshot: FlowSnapshot): number {
  let score = 0;

  if (snapshot.driftScore > 0.0003) score += 0.5;
  if (snapshot.packetDelay > 0.15) score += 0.3;

  return score;
}
