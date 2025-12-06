export interface LegalContext {
  jurisdiction: string;
  purpose: string;
  dataSensitivity: "low" | "medium" | "high";
  riskLevel: "none" | "elevated" | "critical";
}

export class LegalCore {
  static validateContext(ctx: LegalContext): void {
    if (!ctx.jurisdiction) {
      throw new Error("W-LIL LegalCore: Missing jurisdiction");
    }
    if (!ctx.purpose) {
      throw new Error("W-LIL LegalCore: Missing purpose");
    }
  }

  static classify(ctx: LegalContext): string {
    this.validateContext(ctx);

    if (ctx.riskLevel === "critical") return "LEGAL_BLOCK";
    if (ctx.dataSensitivity === "high") return "AUDIT_REQUIRED";

    return "ALLOW";
  }
}
