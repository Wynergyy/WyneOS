import { CoherenceContext } from "./coherence-context";

export class CoherenceEngine {
  constructor(private context: CoherenceContext) {}

  async check() {
    const snapshot = await this.context.snapshot();

    console.log("Coherence Check:");
    console.log(JSON.stringify(snapshot, null, 2));

    return snapshot;
  }
}
