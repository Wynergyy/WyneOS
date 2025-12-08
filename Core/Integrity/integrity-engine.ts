import { createSnapshot } from "./snapshot";
import { validateIntegrity, IntegrityRecord } from "./validators";

export class IntegrityEngine {
  create(input: unknown) {
    return createSnapshot(input);
  }

  verify(input: unknown, record: IntegrityRecord) {
    return validateIntegrity(input, record);
  }

  verifySnapshot(snapshot: { hash: string; timestamp: number; data: unknown }) {
    return validateIntegrity(snapshot.data, {
      hash: snapshot.hash,
      timestamp: snapshot.timestamp
    });
  }
}
