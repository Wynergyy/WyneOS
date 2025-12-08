export interface BehaviourContext {
  telemetry: any;
  prediction: any;
  autonomy: any;
  mesh: any;
  integrity: any;
}

export type BehaviourFn = (ctx: BehaviourContext) => Promise<void> | void;

export class BehaviourHandler {
  constructor(private key: string, private fn: BehaviourFn) {}

  getKey() {
    return this.key;
  }

  async run(ctx: BehaviourContext) {
    await this.fn(ctx);
  }
}
