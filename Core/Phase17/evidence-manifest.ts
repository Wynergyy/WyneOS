/**
 * Evidence Manifest
 * Canonical schema describing complete evidence lifecycle metadata.
 * This manifest provides a single authoritative view of an evidence item,
 * its chain position, jurisdictional routing and associated audit history.
 */

import {
  EvidenceRecord,
  EvidenceAuditEntry,
  EvidenceChainEntry,
  EvidenceJurisdiction,
  EvidenceRiskScore
} from "./evidence-contracts";

/** Full manifest representing one evidence item and its linked metadata */
export interface EvidenceManifest {
  /** Raw evidence record */
  record: EvidenceRecord;

  /** Latest chain entry representing this evidence */
  chain: EvidenceChainEntry;

  /** Jurisdiction routing metadata */
  jurisdiction: EvidenceJurisdiction;

  /** Audit history items associated with this evidence */
  auditTrail: EvidenceAuditEntry[];

  /** Current risk score profile */
  risk: EvidenceRiskScore;

  /** When the manifest was generated */
  generatedAt: number;

  /** Version stamp for compatibility */
  schemaVersion: string;
}

/**
 * Create a canonical evidence manifest from discrete components.
 * All upstream systems should rely on this constructor to ensure
 * stable structure across the WyneOS Evidence Layer.
 */
export function buildEvidenceManifest(
  record: EvidenceRecord,
  chain: EvidenceChainEntry,
  jurisdiction: EvidenceJurisdiction,
  auditTrail: EvidenceAuditEntry[],
  risk: EvidenceRiskScore,
  schemaVersion = "1.0.0"
): EvidenceManifest {
  return {
    record,
    chain,
    jurisdiction,
    auditTrail,
    risk,
    generatedAt: Date.now(),
    schemaVersion
  };
}
