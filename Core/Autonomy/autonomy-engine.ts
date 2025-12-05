import fs from "fs";
import path from "path";
import { runPredictiveModel } from "./autonomy-predict";
import { buildAuditEntry } from "./autonomy-audit";

interface AutonomyState {
  cycles: number;
  stable: boolean;
  adaptiveMode: boolean;
  adaptiveBypass: boolean;
  auditLog: any[];
}

const statePath = path.join(__dirname, "autonomy-state.json");

export function runAutonomyCycle(): void {
  let state: AutonomyState;

  if (fs.existsSync(statePath)) {
    state = JSON.parse(fs.readFileSync(statePath, "utf8"));
  } else {
    state = {
      cycles: 0,
      stable: true,
      adaptiveMode: false,
      adaptiveBypass: false,
      auditLog: []
    };
  }

  state.cycles += 1;

  const predictive = runPredictiveModel();
  const audit = buildAuditEntry(state.cycles, state.stable, predictive);

  state.auditLog.push(audit);

  fs.writeFileSync(statePath, JSON.stringify(state, null, 2));

  console.log("WyneOS Autonomy Engine");
  console.log("=======================");
  console.log("Cycle Timestamp:", new Date().toISOString());
  console.log("System Stable:", state.stable);
  console.log("Adaptive Mode:", state.adaptiveMode ? "ON" : "OFF");
  console.log("-----------------------");
  console.log("Predictive Forecast:", predictive.stabilityForecast);
  console.log("Confidence:", predictive.confidence);
  console.log("Notes:", predictive.notes.join("; ") || "None");
  console.log("=======================");
  console.log("Cycle Complete");
  console.log("Cycles Run Total:", state.cycles);
}
