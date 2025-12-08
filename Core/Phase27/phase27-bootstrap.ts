/**
 * Phase 27 Bootstrap
 * Drives the complete ExecutionGrid Layer:
 *   Ingest → Engine → Executor
 * Produces actionable execution batches for WyneOS runtime behaviour.
 */

import {
  ExecutionGridIngest,
  ExecutionGridEngine,
  ExecutionGridExecutor
} from "./executiongrid-index";

export class Phase27Bootstrap {
  private ingest = new ExecutionGridIngest();
  private engine = new ExecutionGridEngine();
  private executor = new ExecutionGridExecutor();

  private lastGrid: any = null;

  /**
   * Run a full execution grid cycle.
   * Accepts orchestrated frames and system inputs.
   * Produces an actionable execution batch.
   */
  cycle(input: {
    frame?: any;
    fusion?: any;
    sync?: any;
    source?: string;
  }) {
    // Step 1: Build execution bundle
    const bundle = this.ingest.buildBundle(input);

    // Step 2: Compute execution priorities, routing, and outcomes
    const grid = this.engine.compute(bundle);

    // Step 3: Execute routed actions and produce a dispatch report
    const dispatch = this.executor.execute(grid);

    // Persist last grid frame
    this.lastGrid = grid;

    return {
      bundle,
      grid,
      dispatch,
      timestamp: Date.now()
    };
  }
}
