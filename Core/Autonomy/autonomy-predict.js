import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function runPredictiveModel() {
  const statePath = path.join(__dirname, "autonomy-state.json");

  const raw = JSON.parse(readFileSync(statePath, "utf8"));

  const cycles = raw.cycles || 0;
  const bypass = raw.adaptiveBypass || false;

  const notes = [];

  let stability = "stable";
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
