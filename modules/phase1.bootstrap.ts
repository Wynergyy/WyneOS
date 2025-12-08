/**
 * WyneOS Phase 1 Bootstrap Module
 * Combines activation and discovery into a single initial bootstrap step.
 */

import { phase1Activator } from "./activate.phase1";
import { phase1Discovery } from "./discover.phase1";

export interface Phase1BootstrapResult {
  ok: boolean;
  timestamp: number;
  activation: {
    ok: boolean;
    details?: string;
  };
  discovery: Record<string, unknown>;
}

export class Phase1Bootstrap {
  bootstrap(): Phase1BootstrapResult {
    const activation = phase1Activator.activate();
    const discovery = phase1Discovery.discover();

    return {
      ok: activation.ok && discovery.ok,
      timestamp: Date.now(),
      activation: {
        ok: activation.ok,
        details: activation.details
      },
      discovery: discovery.discovered
    };
  }
}

export const phase1Bootstrap = new Phase1Bootstrap();
