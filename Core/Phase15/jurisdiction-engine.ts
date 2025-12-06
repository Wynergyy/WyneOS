// Phase 15 — Jurisdiction Engine
// Combines routing + policy + audit into one unified evaluator.

import { JurisdictionRouterInstance } from "./jurisdiction-router";
import { JurisdictionPolicyInstance } from "./jurisdiction-policy";
import { JurisdictionAuditInstance } from "./jurisdiction-audit";

export interface JurisdictionEvaluationInput {
  country?: string;
  sensitivity: number;
}

export interface JurisdictionEvaluationOutput {
  jurisdiction: string;
  allowed: boolean;
  escalation: string | null;
  rule: string | null;
  auditSeal: string;
}

export class JurisdictionEngine {
  evaluate(input: JurisdictionEvaluationInput): JurisdictionEvaluationOutput {
    const routing = JurisdictionRouterInstance.route({
      country: input.country,
      sensitivity: input.sensitivity
    });

    const policy = JurisdictionPolicyInstance.evaluate(
      routing.jurisdiction,
      input.sensitivity
    );

    const audit = JurisdictionAuditInstance.record({
      timestamp: Date.now(),
      jurisdiction: routing.jurisdiction,
      sensitivity: input.sensitivity,
      allowed: policy.allowed,
      escalation: policy.escalation,
      ruleId: policy.rule?.id ?? null
    });

    return {
      jurisdiction: routing.jurisdiction,
      allowed: policy.allowed,
      escalation: policy.escalation,
      rule: policy.rule?.id ?? null,
      auditSeal: audit.seal
    };
  }
}

export const JurisdictionEngineInstance = new JurisdictionEngine();
