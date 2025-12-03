/*
  WyneOS v5 – Runtime Authority Chain
  Resolution Layer
  -------------------------------------------------
  Final step before mutation enters Kernel Fusion.
  This confirms:
  • authority source
  • authority signature
  • lawful placement in hierarchy
*/

import { RuntimeAuthorityChain } from "./rac.chain";

export class RACResolver {
  constructor(private chain: RuntimeAuthorityChain) {}

  public authorise(action: string, payload: unknown) {
    const result = this.chain.resolve(action);

    if (!result.allowed) {
      return {
        allowed: false,
        reason: "blocked_by_runtime_authority_chain"
      };
    }

    return {
      allowed: true,
      authority: result.authority,
      payload
    };
  }
}
