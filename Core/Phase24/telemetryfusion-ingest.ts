/**
 * TelemetryFusion Ingest
 * Collects raw telemetry signals across all WyneOS subsystems:
 * - Process Layer
 * - Autonomy Layer
 * - Guardian Layer
 * - IntegrityChain Layer
 * - Native System Telemetry
 *
 * Outputs a unified fusion-ready telemetry package.
 */

import { ProcessAssessment } from "../Phase22/process-engine";
import { AutonomyAssessment } from "../Phase21/autonomy-engine";
import { GuardianAssessment } from "../Phase20/guardian-engine";
import { IntegrityChainNode } from "../Phase23/integritychain-engine";

export interface NativeSystemTelemetry {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  uptime: number;
  timestamp: number;
}

export interface TelemetryFusionBundle {
  process: ProcessAssessment;
  autonomy: AutonomyAssessment;
  guardian: GuardianAssessment;
  integrity: IntegrityChainNode[];
  native: NativeSystemTelemetry;
  timestamp: number;
}

/**
 * Build a fusion telemetry bundle from upstream subsystem inputs.
 */
export function buildTelemetryFusionBundle(
  process: ProcessAssessment,
  autonomy: AutonomyAssessment,
  guardian: GuardianAssessment,
  integrity: IntegrityChainNode[],
  native: NativeSystemTelemetry
): TelemetryFusionBundle {
  return {
    process,
    autonomy,
    guardian,
    integrity,
    native,
    timestamp: Date.now()
  };
}
