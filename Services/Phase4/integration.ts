import { BehaviourEngine } from './behaviour-engine';
import { Phase4Rules } from './rules';

export class BehaviourIntegration {
  static initialise() {
    Phase4Rules.forEach(rule => BehaviourEngine.registerRule(rule));
  }

  static handle(event) {
    const results = BehaviourEngine.process(event);
    return results;
  }
}
