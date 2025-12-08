import { PredictiveEngine } from "../Predictive/predictive-engine";
import { AutonomyEngine } from "../Autonomy/autonomy-engine";
import { GuardianMesh } from "../Guardian/guardian-mesh";
import { IntegrityEngine } from "../Integrity/integrity-engine";

export class DecisionEngine {
  constructor(
    private predictive: PredictiveEngine,
    private autonomy: AutonomyEngine,
    private mesh: GuardianMesh,
    private integrity: IntegrityEngine
  ) {}

  async evaluate(input: any) {
    const prediction = await this.predictive.runModel("baseline-empty-model", input);

    return {
      telemetry: input,
      prediction,
      autonomy: this.autonomy.getState(),
      mesh: this.mesh.getMeshState(),
      integrity: null
    };
  }
}
