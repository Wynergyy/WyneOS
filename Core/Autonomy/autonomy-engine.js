import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { runPredictiveModel } from "./autonomy-predict.js";
import { buildAuditEntry } from "./autonomy-audit.js";
import { evaluateAdaptiveNeed } from "./autonomy-adapt.js";
import { runStabiliser } from "./autonomy-stabilise.js";
import { buildTelemetry } from "./autonomy-telemetry.js";
import { computeConvergence, buildConvergenceSnapshot } from "./autonomy-converge.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const statePath = path.join(__dirname, "autonomy-state.json");

export function runAutonomyCycle() {
  let state;

  if (fs.existsSync(statePath)) {
    try {
      state = JSON.parse(fs.readFileSync(statePath, "utf8"));
    } catch {
      state = {
        cycles: 0,
        stable: true,
        adaptiveMode: false,
        adaptiveBypass: false,
        adaptiveReason: "State load error fallback",
        stabiliserLog: [],
        telemetryLog: [],
        convergenceLog: [],
        auditLog: []
      };
    }
  } else {
    state = {
      cycles: 0,
      stable: true,
      adaptiveMode: false,
      adaptiveBypass: false,
      adaptiveReason: "Initial creation",
      stabiliserLog: [],
      telemetryLog: [],
      convergenceLog: [],
      auditLog: []
    };
  }

  if (!Array.isArray(state.auditLog)) state.auditLog = [];
  if (!Array.isArray(state.stabiliserLog)) state.stabiliserLog = [];
  if (!Array.isArray(state.telemetryLog)) state.telemetryLog = [];
  if (!Array.isArray(state.convergenceLog)) state.convergenceLog = [];

  state.cycles += 1;

  const predictive = runPredictiveModel();
  const audit = buildAuditEntry(state.cycles, state.stable, predictive);
  state.auditLog.push(audit);

  const adaptation = evaluateAdaptiveNeed(predictive, state);

  if (adaptation.switchToAdaptive && !state.adaptiveBypass) {
    state.adaptiveMode = true;
    state.adaptiveReason = adaptation.reason;
  }

  let stabiliserResult = {
    applied: false,
    actions: [],
    reason: "Not executed"
  };

  if (state.adaptiveMode) {
    stabiliserResult = runStabiliser(state, predictive);
    state.stabiliserLog.push({
      cycle: state.cycles,
      timestamp: new Date().toISOString(),
      applied: stabiliserResult.applied,
      actions: stabiliserResult.actions,
      reason: stabiliserResult.reason
    });
  }

  const telemetry = buildTelemetry(
    state.cycles,
    predictive,
    state,
    stabiliserResult
  );

  state.telemetryLog.push(telemetry);

  const convergence = computeConvergence(state.telemetryLog);
  const snapshot = buildConvergenceSnapshot(state, convergence);
  state.convergenceLog.push(snapshot);

  fs.writeFileSync(statePath, JSON.stringify(state, null, 2));

  console.log("WyneOS Autonomy Engine");
  console.log("=======================");
  console.log("Cycle Timestamp:", telemetry.timestamp);
  console.log("System Stable:", telemetry.systemStable);
  console.log("Adaptive Mode:", telemetry.adaptiveMode ? "ON" : "OFF");
  console.log("Reason:", telemetry.adaptiveReason);
  console.log("-----------------------");
  console.log("Predictive Forecast:", telemetry.stabilityForecast);
  console.log("Confidence:", telemetry.confidence);
  console.log("-----------------------");
  console.log("Convergence Score:", convergence.score);
  console.log("Convergence Grade:", convergence.grade);
  console.log("Convergence Notes:", convergence.notes.join("; ") || "None");
  console.log("=======================");
  console.log("Cycle Complete");
  console.log("Cycles Run Total:", state.cycles);
}
