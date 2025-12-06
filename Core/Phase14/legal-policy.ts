/**
 * WyneOS Phase 14 – Legal Policy Layer
 * Defines structured, auditable policy rules for the Legal Engine.
 */

import { LegalContext, LegalResult, legalEngine } from "./legal-engine";

export interface LegalPolicyRule {
  id: string;
  description: string;
  jurisdiction: string;
  evaluate: (ctx: LegalContext) => LegalResult | null;
}

export class LegalPolicyRegistry {
  private rules: LegalPolicyRule[] = [];

  register(rule: LegalPolicyRule) {
    this.rules.push(rule);
    legalEngine.registerRule((ctx) => {
      if (ctx.jurisdiction !== rule.jurisdiction) return null;
      return rule.evaluate(ctx);
    });
  }

  list() {
    return this.rules;
  }
}

export const legalPolicies = new LegalPolicyRegistry();

/**
 * Default foundational policies.
 */

legalPolicies.register({
  id: "WLIL-GENERAL-LAWFUL-ACTION",
  description: "Action must be explicitly allowed by framework or policy.",
  jurisdiction: "uk",
  evaluate(ctx: LegalContext): LegalResult | null {
    if (ctx.action.startsWith("unauthorised")) {
      return {
        lawful: false,
        reason: "Action not permitted within defined legal framework.",
        references: ["WLIL-UK-ACT-CORE-001"]
      };
    }

    return {
      lawful: true,
      reason: "Action falls within acceptable permitted boundaries.",
      references: ["WLIL-UK-ACT-CORE-001"]
    };
  }
});
