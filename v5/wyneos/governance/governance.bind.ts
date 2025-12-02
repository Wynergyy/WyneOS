import { KernelBus } from "../kernel/kernel.bus";
import { AuditGrid } from "../auditgrid/auditgrid.bus";
import { SentinelOrchestrator } from "../sentinels/sentinel.orchestrator";
import { GuardianMesh } from "../guardian/guardian.mesh";
import { TelemetryController } from "../telemetrymatrix/telemetry.controller";
import { ComplianceEngine } from "../compliance/compliance.engine";
import { GovernanceOrchestrator } from "./governance.orchestrator";

/*
  Governance Binding Sequence v5
  ------------------------------------------
  Safe, non-autonomous wiring of the governance stack.
  This unifies:
    • Kernel
    • Compliance Engine
    • AuditGrid v2
    • Sentinels
    • Guardian Mesh
    • TelemetryMatrix
    • Governance Orchestrator
*/

export function bindGovernance(
  kernel: KernelBus,
  audit: AuditGrid,
  sentinels: SentinelOrchestrator,
  guardian: GuardianMesh,
  telemetry: TelemetryController,
  compliance: ComplianceEngine
) {
  const orchestrator = new GovernanceOrchestrator(
    kernel,
    audit,
    sentinels,
    guardian,
    telemetry,
    compliance
  );

  return {
    kernel,
    compliance,
    audit,
    sentinels,
    guardian,
    telemetry,
    orchestrator,
    status: "governance_stack_bound"
  };
}
