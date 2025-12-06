import { OrchestratorRegistry } from "../Phase10/orchestrator-registry";

export class HealingEngine {
  constructor(private registry: OrchestratorRegistry) {}

  run() {
    const nodes = this.registry.listNodes();
    const actions: any[] = [];

    for (const node of nodes) {
      const offline = !node.online;
      const overworked = node.load > 0.9;

      if (offline) {
        actions.push({
          type: "isolate-node",
          node: node.id,
          reason: "Node offline"
        });
      }

      if (overworked) {
        actions.push({
          type: "reduce-load",
          node: node.id,
          reason: "High load detected"
        });
      }
    }

    return actions;
  }
}
