import { OrchestratorRegistry } from "./orchestrator-registry";
import { OrchestratorEngine } from "./orchestrator-engine";

import { GuardianMesh } from "../Guardian/guardian-mesh";
import { CoherenceContext } from "../Coherence/coherence-context";
import { CoherenceEngine } from "../Coherence/coherence-engine";
import { RuntimePulse } from "../Coherence/runtime-pulse";

import { AutonomyEngine } from "../Autonomy/autonomy-engine";
import { TelemetryEngine } from "../Telemetry/telemetry-engine";
import { PredictiveEngine } from "../Predictive/predictive-engine";
import { IntegrityEngine } from "../Integrity/integrity-engine";

const autonomy = new AutonomyEngine();
const telemetry = new TelemetryEngine();
const predictive = new PredictiveEngine();
const integrity = new IntegrityEngine();
const mesh = new GuardianMesh();

const context = new CoherenceContext(autonomy, telemetry, predictive, mesh, integrity);
const coherence = new CoherenceEngine(context);

const registry = new OrchestratorRegistry();
const orchestrator = new OrchestratorEngine(registry, mesh, coherence);

autonomy.boot();
mesh.registerNode("root-mesh-node");

registry.registerNode("node-1");
registry.registerNode("node-2");

const pulse = new RuntimePulse();

pulse.start(6000, async () => {
  registry.heartbeat("node-1", Math.random());
  registry.heartbeat("node-2", Math.random());
  await orchestrator.tick();
});

console.log("Phase 10 Orchestrator initialised.");
