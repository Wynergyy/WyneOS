/*
  WyneOS v5 Wynerace
  Runtime Contract
  ----------------------------------------------------
  This file defines the allowed interaction rules for
  all modules within the WyneOS v5 architecture.

  It does NOT execute logic. It is a static structural
  contract used by Kernel Fusion, Compliance Engine v5,
  Sentinels, AuditGrid v2, Guardian Mesh, and WyneChain
  to validate whether runtime actions are legal, safe,
  and permitted.
*/

export type RuntimeActionLevel =
  | "read"
  | "write"
  | "mutate"
  | "govern"
  | "seal"
  | "audit"
  | "telemetry";

export interface RuntimeBound {
  module: string;
  allowed: RuntimeActionLevel[];
  restricted?: RuntimeActionLevel[];
  notes?: string;
}

export const WYNEOS_RUNTIME_CONTRACT: RuntimeBound[] = [
  {
    module: "kernel",
    allowed: ["read", "write", "mutate", "govern", "seal"],
    notes: "Kernel Fusion holds the primary authority for approving system-level mutations."
  },
  {
    module: "auditgrid",
    allowed: ["read", "audit", "telemetry"],
    restricted: ["mutate"],
    notes: "AuditGrid v2 may never mutate state. It certifies integrity only."
  },
  {
    module: "guardian",
    allowed: ["read", "audit"],
    restricted: ["write", "mutate"],
    notes: "Guardian Mesh monitors but cannot modify system state."
  },
  {
    module: "sentinels",
    allowed: ["read", "audit"],
    restricted: ["write", "mutate"],
    notes: "Sentinels may raise alerts but cannot mutate or govern."
  },
  {
    module: "telemetrymatrix",
    allowed: ["read", "telemetry"],
    restricted: ["write", "mutate"],
    notes: "TelemetryMatrix records packets only. No authority to modify data."
  },
  {
    module: "wynechain",
    allowed: ["read", "audit"],
    restricted: ["write", "mutate"],
    notes: "Chain blocks are append-only. No mutation permitted by any subsystem."
  },
  {
    module: "compliance",
    allowed: ["read", "audit", "govern"],
    restricted: ["mutate"],
    notes: "Compliance Engine evaluates but does not change system data directly."
  },
  {
    module: "governance",
    allowed: ["read", "govern", "seal"],
    restricted: ["mutate"],
    notes: "Governance can authorise or deny. It does not mutate runtime state."
  },
  {
    module: "ai",
    allowed: ["read"],
    restricted: ["write", "mutate", "govern", "seal"],
    notes: "AI modules operate strictly in advisory, non-authoritative mode."
  }
];

/*
  Identity statement:
  This contract defines non-autonomous, legally aligned,
  bounded operational behaviour for all WyneOS modules.

  Kernel Fusion, Compliance Engine v5, and AuditGrid v2
  use this file as the canonical definition of
  allowed vs. prohibited runtime engagements.
*/
