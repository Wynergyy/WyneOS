/* ------------------------------------------------------------
   KERNEL STATE v5
   Purpose:
   - Maintain deterministic OS state transitions
   - Enforce legal state changes only
   - Block unexpected or unauthorised transitions
------------------------------------------------------------ */

export type KernelState =
  | "initialising"
  | "monitoring"
  | "evaluating"
  | "resolving"
  | "harmonising"
  | "idle";

let currentState: KernelState = "initialising";

const allowedTransitions: Record<KernelState, KernelState[]> = {
  initialising: ["monitoring"],
  monitoring: ["evaluating"],
  evaluating: ["resolving"],
  resolving: ["harmonising"],
  harmonising: ["monitoring", "idle"],
  idle: ["monitoring"]
};

export function getKernelState(): KernelState {
  return currentState;
}

export function setKernelState(next: KernelState): boolean {
  const allowed = allowedTransitions[currentState];
  if (!allowed.includes(next)) {
    return false; // HARD BLOCK
  }

  currentState = next;
  return true;
}
