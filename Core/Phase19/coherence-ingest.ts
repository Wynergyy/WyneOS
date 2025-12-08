/**
 * Coherence Ingest
 * Collects and normalises inputs from Evidence, Predictive, Behaviour
 * and Telemetry layers to prepare a unified fusion payload.
 */

import { EvidenceManifest } from "../Phase17/evidence-manifest";
import { PredictiveSignal } from "../Phase18/predictive-governor";

export interface BehaviourSignal {
  id: string;
  code: string;
  severity: number;
  timestamp: number;
}

export interface TelemetrySnapshot {
  cpuLoad: number;
  memoryUsage: number;
  processHealth: string;
  timestamp: number;
}

/** Normalised fusion input package */
export interface CoherenceInputBundle {
  evidence: EvidenceManifest;
  predictive: PredictiveSignal;
  behaviour: BehaviourSignal;
  telemetry: TelemetrySnapshot;
  timestamp: number;
}

/**
 * Build a coherence input bundle from four independent signals.
 * Coherence Engine consumes this as its single source of truth.
 */
export function buildCoherenceBundle(
  evidence: EvidenceManifest,
  predictive: PredictiveSignal,
  behaviour: BehaviourSignal,
  telemetry: TelemetrySnapshot
): CoherenceInputBundle {
  return {
    evidence,
    predictive,
    behaviour,
    telemetry,
    timestamp: Date.now()
  };
}
