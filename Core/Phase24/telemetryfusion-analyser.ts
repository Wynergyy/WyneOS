/**
 * TelemetryFusion Analyser
 * Performs trend analysis, pattern detection and temporal modelling
 * on a rolling window of TelemetryFusionResults.
 *
 * This layer helps WyneOS identify:
 * - emerging degradation patterns
 * - cross-system drift
 * - sudden instability spikes
 * - long-term weakening of subsystem signals
 */

import { TelemetryFusionResult } from "./telemetryfusion-engine";

export interface TelemetryTrendReport {
  windowSize: number;
  averageTHI: number;
  direction: "improving" | "declining" | "stable";
  volatility: number; // 0–1 scale
  anomalies: string[];
  timestamp: number;
}

export class TelemetryFusionAnalyser {
  analyse(history: TelemetryFusionResult[]): TelemetryTrendReport {
    const windowSize = history.length;

    if (windowSize === 0) {
      return {
        windowSize: 0,
        averageTHI: 0,
        direction: "stable",
        volatility: 0,
        anomalies: ["No telemetry history available"],
        timestamp: Date.now()
      };
    }

    const thiValues = history.map(h => h.thi);
    const averageTHI = thiValues.reduce((a, b) => a + b, 0) / windowSize;

    // Direction (trend slope)
    const first = thiValues[0];
    const last = thiValues[windowSize - 1];

    let direction: "improving" | "declining" | "stable" = "stable";
    if (last > first + 5) direction = "improving";
    if (last < first - 5) direction = "declining";

    // Volatility (normalised variance)
    const variance =
      thiValues.map(v => Math.pow(v - averageTHI, 2)).reduce((a, b) => a + b, 0) /
      windowSize;

    const volatility = Math.min(1, variance / 250); // empirical scaling

    // Anomalies detection
    const anomalies: string[] = [];
    if (averageTHI < 50) anomalies.push("Average THI below 50");
    if (volatility > 0.6) anomalies.push("High volatility detected");
    if (direction === "declining") anomalies.push("THI trend declining");

    return {
      windowSize,
      averageTHI,
      direction,
      volatility,
      anomalies,
      timestamp: Date.now()
    };
  }
}
