/**
 * WyneOS Snapshot Utility – Phase 0.2
 * Creates secure JSON snapshots of system state for recovery.
 */

import { Hasher } from "./hasher";

export class Snapshot {
  static create(state: any) {
    const signature = Hasher.hashObject(state);
    return {
      timestamp: new Date().toISOString(),
      signature,
      state
    };
  }
}
