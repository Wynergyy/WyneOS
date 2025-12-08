/*
  WyneOS v5 Wynerace
  Kernel Mutation Contract
  ----------------------------------------------------
  This file defines the legally bounded rules that govern
  all mutation requests within Kernel Fusion.

  Mutation = any change that alters system state,
  persistent values, canonical data, sealed structures,
  chain commitments, or governance records.
*/

export type MutationClass =
  | "config_update"
  | "state_patch"
  | "governance_shift"
  | "chain_append"
  | "seal_issue"
  | "seal_rotate";

export interface MutationRule {
  type: MutationClass;

  // Whether the mutation is allowed in principle.
  allowed: boolean;

  // Whether a governance signature is required.
  requiresGovernanceSeal: boolean;

  // Whether compliance must pre-authorise action.
  requiresComplianceApproval: boolean;

  // Whether audit integrity must be verified before execution.
  requiresIntegrityCheck: boolean;

  // Whether this mutation type is reversible.
  reversible: boolean;

  // Notes to Kernel Fusion and Compliance Engine.
  notes?: string;
}

export const KERNEL_MUTATION_CONTRACT: MutationRule[] = [
  {
    type: "config_update",
    allowed: true,
    requiresGovernanceSeal: true,
    requiresComplianceApproval: true,
    requiresIntegrityCheck: true,
    reversible: true,
    notes: "Configuration updates must be logged, reversible, and double-signed."
  },
  {
    type: "state_patch",
    allowed: true,
    requiresGovernanceSeal: false,
    requiresComplianceApproval: true,
    requiresIntegrityCheck: true,
    reversible: true,
    notes: "Minor state patches permitted but always integrity-verified."
  },
  {
    type: "governance_shift",
    allowed: false,
    requiresGovernanceSeal: true,
    requiresComplianceApproval: true,
    requiresIntegrityCheck: true,
    reversible: false,
    notes: "Major governance transformations cannot be executed at runtime."
  },
  {
    type: "chain_append",
    allowed: true,
    requiresGovernanceSeal: false,
    requiresComplianceApproval: true,
    requiresIntegrityCheck: true,
    reversible: false,
    notes: "Chain commits are append-only and permanent."
  },
  {
    type: "seal_issue",
    allowed: true,
    requiresGovernanceSeal: true,
    requiresComplianceApproval: true,
    requiresIntegrityCheck: true,
    reversible: false,
    notes: "Issuing a seal is an irreversible cryptographic action."
  },
  {
    type: "seal_rotate",
    allowed: true,
    requiresGovernanceSeal: true,
    requiresComplianceApproval: true,
    requiresIntegrityCheck: true,
    reversible: false,
    notes: "Key rotations must be protected and permanently recorded."
  }
];

/*
  Internal Kernel Note:
  Kernel Fusion must load this contract during startup
  and enforce:
  
  • no mutation occurs without contract validation
  • compliance approval is checked before mutation
  • governance seals applied where required
  • audit integrity verified for every mutation
  • irreversible actions cannot be undone
  • prohibited mutation types are fully blocked
*/
