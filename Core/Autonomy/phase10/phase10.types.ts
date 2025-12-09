/**
 * WyneOS Phase 10 – Core Type Definitions
 * Centralised type models used by:
 * - enforcement-gate.ts
 * - detection-engine.ts
 * - analysis-engine.ts
 * - simulation-engine.ts
 * - state-provider.ts
 * - propagation-engine.ts
 * - zero-trust-validator.ts
 * - test-harness.ts
 *
 * This file stabilises all Phase 10 CI failures caused by
 * missing / incomplete interfaces.
 */

/* ---------- Base Models ---------- */

export type Phase10Action =
  | "ALLOW"
  | "DENY"
  | "FLAG"
  | "ESCALATE";

export interface Phase10Risk {
  level: "low" | "medium" | "high" | "critical";
  score: number;
  reason?: string;
}

export interface Phase10Rationale {
  summary: string;
  details?: string;
}

/* ---------- Enforcement Request ---------- */

export interface Phase10EnforcementRequest {
  id: string;
  timestamp: number;

  action: Phase10Action;
  risk: Phase10Risk;
  rationale: Phase10Rationale;

  simulation?: Phase10Simulation;
}

/* ---------- Enforcement Result ---------- */

export interface Phase10EnforcementResult {
  id: string;
  approved: boolean;
  action: Phase10Action;
  risk: Phase10Risk;
  rationale: Phase10Rationale;
  timestamp: number;

  simulationResults?: Phase10SimulationResult[];
}

/* ---------- Simulation Models ---------- */

export interface Phase10Simulation {
  scenario: string;
  iterations: number;
  seed?: number;
}

export interface Phase10SimulationResult {
  iteration: number;
  outcome: "pass" | "fail" | "neutral";
  riskDelta: number;
}

/* ---------- State Snapshot ---------- */

export interface Phase10StateSnapshot {
  lastUpdate: number;
  requests: Phase10EnforcementRequest[];
  results: Phase10EnforcementResult[];
  simulationHistory: Phase10SimulationResult[];
}
