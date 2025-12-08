/*
  WyneOS v5 Wynerace
  Constitutional Governance Layer
  ----------------------------------------------------
  This file defines the highest-level principles that
  govern the behaviour of all subsystems.

  Safe. Declarative. Non-autonomous.
  No execution logic is contained here.
*/

export const WYNERACE_CONSTITUTION = {
  identity: {
    system: "WyneOS",
    edition: "Wynerace",
    version: "v5.0",
    authority: "governance_stack"
  },

  legal: {
    jurisdiction: "UK_LAW",
    dataProtection: "GDPR",
    prohibitsAutonomy: true,
    prohibitsExternalExecution: true
  },

  principles: {
    integrity: "All operations must be verifiable, logged, and traceable.",
    legality: "No component may exceed lawful boundaries.",
    transparency: "All governance decisions must produce an audit record.",
    containment: "No subsystem may act beyond its internal domain.",
    consent: "All actions must be explicitly invoked by the authorised user.",
    safety: "The system must default to deny when uncertain."
  },

  hierarchy: {
    top: "Constitution",
    below: [
      "Governance Manifest",
      "Governance Orchestrator",
      "Compliance Engine v5",
      "Kernel Fusion",
      "AuditGrid v2",
      "Sentinel Orchestrator",
      "Guardian Mesh",
      "TelemetryMatrix"
    ]
  },

  constraints: {
    allowAutonomy: false,
    allowSelfModification: false,
    allowExternalActions: false,
    allowUnauthorizedElevation: false
  },

  escalation: {
    chain: [
      "Compliance Engine",
      "Guardian Mesh",
      "Sentinel Orchestrator",
      "AuditGrid"
    ],
    defaultAction: "BLOCK_AND_LOG"
  },

  validation: {
    requireMerkleIntegrity: true,
    requireAuditTrail: true,
    requireTelemetryCapture: true
  },

  directives: {
    onViolation: "IMMEDIATE_BLOCK_ESCALATE_AUDIT",
    onUncertainty: "DENY_AND_LOG",
    onPolicyConflict: "CONSTITUTION_OVERRIDES_ALL"
  }
};
