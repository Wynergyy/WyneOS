/* ------------------------------------------------------------
   JJJ: WyneOS v5 Harmony Layer
   Purpose:
   - Validate Bamfy’s final resolution
   - Confirm that the system has stabilised
   - Produce a harmony index (0.0 to 1.0)
   - Ensure WyneOS ends each cycle in a safe, predictable state
------------------------------------------------------------ */

export interface JJJInput {
  finalState: "all_clear" | "soft_hold" | "extended_watch";
  anomalyScore: number;
  driftScore: number;
  timestamp: string;
}

export interface JJJOutput {
  harmonyIndex: number;
  status: "stable" | "recovering" | "monitoring";
  message: string;
}

export function jjjEvaluate(input: JJJInput): JJJOutput {
  const { finalState, anomalyScore, driftScore } = input;

  // Calculate harmony index: lower anomalies = higher harmony
  let harmonyIndex = 1 - Math.min(1, anomalyScore + driftScore * 10);

  if (harmonyIndex < 0) harmonyIndex = 0;

  // Determine final system status
  if (finalState === "all_clear") {
    return {
      harmonyIndex,
      status: "stable",
      message: "System confirmed stable. No outstanding issues."
    };
  }

  if (finalState === "soft_hold") {
    return {
      harmonyIndex,
      status: "recovering",
      message: "System recovering. Continued observation advised."
    };
  }

  return {
    harmonyIndex,
    status: "monitoring",
    message: "Extended monitoring required to ensure stability."
  };
}
