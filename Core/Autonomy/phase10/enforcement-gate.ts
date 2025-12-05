import {
  Phase10Simulation,
  Phase10EnforcementRequest,
  Phase10EnforcementResult
} from "./phase10-types";

/**
 * Phase 10 Enforcement Gate
 * SAFE: No actions occur without human approval.
 * This file creates and finalises enforcement decisions.
 */

/**
 * Creates an enforcement request based on a simulation.
 * The request remains unapproved until a human authorises it.
 */
export const requestEnforcementApproval = (
  simulation: Phase10Simulation
): Phase10EnforcementRequest => {

  return {
    timestamp: Date.now(),
    simulation,
    approved: false,
    reason: "Awaiting human approval",
    sealed: false
  };
};

/**
 * Executes enforcement ONLY if a human approves it.
 * If not approved, no action is taken.
 */
export const applyEnforcement = async (
  req: Phase10EnforcementRequest,
  approved: boolean,
  reason?: string
): Promise<Phase10EnforcementResult> => {

  if (!approved) {
    return {
      timestamp: Date.now(),
      executed: false,
      reason: reason || "Rejected by human operator",
      sealed: false
    };
  }

  return {
    timestamp: Date.now(),
    executed: true,
    reason: reason || "Approved and executed by human operator",
    sealed: false
  };
};
