export class BehaviourEngine {
  static rules = [];

  static registerRule(rule) {
    this.rules.push(rule);
  }

  static process(event) {
    return this.rules
      .filter(r => r.trigger === event.type)
      .map(r => r.action(event));
  }
}
