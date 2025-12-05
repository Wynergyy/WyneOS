/**
 * PHASE 10 TYPES
 * Shared interfaces for Detection, Analysis, Simulation, Enforcement,
 * Propagation, Zero-Trust validation, Telemetry Sealing, and State Provider.
 */

export interface Phase10Signal {
  type: string;
  message: string;
  detail?: any;
}

export interface Phase10Detection {
  timestamp: number;
  snapshot: any;
  meshState: any;
  licence: any;
  anomalies: Phase10Signal[];
  sealed: boolean;
}

export interface Phase10ActionPlan {
  action: string;
  risk: "low" | "medium" | "high";
  rationale: string;
}

export interface Phase10Analysis {
  timestamp: number;
  detection: Phase10Detection;
  recommended: Phase10ActionPlan[];
  sealed: boolean;
}

export interface Phase10SimResult {
  action: string;
  simulated: boolean;
  risk: string;
  outcome: string;
  rationale: string;
}

export interface Phase10Simulation {
  timestamp: number;
  analysis: Phase10Analysis;
  results: Phase10SimResult[];
  sealed: boolean;
}

export interface Phase10EnforcementRequest {
  timestamp: number;
  simulation: Phase10Simulation;
  approved: boolean;
  reason: string;
  sealed: boolean;
}

export interface Phase10EnforcementResult {
  timestamp: number;
  executed: boolean;
  reason: string;
  sealed: boolean;
}

export interface Phase10PropagationResult {
  timestamp: number;
  propagated: boolean;
  reason: string;
  sealed: boolean;
}

export interface Phase10ZeroTrustReport {
  timestamp: number;
  modules: { module: string; valid: boolean; reason: string }[];
  sealed: boolean;
}

export interface Phase10Sealed<T> {
  data: T;
  seal: string;
  sealedAt: number;
}

/**
 * Unified Input Bundle for Phase 10
 * This comes from the Phase 10 State Provider.
 */
export interface Phase10StateBundle {
  timestamp: number;
  integrity: any;
  mesh: any;
  licence: any;
}
