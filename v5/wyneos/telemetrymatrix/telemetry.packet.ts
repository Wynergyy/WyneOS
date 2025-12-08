/* ------------------------------------------------------------
   TELEMETRYMATRIX v2: PACKET BUILDER
   Purpose:
   - Produce signed telemetry packets for AI Guard, Guardian Mesh,
     HannahBannah, Bamfy, and JJJ
   - Keep the packet structure consistent and verifiable
------------------------------------------------------------ */

import { getDriftScore } from "./drift.detector";

export interface TelemetryPacket {
  signature: string;
  anomalyScore: number;
  driftScore: number;
  timestamp: string;
}

export async function buildTelemetryPacket(
  anomalyScore: number
): Promise<TelemetryPacket> {
  
  const driftScore = await getDriftScore();
  const timestamp = new Date().toISOString();

  return {
    signature: `WYNEOS-SIGN-${timestamp}`,
    anomalyScore,
    driftScore,
    timestamp
  };
}
