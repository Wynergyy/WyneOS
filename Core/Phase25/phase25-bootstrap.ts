/**
 * Phase 25 Bootstrap
 * Drives the full Sync Evolution Layer:
 *   Ingest → Engine → Reconciler
 * Produces deterministic synchronised system state.
 */

import {
  SyncIngest,
  SyncEngine,
  SyncReconciler
} from "./sync-index";

export class Phase25Bootstrap {
  private ingest = new SyncIngest();
  private engine = new SyncEngine();
  private reconciler = new SyncReconciler();

  private lastState: any = null;

  /**
   * Run a full sync cycle.
   * Accepts raw upstream data and returns a reconciled SyncState package.
   */
  cycle(input: {
    fusion?: any;
    telemetry?: any;
    processes?: any[];
    source?: string;
  }) {
    // Step 1: Normalise incoming signals
    const bundle = this.ingest.buildBundle(input);

    // Step 2: Compute the new SyncState
    const nextState = this.engine.compute(bundle);

    // Step 3: Reconcile with the previous state
    const result = this.reconciler.reconcile(this.lastState, nextState);

    // Update last known state
    this.lastState = nextState;

    return {
      bundle,
      nextState,
      reconciliation: result,
      timestamp: Date.now()
    };
  }
}
