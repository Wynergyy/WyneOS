import { AutonomyEngine } from "../Autonomy/autonomy-engine";
import { TelemetryEngine } from "../Telemetry/telemetry-engine";
import { PredictiveEngine } from "../Predictive/predictive-engine";
import { GuardianMesh } from "../Guardian/guardian-mesh";
import { IntegrityEngine } from "../Integrity/integrity-engine";

import { CoherenceContext } from "./coherence-context";
import { CoherenceEngine } from "./coherence-engine";
import { RuntimePulse } from "./runtime-pulse";

const autonomy = new AutonomyEngine();
const telemetry = new TelemetryEngine();
const predictive = new PredictiveEngine();
const mesh = new GuardianMesh();
const integrity = new IntegrityEngine();

autonomy.boot();
mesh.registerNode("node-1");

const context = new CoherenceContext(autonomy, telemetry, predictive, mesh, integrity);
const coherence = new CoherenceEngine(context);
const pulse = new RuntimePulse();

pulse.start(5000, async () => {
  await coherence.check();
});

console.log("Phase 9 Coherence Engine initialised.");
