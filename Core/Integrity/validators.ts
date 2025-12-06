import { hashObject } from "./hasher";

export interface IntegrityRecord {
  hash: string;
  timestamp: number;
}

export function validateIntegrity(input: unknown, record: IntegrityRecord) {
  const computed = hashObject(input);

  return {
    valid: computed === record.hash,
    expected: record.hash,
    actual: computed,
    timestamp: record.timestamp
  };
}
