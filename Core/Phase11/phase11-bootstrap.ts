import { OrchestratorRegistry } from "../Phase10/orchestrator-registry";
import { GovernancePolicy } from "./governance-policy";
import { GovernanceEngine } from "./governance-engine";
import { HealingEngine } from "./healing-engine";

import { RuntimePulse } from "../Coherence/runtime-pulse";

const registry = new OrchestratorRegistry();

registry.registerNode("node-1");
registry.registerNode("node-2");

const policy = new GovernancePolicy();

policy.addRule({
  id: "G001",
  description: "Node must report load <= 1.0",
  evaluate: (node: any) => node.load <= 1.0
});

policy.addRule({
  id: "G002",
  description: "Node must not be offline",
  evaluate: (node: any) => node.online === true
});

const governance = new GovernanceEngine(policy, registry);
const healing = new HealingEngine(registry);

const pulse = new RuntimePulse();

pulse.start(7000, () => {
  registry.heartbeat("node-1", Math.random());
  registry.heartbeat("node-2", Math.random());

  const governanceResults = governance.run();
  const healingActions = healing.run();

  console.log("Governance Check:", governanceResults);
  console.log("Healing Actions:", healingActions);
});

console.log("Phase 11 Governance and Healing Engine initialised.");
