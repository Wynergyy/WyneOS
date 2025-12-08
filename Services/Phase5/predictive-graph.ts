/**
 * Phase 5 – PredictiveGraph
 * Builds temporal sequences and event correlations.
 */

export interface PredictiveNode {
  timestamp: number;
  type: string;
  value: any;
}

export class PredictiveGraph {
  private static history: PredictiveNode[] = [];

  static record(evt: PredictiveNode) {
    this.history.push(evt);
  }

  static getLast(n: number = 10) {
    return this.history.slice(-n);
  }

  static getAll() {
    return this.history;
  }

  static correlation(type: string) {
    return this.history.filter(h => h.type === type).length;
  }
}
