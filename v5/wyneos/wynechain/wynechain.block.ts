import crypto from "crypto";

export interface WyneChainBlock {
  index: number;
  timestamp: string;
  previousHash: string;
  stateHash: string;
  merkleRoot: string;
  data: any;
  signature: string;
}

export function createBlock(
  index: number,
  previousHash: string,
  data: any
): WyneChainBlock {
  const timestamp = new Date().toISOString();

  const stateHash = hash(JSON.stringify(data));
  const merkleRoot = stateHash; // simplified for initial v2 structure

  const block: WyneChainBlock = {
    index,
    timestamp,
    previousHash,
    stateHash,
    merkleRoot,
    data,
    signature: ""
  };

  block.signature = signBlock(block);
  return block;
}

export function hash(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export function signBlock(block: WyneChainBlock): string {
  const payload =
    block.index +
    block.timestamp +
    block.previousHash +
    block.stateHash +
    block.merkleRoot;

  return hash(payload);
}
