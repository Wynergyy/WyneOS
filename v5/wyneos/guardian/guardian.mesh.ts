/* ------------------------------------------------------------
   SUSANNE: WyneOS v5 Sensemaking Layer
   Purpose:
   - Translate system events into human-readable summaries
   - Provide context for Wynerace governance
   - Explain decisions made by AI Guard, Guardian Mesh,
     KateyBear, HannahBannah, and Bamfy
   - Produce structured logs for AuditGrid
------------------------------------------------------------ */

export interface SensemakingInput {
  source: string;
  riskLevel: "low" | "medium" | "high";
  anomalyScore: number;
  driftScore?: number;
  actionTaken: string;
  recommendedNext?: string;
  timestamp: string;
}

export interface SensemakingOutput {
  summary: string;
  insight: string;
  humanContext: string;
  advisory: string;
}

export function susanneInterpret(
  input: SensemakingInput
): SensemakingOutput {

  const summary = buildSummary(input);
  const insight = buildInsight(input);
  const humanContext = translateToContext(input);
  const advisory = recommendedAction(input);

  return {
    summary,
    insight,
    humanContext,
    advisory
  };
}

/* ----------------------------- */
/*   SUMMARY BUILDER             */
/* ----------------------------- */

function buildSummary(input: SensemakingInput): string {
  return `Event detected by ${input.source}. Risk level: ${input.riskLevel}. Action taken: ${input.actionTaken}.`;
}

/* ----------------------------- */
/*   INSIGHT BUILDER             */
/* ----------------------------- */

function buildInsight(input: SensemakingInput): string {
  const base = `Anomaly score was ${input.anomalyScore.toFixed(3)}.`;

  if (input.driftScore !== undefined) {
    return `${base} Drift score registered at ${input.driftScore}.`;
  }
  return base;
}

/* ----------------------------- */
/*   HUMAN CONTEXT               */
/* ----------------------------- */

function translateToContext(input: SensemakingInput): string {
  switch (input.riskLevel) {
    case "high":
      return "The system entered a protective state and required immediate stabilisation.";
    case "medium":
      return "The system showed moderate irregularities and corrective action was triggered.";
    case "low":
      return "Only minor irregularities were detected and the system remained stable.";
    default:
      return "Unclear state. Review telemetry.";
  }
}

/* ----------------------------- */
/*   ADVISORY BUILDER            */
/* ----------------------------- */

function recommendedAction(input: SensemakingInput): string {
  if (input.recommendedNext) return input.recommendedNext;

  switch (input.riskLevel) {
    case "high":
      return "Recommend full review of telemetry and Guardian reports.";
    case "medium":
      return "Recommend drift analysis and short-term monitoring.";
    case "low":
      return "No further action required.";
    default:
      return "No recommendation available.";
  }
}
