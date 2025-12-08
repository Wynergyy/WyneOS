export interface PredictiveModelInput {
  [key: string]: any;
}

export interface PredictiveModelOutput {
  prediction: any;
  confidence: number;
}

export interface PredictiveModel {
  name: string;
  run(input: PredictiveModelInput): Promise<PredictiveModelOutput>;
}

export function createEmptyModel(name: string): PredictiveModel {
  return {
    name,
    async run() {
      return {
        prediction: null,
        confidence: 0
      };
    }
  };
}
