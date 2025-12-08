import { LegalPolicy } from "./legal-policy";

export class PolicyGovernor {
  static loadDefaultPolicies() {
    LegalPolicy.register({
      id: "NO_PII_EXPORT",
      description: "Blocks transmission of personal identifiable information.",
      appliesTo: "transmission",
      condition: payload =>
        typeof payload === "object" &&
        payload &&
        ("email" in payload || "phone" in payload),
      action: "block"
    });

    LegalPolicy.register({
      id: "AUDIT_FINANCIAL_DATA",
      description: "Financial data must be audited before processing.",
      appliesTo: "input",
      condition: payload =>
        typeof payload === "object" &&
        payload &&
        ("amount" in payload || "bankAccount" in payload),
      action: "audit"
    });
  }
}
