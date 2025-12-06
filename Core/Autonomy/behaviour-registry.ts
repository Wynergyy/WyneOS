export type BehaviourKey = string;

export type BehaviourFn = (context: unknown) => Promise<void> | void;

export class BehaviourRegistry {
  private behaviours = new Map<BehaviourKey, BehaviourFn>();

  register(key: BehaviourKey, fn: BehaviourFn) {
    this.behaviours.set(key, fn);
  }

  get(key: BehaviourKey) {
    return this.behaviours.get(key);
  }

  list() {
    return Array.from(this.behaviours.keys());
  }

  async run(key: BehaviourKey, context: unknown = {}) {
    const fn = this.behaviours.get(key);
    if (!fn) throw new Error(`Behaviour not found: ${key}`);
    await fn(context);
  }
}
