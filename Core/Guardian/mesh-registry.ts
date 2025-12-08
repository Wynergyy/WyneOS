import { MeshNode } from "./mesh-node";

export class MeshRegistry {
  private nodes = new Map<string, MeshNode>();

  register(id: string) {
    if (!this.nodes.has(id)) {
      this.nodes.set(id, new MeshNode(id));
    }
  }

  get(id: string) {
    return this.nodes.get(id);
  }

  list() {
    return Array.from(this.nodes.values()).map(n => n.getState());
  }

  heartbeat(id: string) {
    const node = this.nodes.get(id);
    if (node) node.heartbeat();
  }
}
