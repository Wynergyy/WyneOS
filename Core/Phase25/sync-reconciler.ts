/**
 * Phase 25 — Sync Reconciler
 * Compares previous SyncState with the newly computed one to detect:
 *  - drift
 *  - regressions
 *  - stability changes
 *  - forward-only evolution
 */

import { SyncState } from "./sync-engine";

export interface ReconciliationResult {
  previous: SyncState | null;
  current: SyncState;
  driftScore: number;
  forwardOnly: boolean;
  changes: string[];
  reconciledAt: number;
}

export class SyncReconciler {
  /**
   * Evaluate differences between previous state and the latest computed state.
   */
  reconcile(previous: SyncState | null, current: SyncState): ReconciliationResult {
    const changes: string[] = [];

    // Compute basic drift score
    const driftScore = this.calculateDrift(previous, current);

    // Determine if any regression occurred
    const forwardOnly = !this.detectRegression(previous, current, changes);

    return {
      previous,
      current,
      driftScore,
      forwardOnly,
      changes,
      reconciledAt: Date.now()
    };
  }

  private calculateDrift(prev: SyncState | null, curr: SyncState): number {
    if (!prev) return 0;

    // Simple checksum difference as drift approximation
    return prev.checksum === curr.checksum ? 0 : 1;
  }

  private detectRegression(
    prev: SyncState | null,
    curr: SyncState,
    changes: string[]
  ): boolean {
    if (!prev) return false;

    // Example: fewer processes than before could indicate rollback
    if (curr.processState.length < prev.processState.length) {
      changes.push("Process count decreased");
      return true;
    }

    return false;
  }
}
