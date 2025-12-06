import { OrchestratorNode } from "./orchestrator-node";

export class OrchestratorRegistry {
  private nodes = new Map<string, OrchestratorNode>();

  registerNode(id: string, metadata: any = {}) {
    if (!this.nodes.has(id)) {
      this.nodes.set(id, new OrchestratorNode(id, metadata));
    }
  }

  heartbeat(id: string, load = 0) {
    const node = this.nodes.get(id);
    if (node) node.heartbeat(load);
  }

  listNodes() {
    return Array.from(this.nodes.values()).map(n => n.getState());
  }

  getNode(id: string) {
    return this.nodes.get(id);
  }
}
