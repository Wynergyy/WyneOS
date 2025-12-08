import { GovernancePolicy } from "./governance-policy";
import { OrchestratorRegistry } from "../Phase10/orchestrator-registry";

export class GovernanceEngine {
  constructor(
    private policy: GovernancePolicy,
    private registry: OrchestratorRegistry
  ) {}

  run() {
    const nodes = this.registry.listNodes();

    return nodes.map(node => {
      const results = this.policy.evaluateAll(node);
      return { node, results };
    });
  }
}
