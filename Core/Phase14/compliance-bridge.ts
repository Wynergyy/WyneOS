/**
 * WyneOS Phase 14 – Compliance Bridge
 * Connects legal evaluations to compliance engines, audit logs and governance.
 */

import { checkLegality } from "./legal-api";
import { LegalContext } from "./legal-engine";

export interface ComplianceReport {
  legal: boolean;
  legalReason: string;
  complianceStatus: string;
  timestamp: number;
}

export async function generateComplianceReport(ctx: LegalContext): Promise<ComplianceReport> {
  const legal = await checkLegality(ctx);

  return {
    legal: legal.ok,
    legalReason: legal.reason,
    complianceStatus: legal.ok
      ? "Compliant with regulatory and internal governance standards."
      : "Non-compliant: action violates legal or governance rules.",
    timestamp: Date.now()
  };
}

/**
 * Enforcement wrapper.
 */
export async function enforce(ctx: LegalContext) {
  const report = await generateComplianceReport(ctx);

  if (!report.legal) {
    throw new Error(`Compliance breach: ${report.legalReason}`);
  }

  return report;
}
