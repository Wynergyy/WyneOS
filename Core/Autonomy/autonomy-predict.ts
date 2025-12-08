import { readFileSync } from "fs";
import path from "path";

export interface PredictiveOutput {
  timestamp: string;
  stabilityForecast: "stable" | "warning" | "critical";
  confidence: number;
  notes: string[];
}

export function runPredictiveModel(): PredictiveOutput {
  const statePath = path.join(__dirname, "autonomy-state.json");
  const raw = JSON.parse(readFileSync(statePath, "utf8"));

  const cycles = raw.cycles || 0;
  const bypass = raw.adaptiveBypass || false;

  const notes: string[] = [];

  let stability: "stable" | "warning" | "critical" = "stable";
  let confidence = 0.98;

  if (cycles > 50 && !bypass) {
    stability = "warning";
    confidence = 0.85;
    notes.push("High cycle count detected without adaptive correction.");
  }

  if (cycles > 200) {
    stability = "critical";
    confidence = 0.72;
    notes.push("System load entering critical range.");
  }

  if (bypass) {
    notes.push("Adaptive bypass active. Predictive model constrained.");
  }

  return {
    timestamp: new Date().toISOString(),
    stabilityForecast: stability,
    confidence,
    notes
  };
}
