/**
 * IntegrityChain Ingest
 * Normalises evidence records, chain entries and manifests for
 * multi-chain linking and chain-of-custody expansion.
 */

import { EvidenceManifest } from "../Phase17/evidence-manifest";
import { EvidenceChainEntry } from "../Phase17/evidence-contracts";
import { EvidenceRecord } from "../Phase17/evidence-contracts";

export interface NormalisedIntegrityInput {
  record: EvidenceRecord;
  chainEntry: EvidenceChainEntry;
  manifest: EvidenceManifest;
  timestamp: number;
}

/**
 * Prepare an EvidenceManifest and its components for multi-chain processing.
 */
export function buildIntegrityChainInput(
  record: EvidenceRecord,
  chainEntry: EvidenceChainEntry,
  manifest: EvidenceManifest
): NormalisedIntegrityInput {
  return {
    record,
    chainEntry,
    manifest,
    timestamp: Date.now()
  };
}
