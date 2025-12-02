/* ------------------------------------------------------------
   TELEMETRYMATRIX v2: CONTROLLER
   Purpose:
   - Central manager of telemetry flow
   - Hands data to AI Guard, Guardian Mesh, Bamfy, JJJ, Susanne
   - Maintains hardened data lifecycle
------------------------------------------------------------ */

import { buildTelemetryPacket } from "./telemetry.packet";
import { analyseSignals } from "../guardian/guardian.mesh";

export async function processTelemetry(
  rawScore: number
) {
  const packet = await buildTelemetryPacket(rawScore);

  const guardianScore = await analyseSignals({
    errorRate: rawScore,
    latencySpike: rawScore > 0.1,
    driftDetected: packet.driftScore > 0.0001,
    unexpectedPattern: rawScore > 0.2,
    sourceSignature: packet.signature
  });

  return {
    packet,
    guardianScore
  };
}
