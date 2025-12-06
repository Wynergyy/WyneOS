/**
 * Evidence Contracts
 * Stable TypeScript interfaces for evidence lifecycle, chain entries,
 * audit metadata, jurisdictional routing and risk scoring.
 * These are consumed by upstream phases and must remain backwards compatible.
 */

/** Canonical structure of a single evidence record */
export interface EvidenceRecord {
  id: string;
  timestamp: number;
  source: string;
  category: string;
  payload: unknown;
  hash: string;
}

/** Captures audit actions applied to an evidence item */
export interface EvidenceAuditEntry {
  evidenceID: string;
  timestamp: number;
  action: string;
  actor: string;
  note?: string;
  integrityHash: string;
}

/** Chained structure linking evidence entries in sequence */
export interface EvidenceChainEntry {
  index: number;
  evidence: EvidenceRecord;
  previousHash: string;
  chainHash: string;
  riskScore: number;
}

/** Jurisdiction routing metadata */
export interface EvidenceJurisdiction {
  region: string;
  classification: string;
  retentionPolicyDays: number;
  specialHandling: boolean;
}

/** Result returned by EvidenceEngine when ingesting evidence */
export interface EvidenceIngestResult {
  ok: boolean;
  reason?: string;
  record?: EvidenceRecord;
  chainEntry?: EvidenceChainEntry;
}

/** Risk scoring output contract */
export interface EvidenceRiskScore {
  score: number;
  factors: string[];
}
