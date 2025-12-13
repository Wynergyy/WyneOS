/**
 * Phase 5 – Predictive Graph
 *
 * Maintains a bounded, deterministic history of predictive events
 * and provides correlation utilities for higher-level analysis.
 *
 * No side effects outside controlled state mutation.
 * No I/O.
 */

export interface PredictiveNode {
  readonly timestamp: number;
  readonly type: string;
  readonly value?: unknown;
}

const MAX_HISTORY_SIZE = 1000;

export class PredictiveGraph {
  private static history: PredictiveNode[] = [];

  static record(event: PredictiveNode): void {
    this.history.push(Object.freeze({ ...event }));

    if (this.history.length > MAX_HISTORY_SIZE) {
      this.history.shift();
    }
  }

  static getLast(count: number): readonly PredictiveNode[] {
    return this.history.slice(-count);
  }

  static getAll(): readonly PredictiveNode[] {
    return this.history.slice();
  }

  static correlation(type: string): number {
    return this.history.filter((h) => h.type === type).length;
  }

  static size(): number {
    return this.history.length;
  }
}
