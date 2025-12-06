import { BehaviourBus } from "./behaviour-bus";
import { BehaviourHandler } from "./behaviour-handler";
import { DecisionEngine } from "./decision-engine";

import { PredictiveEngine } from "../Predictive/predictive-engine";
import { AutonomyEngine } from "../Autonomy/autonomy-engine";
import { GuardianMesh } from "../Guardian/guardian-mesh";
import { IntegrityEngine } from "../Integrity/integrity-engine";

const bus = new BehaviourBus();
const predictive = new PredictiveEngine();
const autonomy = new AutonomyEngine();
const mesh = new GuardianMesh();
const integrity = new IntegrityEngine();

const decision = new DecisionEngine(predictive, autonomy, mesh, integrity);

autonomy.boot();
mesh.registerNode("node-1");

// Behaviour handler
const handler = new BehaviourHandler("system.observed", async (ctx) => {
  console.log("Behaviour event triggered:");
  console.log(JSON.stringify(ctx, null, 2));
});

// Subscribe handler to bus
bus.subscribe("system.observed", async (signal) => {
  const ctx = await decision.evaluate(signal.payload);
  await handler.run(ctx);
});

// Trigger event
bus.emit("system.observed", { message: "Phase 8 online" });

console.log("Phase 8 Behaviour Loop initialised.");
