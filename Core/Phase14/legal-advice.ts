/**
 * WyneOS Phase 14 – Legal Advisory Layer
 * Converts legal rules and evaluations into actionable guidance.
 */

import { checkLegality } from "./legal-api";
import { LegalContext } from "./legal-engine";

export interface AdvisoryResponse {
  lawful: boolean;
  summary: string;
  recommendations: string[];
  references: string[];
}

export async function getLegalAdvice(ctx: LegalContext): Promise<AdvisoryResponse> {
  const evaluation = await checkLegality(ctx);

  if (evaluation.ok) {
    return {
      lawful: true,
      summary: "The requested action is lawful within the defined legal boundaries.",
      recommendations: [
        "Proceed normally.",
        "Record this action within the audit chain.",
        "Attach integrity token for future review."
      ],
      references: evaluation.references
    };
  }

  return {
    lawful: false,
    summary: `Action blocked: ${evaluation.reason}`,
    recommendations: [
      "Do not proceed.",
      "Identify lawful alternative pathways.",
      "Escalate for human review if ambiguity persists.",
      "Attach incident block code to the case record."
    ],
    references: evaluation.references
  };
}
