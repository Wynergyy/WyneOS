import { PredictiveEngine } from "./predictive-engine";
import { createEmptyModel } from "./predictive-model";

const engine = new PredictiveEngine();

engine.registerModel(createEmptyModel("baseline-empty-model"));

async function main() {
  const output = await engine.runModel("baseline-empty-model", { initial: true });
  console.log("Predictive output:", output);
  console.log("Registered models:", engine.listModels());
}

main().catch(err => console.error(err));
