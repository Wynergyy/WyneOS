import { LegalPolicy } from "./legal-policy";
import { LegalAudit } from "./legal-audit";
import { randomUUID } from "crypto";

export class LegalEngine {
  static evaluate(payload: any) {
    const policyResult = LegalPolicy.evaluate(payload);

    const auditEntry = {
      id: randomUUID(),
      timestamp: Date.now(),
      category: "LEGAL_ENGINE_EVAL",
      payloadHash: LegalEngine.simpleHash(JSON.stringify(payload)),
      decision: policyResult.result
    };

    LegalAudit.record(auditEntry);

    return {
      ...policyResult,
      auditId: auditEntry.id
    };
  }

  static simpleHash(str: string): string {
    let hash = 0;
    for (const c of str) hash = (hash * 31 + c.charCodeAt(0)) >>> 0;
    return hash.toString(16);
  }
}
