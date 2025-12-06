export interface GovernanceRule {
  id: string;
  description: string;
  evaluate: (input: any) => boolean;
}

export class GovernancePolicy {
  private rules: GovernanceRule[] = [];

  addRule(rule: GovernanceRule) {
    this.rules.push(rule);
  }

  evaluateAll(input: any) {
    const results = this.rules.map(rule => ({
      id: rule.id,
      passed: rule.evaluate(input),
      description: rule.description
    }));

    return results;
  }
}
