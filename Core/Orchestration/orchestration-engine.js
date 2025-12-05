import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { runAutonomyCycle } from "../Autonomy/autonomy-engine.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const statePath = path.join(__dirname, "orchestration-state.json");

function loadOrchestrationState() {
  if (!fs.existsSync(statePath)) {
    return {
      orchestrationCycles: 0,
      lastAutonomyCycle: null,
      systemHealth: "unknown",
      notes: [],
      history: []
    };
  }

  try {
    return JSON.parse(fs.readFileSync(statePath, "utf8"));
  } catch {
    return {
      orchestrationCycles: 0,
      lastAutonomyCycle: null,
      systemHealth: "fallback",
      notes: ["State load error"],
      history: []
    };
  }
}

function saveOrchestrationState(state) {
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2));
}

export function runOrchestrationCycle() {
  const state = loadOrchestrationState();

  state.orchestrationCycles += 1;

  console.log("WyneOS Orchestration Engine");
  console.log("============================");

  const before = Date.now();
  runAutonomyCycle();
  const after = Date.now();

  const duration = after - before;

  const health =
    duration < 1000 ? "optimal" :
    duration < 2000 ? "degraded" :
    "slow";

  const record = {
    timestamp: new Date().toISOString(),
    orchestrationCycle: state.orchestrationCycles,
    autonomyDurationMs: duration,
    health
  };

  state.lastAutonomyCycle = record;
  state.history.push(record);

  state.systemHealth = health;

  saveOrchestrationState(state);

  console.log("Orchestration Health:", health);
  console.log("Autonomy Duration:", duration + "ms");
  console.log("Cycle:", state.orchestrationCycles);
  console.log("============================");
}
