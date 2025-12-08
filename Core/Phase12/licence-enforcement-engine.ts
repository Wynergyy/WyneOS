import { LicenceCheck } from "./licence-check";
import { OrchestratorRegistry } from "../Phase10/orchestrator-registry";

export class LicenceEnforcementEngine {
  constructor(
    private registry: OrchestratorRegistry,
    private licenceCheck: LicenceCheck
  ) {}

  async run() {
    const nodes = this.registry.listNodes();
    const actions: any[] = [];

    for (const node of nodes) {
      const result = await this.licenceCheck.verify(node.id);

      if (!result.valid) {
        actions.push({
          type: "enforce-licence",
          node: node.id,
          reason: result.reason
        });
      }
    }

    return actions;
  }
}
