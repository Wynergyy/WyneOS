import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { runAutonomyCycle } from "../Autonomy/autonomy-engine.js";
import { evaluateOrchestrationRules } from "./orchestration-rules.js";
import { OrchestrationScheduler } from "./orchestration-scheduler.js";
import { SignalBus } from "./signal-bus.js";
import { EventsEngine } from "./events-engine.js";
import { MemoryEngine } from "./memory-engine.js";
import { DistributedNode } from "./distributed-node.js";
import { ClusterDiscovery } from "./cluster-discovery.js";
import { MeshHandshake } from "./mesh-handshake.js";
import { MeshLedger } from "./mesh-ledger.js";
import { MeshConvergence } from "./mesh-converge.js";
import { MeshPredictor } from "./mesh-predict.js";
import { MeshTrust } from "./mesh-trust.js";
import { MeshGovernorEnforce } from "./governor-enforce.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadJSON(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function saveJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

const statePath = path.join(__dirname, "orchestration-state.json");
const eventsPath = path.join(__dirname, "events-state.json");
const distPath = path.join(__dirname, "distributed-state.json");
const clusterPath = path.join(__dirname, "cluster-state.json");
const meshPath = path.join(__dirname, "mesh-state.json");
const ledgerPath = path.join(__dirname, "ledger-state.json");
const meshConvPath = path.join(__dirname, "mesh-convergence-state.json");
const meshPredPath = path.join(__dirname, "mesh-prediction-state.json");
const meshTrustPath = path.join(__dirname, "mesh-trust-state.json");

export function runOrchestrationCycle() {
  const state = loadJSON(statePath, {
    orchestrationCycles: 0,
    lastAutonomyCycle: null,
    systemHealth: "unknown",
    notes: [],
    history: [],
    ruleStatus: "initialising",
    schedulerLog: [],
    signalLog: [],
    alerts: [],
    retentionSummary: []
  });

  const eventState = loadJSON(eventsPath, { events: [] });
  const distState = loadJSON(distPath, { nodes: [], heartbeats: [] });
  const clusterState = loadJSON(clusterPath, { clusterRole: "unknown", topology: [] });
  const meshState = loadJSON(meshPath, { handshakes: [], compatibilityChecks: [] });
  const ledgerState = loadJSON(ledgerPath, { cycles: [], handshakes: [], health: [] });
  const meshConvState = loadJSON(meshConvPath, { snapshots: [] });
  const meshPredState = loadJSON(meshPredPath, { forecasts: [] });
  const meshTrustState = loadJSON(meshTrustPath, { trustSnapshots: [] });

  const scheduler = new OrchestrationScheduler();
  const bus = new SignalBus();
  const events = new EventsEngine();
  const memory = new MemoryEngine();
  const discovery = new ClusterDiscovery();
  const mesh = new MeshHandshake();
  const ledger = new MeshLedger();
  const meshConvergence = new MeshConvergence();
  const meshPredictor = new MeshPredictor();
  const meshTrust = new MeshTrust();
  const governor = new MeshGovernorEnforce();

  let node;
  if (distState.nodes.length === 0) {
    node = new DistributedNode();
    const reg = node.registerNode();
    distState.nodes.push(reg);
  } else {
    const info = distState.nodes[0];
    node = new DistributedNode();
    node.nodeID = info.nodeID;
    node.nodeType = info.nodeType;
    node.registered = true;
  }

  scheduler.registerTask("heartbeat", 1, () => ({ message: "Scheduler heartbeat executed." }));
  scheduler.registerTask("integrityCheck", 10, () => ({ message: "Periodic integrity check executed." }));

  state.orchestrationCycles += 1;

  console.log("WyneOS Orchestration Engine");
  console.log("============================");

  const before = Date.now();
  runAutonomyCycle();
  const after = Date.now();
  const duration = after - before;

  const health = duration < 1000 ? "optimal" :
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

  ledger.recordCycle(ledgerState, {
    cycle: state.orchestrationCycles,
    health,
    nodeID: node.nodeID
  });

  const ruleCheck = evaluateOrchestrationRules(state);
  state.ruleStatus = ruleCheck.status;
  state.notes = ruleCheck.notes;

  const scheduled = scheduler.runScheduledTasks(state.orchestrationCycles, state);

  const signal = bus.emit("system_cycle", {
    cycle: state.orchestrationCycles,
    health,
    rules: ruleCheck.status,
    autonomyDuration: duration
  });

  if (!Array.isArray(state.signalLog)) state.signalLog = [];
  state.signalLog.push(signal);

  const alerts = events.evaluateSignal(signal);
  events.recordAlerts(alerts);

  if (!Array.isArray(state.alerts)) state.alerts = [];
  state.alerts.push({
    cycle: state.orchestrationCycles,
    timestamp: new Date().toISOString(),
    alerts
  });

  eventState.events.push(...events.events);

  const hb = node.heartbeat(state.orchestrationCycles);
  distState.heartbeats.push(hb);

  const clusterInfo = discovery.discoverLocalNode(distState);
  clusterState.clusterRole = clusterInfo.clusterRole;

  const topology = discovery.buildTopologySnapshot(distState);
  clusterState.topology.push(topology);

  const handshake = mesh.buildHandshake(node);
  meshState.handshakes.push(handshake);
  ledger.recordHandshake(ledgerState, handshake);

  const compat = mesh.assessCompatibility(handshake);
  meshState.compatibilityChecks.push({
    timestamp: new Date().toISOString(),
    compatible: compat.compatible,
    reason: compat.reason
  });

  ledger.recordHealth(ledgerState, {
    compatible: compat.compatible,
    reason: compat.reason,
    cycle: state.orchestrationCycles
  });

  const meshConv = meshConvergence.computeMeshScore(ledgerState);
  const meshSnapshot = meshConvergence.buildSnapshot(state, meshConv);
  meshConvState.snapshots.push(meshSnapshot);

  const forecast = meshPredictor.computeForecast(ledgerState, meshConvState);
  const forecastSnapshot = meshPredictor.buildSnapshot(state, forecast);
  meshPredState.forecasts.push(forecastSnapshot);

  const trust = meshTrust.computeTrust(ledgerState, meshConvState, meshPredState);
  const trustSnapshot = meshTrust.buildSnapshot(state, trust);
  meshTrustState.trustSnapshots.push(trustSnapshot);

  // GOVERNOR ENFORCEMENT – PHASE 9 STEP 7
  const governorDecision = governor.enforce(
    state,
    trustSnapshot,
    forecastSnapshot,
    meshSnapshot
  );

  state.governorStatus = governorDecision.status;

  if (!Array.isArray(state.governorActions)) {
    state.governorActions = [];
  }

  state.governorActions.push({
    cycle: state.orchestrationCycles,
    status: governorDecision.status,
    actions: governorDecision.actions,
    timestamp: new Date().toISOString()
  });

  // RETENTION
  const historyComp = memory.compactHistory(state.history);
  state.history = historyComp.newHistory;

  const signalComp = memory.compactSignals(state.signalLog);
  state.signalLog = signalComp.newSignals;

  const alertComp = memory.compactAlerts(state.alerts);
  state.alerts = alertComp.newAlerts;

  state.retentionSummary.push({
    cycle: state.orchestrationCycles,
    historyTrimmed: historyComp.trimmed,
    signalTrimmed: signalComp.trimmed,
    alertTrimmed: alertComp.trimmed
  });

  state.systemHealth = health;

  saveJSON(statePath, state);
  saveJSON(eventsPath, eventState);
  saveJSON(distPath, distState);
  saveJSON(clusterPath, clusterState);
  saveJSON(meshPath, meshState);
  saveJSON(ledgerPath, ledgerState);
  saveJSON(meshConvPath, meshConvState);
  saveJSON(meshPredPath, meshPredState);
  saveJSON(meshTrustPath, meshTrustState);

  console.log("Orchestration Health:", health);
  console.log("Rule Status:", ruleCheck.status);
  console.log("Node ID:", node.nodeID);
  console.log("Cluster Role:", clusterInfo.clusterRole);
  console.log("Topology Nodes:", topology.nodeCount);
  console.log("Distributed Version Compatible:", compat.compatible);
  console.log("Compatibility Reason:", compat.reason);
  console.log("Mesh Convergence Score:", meshConv.score);
  console.log("Mesh Convergence Grade:", meshConv.grade);
  console.log("Mesh Prediction Score:", forecast.score);
  console.log("Mesh Prediction Grade:", forecast.grade);
  console.log("Mesh Prediction Risk:", forecast.risk);
  console.log("Mesh Trust Score:", trust.score);
  console.log("Mesh Trust Grade:", trust.grade);
  console.log("Mesh Trust Reason:", trust.reason);
  console.log("Governor Status:", state.governorStatus);
  console.log("Heartbeat Recorded:", hb.heartbeatCount);
  console.log("Scheduled Tasks:", scheduled.length);
  console.log("Retention Actions:", JSON.stringify(state.retentionSummary.slice(-1)[0]));
  console.log("============================");
}
