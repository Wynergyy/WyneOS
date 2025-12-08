import { OrchestratorRegistry } from "../Phase10/orchestrator-registry";
import { LicenceCheck } from "./licence-check";
import { LicenceEnforcementEngine } from "./licence-enforcement-engine";
import { DistributedEnforcement } from "./distributed-enforcement";

import { RuntimePulse } from "../Coherence/runtime-pulse";

// Temporary stub – will be replaced with WFSL Licence Engine validation call
async function mockLicenceValidator(nodeId: string) {
  if (nodeId === "node-1") {
    return { valid: true, reason: "OK" };
  }

  return { valid: false, reason: "Licence missing" };
}

const registry = new OrchestratorRegistry();
registry.registerNode("node-1");
registry.registerNode("node-2");

const licenceCheck = new LicenceCheck(mockLicenceValidator);
const enforcementEngine = new LicenceEnforcementEngine(registry, licenceCheck);
const distributedEnforcement = new DistributedEnforcement();

const pulse = new RuntimePulse();

pulse.start(8000, async () => {
  registry.heartbeat("node-1", Math.random());
  registry.heartbeat("node-2", Math.random());

  const actions = await enforcementEngine.run();
  distributedEnforcement.propagate(actions);
});

console.log("Phase 12 Licence-Aware Enforcement Engine initialised.");
