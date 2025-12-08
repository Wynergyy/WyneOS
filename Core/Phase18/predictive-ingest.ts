/**
 * Predictive Ingest
 * Converts EvidenceManifest objects into structured predictive features.
 * This is the entry point for the Predictive Integrity Layer.
 */

import { EvidenceManifest } from "../Phase17/evidence-manifest";

export interface PredictiveFeatures {
  evidenceID: string;
  timestamp: number;
  category: string;
  source: string;
  riskScore: number;
  jurisdiction: string;
  auditCount: number;
  chainDepth: number;
  anomalyFlags: string[];
}

/**
 * Convert a raw EvidenceManifest into predictive features.
 * This normalises all inputs for the predictive engine.
 */
export function buildPredictiveFeatures(
  manifest: EvidenceManifest
): PredictiveFeatures {
  const anomalyFlags: string[] = [];

  // Example heuristic flags
  if (manifest.risk.score > 80) anomalyFlags.push("high_risk");
  if (manifest.auditTrail.length > 10) anomalyFlags.push("excessive_audit");
  if (manifest.chain.index > 1000) anomalyFlags.push("deep_chain");

  return {
    evidenceID: manifest.record.id,
    timestamp: manifest.record.timestamp,
    category: manifest.record.category,
    source: manifest.record.source,
    riskScore: manifest.risk.score,
    jurisdiction: manifest.jurisdiction.region,
    auditCount: manifest.auditTrail.length,
    chainDepth: manifest.chain.index,
    anomalyFlags
  };
}
