/* ------------------------------------------------------------
   BAMFY: WyneOS v5 Final Resolution Layer
   Purpose:
   - Consolidate outputs from all AI and governance layers
   - Decide final system state: clear, soft-hold, extended-watch
   - Provide stable resolution signals to Wynerace
   - Emit final structured report to Susanne (Sensemaker)
------------------------------------------------------------ */

export interface BamfyInput {
  anomalyScore: number;
  driftScore: number;
  riskLevel: "low" | "medium" | "high";
  escalationState: "none" | "concern" | "protective";
  timestamp: string;
}

export interface BamfyResolution {
  finalState: "all_clear" | "soft_hold" | "extended_watch";
  reason: string;
  summary: string;
}

export function bamfyResolve(input: BamfyInput): BamfyResolution {
  const { anomalyScore, driftScore, riskLevel, escalationState } = input;

  // Rule 1: High-risk or protective state always triggers extended watch
  if (riskLevel === "high" || escalationState === "protective") {
    return {
      finalState: "extended_watch",
      reason: "High-risk condition detected or protective mode active.",
      summary: buildSummary("extended_watch", input)
    };
  }

  // Rule 2: Medium risk or drift requires soft hold
  if (riskLevel === "medium" || driftScore > 0.0001) {
    return {
      finalState: "soft_hold",
      reason: "Moderate irregularities require short-term observation.",
      summary: buildSummary("soft_hold", input)
    };
  }

  // Rule 3: Low risk and clean telemetry means all clear
  return {
    finalState: "all_clear",
    reason: "No meaningful anomalies remain.",
    summary: buildSummary("all_clear", input)
  };
}

/* ----------------------------- */
/*   SUMMARY BUILDER             */
/* ----------------------------- */

function buildSummary(finalState: string, input: BamfyInput): string {
  return `Bamfy resolved system to ${finalState} at ${input.timestamp}. Risk level ${input.riskLevel}, anomaly ${input.anomalyScore.toFixed(
    3
  )}, drift ${input.driftScore}.`;
}
