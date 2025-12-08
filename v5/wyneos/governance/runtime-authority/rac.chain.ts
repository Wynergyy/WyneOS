/*
  WyneOS v5 – Runtime Authority Chain
  Authority Chain Manager
  ---------------------------------------------
  Ensures:
  • hierarchy validation
  • authority escalation
  • conflict resolution
  • lawful override protection
*/

import { RACNode } from "./rac.node";

export class RuntimeAuthorityChain {
  private chain: RACNode[] = [];

  public register(node: RACNode) {
    this.chain.push(node);
    this.sort();
  }

  private sort() {
    this.chain.sort((a, b) => a.meta().rank - b.meta().rank);
  }

  public resolve(action: string) {
    const active = this.chain.filter(n => n.meta().active);

    if (active.length === 0) {
      return { allowed: false, reason: "no_active_authority" };
    }

    const highest = active[0];

    return {
      allowed: true,
      authority: highest.meta(),
      action
    };
  }

  public getChain() {
    return this.chain.map(n => n.meta());
  }
}
