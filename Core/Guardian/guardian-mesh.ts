import { MeshRegistry } from "./mesh-registry";

export class GuardianMesh {
  private registry = new MeshRegistry();

  registerNode(id: string) {
    this.registry.register(id);
  }

  heartbeat(id: string) {
    this.registry.heartbeat(id);
  }

  getMeshState() {
    return this.registry.list();
  }
}
