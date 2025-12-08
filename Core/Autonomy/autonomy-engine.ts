import { StateProvider } from "./state-provider";
import { BehaviourRegistry } from "./behaviour-registry";

export class AutonomyEngine {
  private state = new StateProvider();
  private behaviours = new BehaviourRegistry();

  boot() {
    this.state.incrementBootCount();
  }

  registerBehaviour(key: string, fn: (ctx: any) => any) {
    this.behaviours.register(key, fn);
  }

  async runBehaviour(key: string, ctx: any = {}) {
    await this.behaviours.run(key, ctx);
  }

  getState() {
    return this.state.getState();
  }

  getRegisteredBehaviours() {
    return this.behaviours.list();
  }
}
