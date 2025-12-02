/*
  WyneOS v5 – Kernel Fusion
  Unified Execution and Governance Hub
  ---------------------------------------------------
  Now extended with:
  • Runtime Authority Chain (RAC)
  • Compliance Engine v5 gatekeeping
  • Sentinel orchestration fallback
  ---------------------------------------------------
*/

import { KernelState } from "./kernel.state";
import { KernelBus } from "./kernel.bus";
import { MutationContract } from "./kernel.mutation.contract";

import { RuntimeAuthorityChain } from "../governance/runtime-authority/rac.chain";
import { RACResolver } from "../governance/runtime-authority/rac.resolution";

export class KernelFusion {
  private state: KernelState;
  private bus: KernelBus;
  private mutation: MutationContract;

  private rac: RuntimeAuthorityChain;
  private racResolver: RACResolver;

  constructor(
    state: KernelState,
    bus: KernelBus,
    mutation: MutationContract,
    rac: RuntimeAuthorityChain
  ) {
    this.state = state;
    this.bus = bus;
    this.mutation = mutation;

    this.rac = rac;
    this.racResolver = new RACResolver(rac);
  }

  /*
    Kernel Approval Path v5
    ---------------------------------------------------
    1. RAC resolves highest authority
    2. Mutation Contract validates payload legitimacy
    3. KernelBus dispatch verification
    4. KernelState final commit
  */
  public requestApproval(action: string, payload: unknown): boolean {
    // Step 1 – authority resolution
    const authorityCheck = this.racResolver.authorise(action, payload);

    if (!authorityCheck.allowed) {
      console.warn("RAC BLOCK:", authorityCheck);
      return false;
    }

    // Step 2 – mutation contract validation
    const mutationCheck = this.mutation.validate(action, payload);

    if (!mutationCheck.valid) {
      console.warn("MUTATION CONTRACT BLOCK:", mutationCheck.reason);
      return false;
    }

    // Step 3 – runtime dispatch
    const dispatched = this.bus.dispatch(action, payload);

    if (!dispatched) {
      console.warn("KERNEL BUS BLOCK: dispatch failure");
      return false;
    }

    // Step 4 – commit state
    this.state.commit(action, payload, authorityCheck.authority);

    return true;
  }
}
