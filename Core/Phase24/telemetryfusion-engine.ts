/**
 * TelemetryFusion Engine
 * Performs cross-layer fusion of telemetry bundles to generate:
 * - Telemetry Health Index (THI)
 * - Stability rating
 * - Cross-system correlations
 * - Fusion metadata snapshot
 */

import { TelemetryFusionBundle } from "./telemetryfusion-ingest";

export interface TelemetryFusionResult {
  thi: number;                 // Telemetry Health Index (0–100)
  stability: "stable" | "degraded" | "critical";
  signals: string[];           // Notes on detected signals
  timestamp: number;
}

export class TelemetryFusionEngine {
  evaluate(bundle: TelemetryFusionBundle): TelemetryFusionResult {
    let score = 100;
    const signals: string[] = [];

    // Process influence
    if (bundle.process.severity === "medium") {
      score -= 10;
      signals.push("Process load elevated");
    }
    if (bundle.process.severity === "high") {
      score -= 25;
      signals.push("Process pressure significant");
    }
    if (bundle.process.severity === "critical") {
      score -= 40;
      signals.push("Process manager in critical condition");
    }

    // Autonomy influence
    if (bundle.autonomy.recoveryLevel === "moderate") {
      score -= 10;
      signals.push("Autonomy recovering");
    }
    if (bundle.autonomy.recoveryLevel === "major") {
      score -= 20;
      signals.push("Autonomy indicates major instability");
    }
    if (bundle.autonomy.recoveryLevel === "critical") {
      score -= 35;
      signals.push("Autonomy in critical recovery cycle");
    }

    // Guardian influence
    if (bundle.guardian.threatLevel === "medium") {
      score -= 10;
      signals.push("Guardian detected medium threat");
    }
    if (bundle.guardian.threatLevel === "high") {
      score -= 20;
      signals.push("Guardian detected high threat");
    }
    if (bundle.guardian.threatLevel === "critical") {
      score -= 40;
      signals.push("Guardian detected critical threat");
    }

    // Native system telemetry influence
    if (bundle.native.cpuUsage > 0.8) {
      score -= 15;
      signals.push("CPU load high");
    }
    if (bundle.native.memoryUsage > 0.8) {
      score -= 15;
      signals.push("Memory pressure high");
    }
    if (bundle.native.diskUsage > 0.9) {
      score -= 10;
      signals.push("Disk usage critical");
    }

    // IntegrityChain anomalies (length drift, instability)
    if (bundle.integrity.length === 0) {
      score -= 30;
      signals.push("Integrity chain empty");
    }

    // Stability rating
    let stability: "stable" | "degraded" | "critical" = "stable";
    if (score <= 70) stability = "degraded";
    if (score <= 40) stability = "critical";

    // Bounds
    if (score < 0) score = 0;
    if (score > 100) score = 100;

    return {
      thi: score,
      stability,
      signals,
      timestamp: Date.now()
    };
  }
}
