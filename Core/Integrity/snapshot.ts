import { hashObject } from "./hasher";

export function createSnapshot(input: unknown) {
  return {
    hash: hashObject(input),
    timestamp: Date.now(),
    data: input
  };
}
