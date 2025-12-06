import { PredictiveRegistry } from "./predictive-registry";
import { PredictiveModelInput, PredictiveModelOutput } from "./predictive-model";

export class PredictiveEngine {
  private registry = new PredictiveRegistry();

  registerModel(model: any) {
    this.registry.register(model);
  }

  async runModel(name: string, input: PredictiveModelInput): Promise<PredictiveModelOutput> {
    const model = this.registry.get(name);
    if (!model) throw new Error(`Predictive model not found: ${name}`);
    return model.run(input);
  }

  listModels() {
    return this.registry.list();
  }
}
