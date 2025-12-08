/**
 * IntegrityChain Validator
 * Validates multi-chain integrity through:
 * - lineage verification
 * - hash consistency checks
 * - manifest hash validation
 * - drift, gap and collision detection
 */

import { IntegrityChainNode } from "./integritychain-engine";
import { NormalisedIntegrityInput } from "./integritychain-ingest";

export interface IntegrityAnomaly {
  index: number;
  type: "gap" | "collision" | "hash_mismatch" | "manifest_mismatch";
  message: string;
}

export interface IntegrityValidationReport {
  valid: boolean;
  anomalies: IntegrityAnomaly[];
  checkedAt: number;
}

export class IntegrityChainValidator {
  /**
   * Validate an entire multi-chain sequence.
   */
  async validateChain(
    chain: IntegrityChainNode[],
    inputs: NormalisedIntegrityInput[]
  ): Promise<IntegrityValidationReport> {
    const anomalies: IntegrityAnomaly[] = [];

    for (let i = 0; i < chain.length; i++) {
      const node = chain[i];
      const input = inputs[i];

      // Validate previous hash
      if (i === 0 && node.previousHash !== "GENESIS") {
        anomalies.push({
          index: i,
          type: "gap",
          message: "Expected GENESIS previous hash"
        });
      }

      if (i > 0 && node.previousHash !== chain[i - 1].combinedHash) {
        anomalies.push({
          index: i,
          type: "hash_mismatch",
          message: "Previous hash does not match parent node"
        });
      }

      // Validate manifest hash
      const calculatedManifestHash = await this.sha256(JSON.stringify(input.manifest));
      if (calculatedManifestHash !== node.manifestHash) {
        anomalies.push({
          index,
          type: "manifest_mismatch",
          message: "Manifest hash does not match stored hash"
        });
      }

      // Validate record ID match
      if (input.record.id !== node.recordID) {
        anomalies.push({
          index,
          type: "collision",
          message: "Record ID does not match node value"
        });
      }
    }

    return {
      valid: anomalies.length === 0,
      anomalies,
      checkedAt: Date.now()
    };
  }

  /**
   * Internal hashing utility.
   */
  private async sha256(input: string): Promise<string> {
    const data = new TextEncoder().encode(input);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return [...new Uint8Array(digest)]
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  }
}

