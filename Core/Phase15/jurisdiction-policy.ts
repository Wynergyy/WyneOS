// Phase 15 — Jurisdiction Policy
// Defines rules that determine how jurisdiction decisions must be enforced.

import { JurisdictionCode } from "./jurisdiction-model";

export interface JurisdictionRule {
  id: string;
  appliesTo: JurisdictionCode[];
  minSensitivity: number; // minimum sensitivity threshold required
  enforceAudit: boolean;
  escalation?: string; // e.g. "LEGAL", "GOVERNANCE", "SECURITY"
}

export class JurisdictionPolicy {
  private rules: JurisdictionRule[] = [
    {
      id: "UK-GDPR-HIGH",
      appliesTo: ["UK"],
      minSensitivity: 7,
      enforceAudit: true,
      escalation: "LEGAL"
    },
    {
      id: "EU-GDPR-STRICT",
      appliesTo: ["EU"],
      minSensitivity: 5,
      enforceAudit: true,
      escalation: "LEGAL"
    },
    {
      id: "GLOBAL-MINIMAL",
      appliesTo: ["GLOBAL"],
      minSensitivity: 3,
      enforceAudit: false
    },
    {
      id: "FALLBACK",
      appliesTo: ["SAFE_DEFAULT"],
      minSensitivity: 10,
      enforceAudit: true,
      escalation: "GOVERNANCE"
    }
  ];

  evaluate(jurisdiction: JurisdictionCode, sensitivity: number) {
    const applicable = this.rules.filter(r => r.appliesTo.includes(jurisdiction));

    if (applicable.length === 0) {
      return {
        rule: null,
        requiresAudit: true,
        escalation: "GOVERNANCE",
        allowed: false,
        reason: "No matching policy for jurisdiction"
      };
    }

    const rule = applicable[0];
    const allowed = sensitivity <= rule.minSensitivity;

    return {
      rule,
      requiresAudit: rule.enforceAudit,
      escalation: rule.escalation ?? null,
      allowed,
      reason: allowed
        ? "Sensitivity within allowed threshold"
        : "Sensitivity exceeds policy limits"
    };
  }
}

export const JurisdictionPolicyInstance = new JurisdictionPolicy();
