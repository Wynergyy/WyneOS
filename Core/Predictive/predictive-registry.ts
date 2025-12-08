import { PredictiveModel } from "./predictive-model";

export class PredictiveRegistry {
  private models = new Map<string, PredictiveModel>();

  register(model: PredictiveModel) {
    this.models.set(model.name, model);
  }

  get(name: string) {
    return this.models.get(name);
  }

  list() {
    return Array.from(this.models.keys());
  }
}
