// Phase 15 — Bootstrap
// Initialises all jurisdiction subsystems and returns a readiness report.

import { JurisdictionRouterInstance } from "./jurisdiction-router";
import { JurisdictionPolicyInstance } from "./jurisdiction-policy";
import { JurisdictionGovernorInstance } from "./jurisdiction-governor";
import { JurisdictionEngineInstance } from "./jurisdiction-engine";

export interface Phase15BootstrapReport {
  ready: boolean;
  routes: string[];
  governanceOk: boolean;
  issues: string[];
}

export function bootstrapPhase15(): Phase15BootstrapReport {
  // Load router definitions
  const routes = JurisdictionRouterInstance.getSupportedJurisdictions();

  // Validate governance integrity
  const gov = JurisdictionGovernorInstance.validate();

  return {
    ready: gov.ok && routes.length > 0,
    routes,
    governanceOk: gov.ok,
    issues: gov.issues
  };
}

// Autostart hook for WyneOS
export const Phase15 = {
  start: () => bootstrapPhase15()
};
