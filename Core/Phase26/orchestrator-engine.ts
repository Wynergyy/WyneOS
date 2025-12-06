/**
 * Phase 26 — Orchestrator Engine
 * Computes system-wide coordinated behaviour from an OrchestrationBundle.
 * Includes routing, directive consolidation and multi-module coordination.
 */

import { OrchestrationBundle } from "./orchestrator-ingest";

export interface OrchestrationPlan {
  tasks: string[];
  priority: "low" | "normal" | "high" | "critical";
  routing: string[];
  timestamp: number;
}

export class OrchestratorEngine {
  /**
   * Generate an orchestration plan for downstream schedulers and governors.
   */
  generatePlan(bundle: OrchestrationBundle): OrchestrationPlan {
    const tasks: string[] = [];
    const routing: string[] = [];

    // Base tasks derived from sync state
    if (bundle.syncState) {
      tasks.push("evaluate_sync_state");
      routing.push("sync-governor");
    }

    // Incorporate external directives
    for (const directive of bundle.directives ?? []) {
      tasks.push(`directive:${directive.type ?? "unknown"}`);
    }

    // Incorporate signals
    for (const signal of bundle.signals ?? []) {
      tasks.push(`signal:${signal.code ?? "generic"}`);
    }

    // Priority scoring
    const priority = this.computePriority(bundle);

    return {
      tasks,
      priority,
      routing,
      timestamp: Date.now()
    };
  }

  private computePriority(bundle: OrchestrationBundle): "low" | "normal" | "high" | "critical" {
    const hasCriticalSignal = bundle.signals?.some(s => s.level === "critical");
    const hasHighDirective = bundle.directives?.some(d => d.priority === "high");

    if (hasCriticalSignal) return "critical";
    if (hasHighDirective) return "high";
    return "normal";
  }
}
