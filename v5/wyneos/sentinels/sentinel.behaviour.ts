/* ------------------------------------------------------------
   SENTINEL v5: BEHAVIOUR SENTINEL
   Purpose:
   - Track module behaviour patterns
   - Detect deviations using LoopyLou fingerprints
   - Produce safe anomaly scores for Guardian Mesh
------------------------------------------------------------ */

import { generatePatternFingerprint } from "../loopylou/loopylou.engine";

export interface BehaviourSnapshot {
  fingerprint: number;
  deviation: number;
  timestamp: string;
}

export async function captureBehaviourSnapshot(): Promise<BehaviourSnapshot> {
  const fp = await generatePatternFingerprint();
  const now = Date.now() % 1000;
  const deviation = Math.abs(fp - (now / 1000));

  return {
    fingerprint: fp,
    deviation,
    timestamp: new Date().toISOString()
  };
}

export function analyseBehaviour(snapshot: BehaviourSnapshot): number {
  if (snapshot.deviation > 0.25) return 0.6;
  if (snapshot.deviation > 0.10) return 0.3;
  return 0.05;
}
