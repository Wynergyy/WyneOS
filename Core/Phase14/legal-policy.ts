export interface LegalPolicyRule {
  id: string;
  description: string;
  appliesTo: "input" | "output" | "storage" | "transmission";
  condition: (payload: any) => boolean;
  action: "allow" | "audit" | "block";
}

export class LegalPolicy {
  private static rules: LegalPolicyRule[] = [];

  static register(rule: LegalPolicyRule) {
    this.rules.push(rule);
  }

  static evaluate(payload: any): { result: string; triggered: string[] } {
    const triggered: string[] = [];

    for (const rule of this.rules) {
      try {
        if (rule.condition(payload)) {
          triggered.push(rule.id);

          if (rule.action === "block") {
            return { result: "LEGAL_BLOCK", triggered };
          }

          if (rule.action === "audit") {
            return { result: "AUDIT_REQUIRED", triggered };
          }
        }
      } catch {
        triggered.push(`ERR:${rule.id}`);
        return { result: "LEGAL_BLOCK", triggered };
      }
    }

    return { result: "ALLOW", triggered };
  }
}
