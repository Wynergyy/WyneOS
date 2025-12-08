/**
 * WyneOS Phase 4 Behaviour Log
 * Records basic behaviour evaluation events.
 */

export interface BehaviourLogEntry {
  timestamp: number;
  event: string;
}

export class BehaviourLog {
  private entries: BehaviourLogEntry[] = [];

  record(event: string): void {
    this.entries.push({
      timestamp: Date.now(),
      event
    });
  }

  getLogs(): BehaviourLogEntry[] {
    return [...this.entries];
  }
}

export const behaviourLog = new BehaviourLog();
