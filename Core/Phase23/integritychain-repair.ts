/**
 * IntegrityChain Repair
 * Provides correction, reconstruction and healing logic for
 * multi-chain integrity drift. Works alongside Autonomy and
 * Process Layers to restore canonical chain-of-custody.
 */

import { IntegrityChainNode } from "./integritychain-engine";
import { NormalisedIntegrityInput } from "./integritychain-ingest";

export interface RepairResult {
  repaired: boolean;
  repairedChain: IntegrityChainNode[];
  actions: string[];
  timestamp: number;
}

export class IntegrityChainRepair {
  /**
   * Rebuild the chain from scratch using canonical inputs.
   * Returns a fully reconstructed chain.
   */
  async rebuildChain(
    inputs: NormalisedIntegrityInput[],
    hasher: (input: string) => Promise<string>
  ): Promise<IntegrityChainNode[]> {
    const repaired: IntegrityChainNode[] = [];

    for (let i = 0; i < inputs.length; i++) {
      const current = inputs[i];
      const previousNode = repaired[i - 1];

      const previousHash =
        i === 0 ? "GENESIS" : previousNode.combinedHash;

      const manifestHash = await hasher(JSON.stringify(current.manifest));

      const combinedString =
        current.record.id +
        previousHash +
        JSON.stringify(current.chainEntry) +
        manifestHash +
        current.timestamp;

      const combinedHash = await hasher(combinedString);

      repaired.push({
        index: i,
        recordID: current.record.id,
        previousHash,
        combinedHash,
        manifestHash,
        timestamp: Date.now()
      });
    }

    return repaired;
  }

  /**
   * Attempt partial repair when only one or a few nodes drift from the chain.
   * Full reconstruction will be performed if partial healing is impossible.
   */
  async heal(
    chain: IntegrityChainNode[],
    inputs: NormalisedIntegrityInput[],
    hasher: (input: string) => Promise<string>
  ): Promise<RepairResult> {
    const actions: string[] = [];

    // Quick structural validation
    if (chain.length !== inputs.length) {
      actions.push("length_mismatch_detected", "full_rebuild_required");

      const rebuilt = await this.rebuildChain(inputs, hasher);
      return {
        repaired: true,
        repairedChain: rebuilt,
        actions,
        timestamp: Date.now()
      };
    }

    // Attempt incremental healing
    const repaired = [...chain];
    let fullRebuild = false;

    for (let i = 0; i < repaired.length; i++) {
      const node = repaired[i];
      const input = inputs[i];

      // Check record ID consistency
      if (node.recordID !== input.record.id) {
        actions.push(`collision_at_${i}`, "full_rebuild_required");
        fullRebuild = true;
        break;
      }

      // Validate manifest hash
      const correctManifestHash = await hasher(JSON.stringify(input.manifest));
      if (correctManifestHash !== node.manifestHash) {
        actions.push(`manifest_mismatch_at_${i}`, "node_repaired");

        node.manifestHash = correctManifestHash;
      }

      // Validate previous hash lineage
      if (i === 0) {
        if (node.previousHash !== "GENESIS") {
          actions.push("invalid_genesis", "corrected");
          node.previousHash = "GENESIS";
        }
      } else {
        const correctPrevious = repaired[i - 1].combinedHash;
        if (node.previousHash !== correctPrevious) {
          actions.push(`lineage_break_at_${i}`, "corrected");
          node.previousHash = correctPrevious;
        }
      }

      // Recompute combined hash
      const newCombinedString =
        input.record.id +
        node.previousHash +
        JSON.stringify(input.chainEntry) +
        node.manifestHash +
        input.timestamp;

      node.combinedHash = await hasher(newCombinedString);

      repaired[i] = node;
    }

    // If partial healing failed, perform a full rebuild.
    if (fullRebuild) {
      const rebuilt = await this.rebuildChain(inputs, hasher);
      return {
        repaired: true,
        repairedChain: rebuilt,
        actions,
        timestamp: Date.now()
      };
    }

    return {
      repaired: true,
      repairedChain: repaired,
      actions,
      timestamp: Date.now()
    };
  }
}
