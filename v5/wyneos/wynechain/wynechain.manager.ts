import { createBlock, WyneChainBlock, hash } from "./wynechain.block";
import { auditEvent } from "../auditgrid/audit.logger";

export class WyneChain {
  private chain: WyneChainBlock[] = [];

  constructor() {
    // Genesis block
    const genesis = createBlock(0, "0", { genesis: true });
    this.chain.push(genesis);
  }

  public getLatestBlock(): WyneChainBlock {
    return this.chain[this.chain.length - 1];
  }

  public addBlock(data: any): WyneChainBlock {
    const previousBlock = this.getLatestBlock();
    const newBlock = createBlock(
      previousBlock.index + 1,
      previousBlock.signature,
      data
    );

    this.chain.push(newBlock);
    auditEvent("CHAIN_BLOCK_ADDED", { index: newBlock.index });

    return newBlock;
  }

  public validateChain(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];

      const recalculatedHash = hash(
        current.index +
          current.timestamp +
          current.previousHash +
          current.stateHash +
          current.merkleRoot
      );

      if (current.signature !== recalculatedHash) {
        auditEvent("CHAIN_VALIDATION_FAILURE", { index: current.index });
        return false;
      }

      if (current.previousHash !== previous.signature) {
        auditEvent("CHAIN_LINK_BROKEN", { index: current.index });
        return false;
      }
    }

    return true;
  }
}

export const WyneChainInstance = new WyneChain();
