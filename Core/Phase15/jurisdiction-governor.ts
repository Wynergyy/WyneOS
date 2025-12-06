// Phase 15 — Jurisdiction Governor
// Oversees rule consistency, routing alignment and global governance states.

import { JurisdictionPolicyInstance } from "./jurisdiction-policy";
import { JurisdictionRouterInstance } from "./jurisdiction-router";
import { JurisdictionCode } from "./jurisdiction-model";

export interface GovernanceStatus {
  ok: boolean;
  issues: string[];
  activeJurisdictions: JurisdictionCode[];
}

export class JurisdictionGovernor {
  validate(): GovernanceStatus {
    const issues: string[] = [];

    // Check basic jurisdiction mapping validity
    const mapped = JurisdictionRouterInstance.getSupportedJurisdictions();
    if (mapped.length === 0) {
      issues.push("No jurisdictions registered in router.");
    }

    // Check that policies exist for each jurisdiction
    mapped.forEach(j => {
      const p = JurisdictionPolicyInstance.evaluate(j, 0);
      if (!p.rule) {
        issues.push(`No policy rule for jurisdiction: ${j}`);
      }
    });

    return {
      ok: issues.length === 0,
      issues,
      activeJurisdictions: mapped
    };
  }

  statusReport() {
    const status = this.validate();

    return {
      timestamp: Date.now(),
      ok: status.ok,
      jurisdictions: status.activeJurisdictions,
      issues: status.issues
    };
  }
}

export const JurisdictionGovernorInstance = new JurisdictionGovernor();
