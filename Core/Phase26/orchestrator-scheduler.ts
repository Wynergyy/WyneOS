/**
 * Orchestrator Scheduler
 * Controls cycle timing and dispatches orchestrated execution frames.
 */

import { OrchestratorFrame } from "./orchestrator-engine";

export class OrchestratorScheduler {
  private interval: NodeJS.Timeout | null = null;
  private cycleMs = 250; // 4 cycles per second default

  constructor(cycleMs?: number) {
    if (cycleMs && cycleMs > 0) {
      this.cycleMs = cycleMs;
    }
  }

  /**
   * Start scheduled orchestration cycles.
   * The callback receives an OrchestratorFrame produced by the engine.
   */
  start(callback: () => OrchestratorFrame) {
    if (this.interval) return;

    this.interval = setInterval(() => {
      try {
        callback();
      } catch (err) {
        console.error("Scheduler cycle error:", err);
      }
    }, this.cycleMs);
  }

  /**
   * Stop all timing cycles.
   */
  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  /**
   * Update timing interval.
   */
  setIntervalMs(ms: number) {
    if (ms <= 0) return;
    this.cycleMs = ms;

    // Restart if running
    if (this.interval) {
      this.stop();
      this.start(() => {
        throw new Error("Scheduler restart requires callback injection");
      });
    }
  }
}
