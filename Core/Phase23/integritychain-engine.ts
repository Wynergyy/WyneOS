/**
 * IntegrityChain Engine
 * Extends the base hashing model with multi-chain linking,
 * lineage stitching and chain-of-custody propagation.
 */

import { NormalisedIntegrityInput } from "./integritychain-ingest";

export interface IntegrityChainNode {
  index: number;
  recordID: string;
  previousHash: string;
  combinedHash: string;
  manifestHash: string;
  timestamp: number;
}

export class IntegrityChainEngine {
  private chain: IntegrityChainNode[] = [];

  /**
   * Generate a SHA-256 hex digest from a string.
   */
  private async sha256(input: string): Promise<string> {
    const data = new TextEncoder().encode(input);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return [...new Uint8Array(digest)]
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  }

  /**
   * Ingest a normalised integrity bundle and extend the multi-chain.
   */
  async extend(input: NormalisedIntegrityInput): Promise<IntegrityChainNode> {
    const index = this.chain.length;

    const previousHash = index > 0 ? this.chain[index - 1].combinedHash : "GENESIS";

    const manifestHash = await this.sha256(JSON.stringify(input.manifest));

    const combinedString =
      input.record.id +
      previousHash +
      JSON.stringify(input.chainEntry) +
      manifestHash +
      input.timestamp;

    const combinedHash = await this.sha256(combinedString);

    const node: IntegrityChainNode = {
      index,
      recordID: input.record.id,
      previousHash,
      combinedHash,
      manifestHash,
      timestamp: Date.now()
    };

    this.chain.push(node);
    return node;
  }

  /**
   * Retrieve the full chain.
   */
  getChain(): IntegrityChainNode[] {
    return [...this.chain];
  }
}
