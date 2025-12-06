import { LegalCore, LegalContext } from "./legal-core";

export class LegalRouter {
  static route<T>(ctx: LegalContext, payload: T): { status: string; payload?: T } {
    const outcome = LegalCore.classify(ctx);

    switch (outcome) {
      case "LEGAL_BLOCK":
        return { status: "blocked" };
      case "AUDIT_REQUIRED":
        return { status: "audit", payload };
      default:
        return { status: "allowed", payload };
    }
  }
}
