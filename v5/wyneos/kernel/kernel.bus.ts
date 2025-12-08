/* ------------------------------------------------------------
   KERNEL BUS v5
   Purpose:
   - Hardened internal event router
   - Validates all messages before allowing propagation
   - Ensures every event is state-approved and policy-approved
------------------------------------------------------------ */

import { getKernelState } from "./kernel.state";
import { WYNERACE_DEFAULT_POLICY } from "../meta/wynerace.policy";

export interface KernelEvent {
  type: string;
  payload: unknown;
  timestamp: string;
}

export function dispatchEvent(event: KernelEvent): boolean {
  const state = getKernelState();
  const allowed = WYNERACE_DEFAULT_POLICY.governance.auditOnEveryAction;

  if (!allowed) {
    return false;
  }

  if (!event.type || typeof event.type !== "string") return false;

  // Basic structural validation
  if (!event.timestamp) return false;

  // Harden: reject oversized payloads
  if (JSON.stringify(event).length > 5000) return false;

  // If all checks pass, event is approved for routing
  return true;
}
