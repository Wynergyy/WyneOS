import { Phase10Detection, Phase10ActionPlan, Phase10Analysis } from "./phase10-types.ts";

/**
 * Phase 10 Analysis Engine
 * SAFE: Produces recommendations only, performs no actions.
 */

export const analyseDetection = (
  detection: Phase10Detection
): Phase10Analysis => {

  const actions: Phase10ActionPlan[] = [];

  for (const issue of detection.anomalies) {
    switch (issue.type) {

      case "integrity-drift":
        actions.push({
          action: "restore-from-snapshot",
          risk: "medium",
          rationale: "Detected integrity drift"
        });
        break;

      case "mesh-anomaly":
        actions.push({
          action: "request-mesh-reconciliation",
          risk: "low",
          rationale: "Mesh trust inconsistencies present"
        });
        break;

      case "licence-failure":
        actions.push({
          action: "revalidate-licence",
          risk: "medium",
          rationale: "Licence invalid or tampered"
        });
        break;

      default:
        actions.push({
          action: "no-op",
          risk: "low",
          rationale: "Unclassified anomaly detected"
        });
    }
  }

  return {
    timestamp: Date.now(),
    detection,
    recommended: actions,
    sealed: false
  };
};
