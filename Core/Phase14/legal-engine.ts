/**
 * WyneOS Phase 14 – Legal Engine Core
 * Provides structured legal reasoning, rule execution, and compliant output.
 */

export interface LegalContext {
  actor: string;
  action: string;
  jurisdiction: string;
  metadata?: Record<string, any>;
}

export interface LegalResult {
  lawful: boolean;
  reason: string;
  references: string[];
}

export class LegalEngine {
  private rules: Array<(ctx: LegalContext) => LegalResult | null> = [];

  registerRule(rule: (ctx: LegalContext) => LegalResult | null) {
    this.rules.push(rule);
  }

  evaluate(ctx: LegalContext): LegalResult {
    for (const rule of this.rules) {
      const res = rule(ctx);
      if (res) return res;
    }

    return {
      lawful: false,
      reason: "No matching legal rule",
      references: []
    };
  }
}

export const legalEngine = new LegalEngine();
