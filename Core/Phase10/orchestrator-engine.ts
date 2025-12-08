import { OrchestratorRegistry } from "./orchestrator-registry";
import { GuardianMesh } from "../Guardian/guardian-mesh";
import { CoherenceEngine } from "../Coherence/coherence-engine";
import { CoherenceContext } from "../Coherence/coherence-context";

export class OrchestratorEngine {
  constructor(
    private registry: OrchestratorRegistry,
    private mesh: GuardianMesh,
    private coherence: CoherenceEngine
  ) {}

  async tick() {
    const nodes = this.registry.listNodes();
    const meshState = this.mesh.getMeshState();
    const coherenceSnapshot = await this.coherence.check();

    return {
      nodes,
      meshState,
      coherenceSnapshot
    };
  }
}
