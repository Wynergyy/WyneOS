import { KernelBus } from "../kernel/kernel.bus";
import { AuditGrid } from "../auditgrid/auditgrid.bus";
import { SentinelOrchestrator } from "../sentinels/sentinel.orchestrator";
import { GuardianMesh } from "../guardian/guardian.mesh";
import { TelemetryController } from "../telemetrymatrix/telemetry.controller";
import { ComplianceEngine } from "../compliance/compliance.engine";

/*
  Governance Orchestrator v5 (Safe Mode)
  --------------------------------------------------
  • No autonomy.
  • No execution of real-world tasks.
  • Purely internal flow wiring.
  • All decisions must go through:
        1. Compliance Engine (legal + policy checks)
        2. Kernel approval
        3. AuditGrid record
        4. Sentinel oversight
*/

export class GovernanceOrchestrator {
  constructor(
    private kernel: KernelBus,
    private audit: AuditGrid,
    private sentinels: SentinelOrchestrator,
    private guardian: GuardianMesh,
    private telemetry: TelemetryController,
    private compliance: ComplianceEngine
  ) {}

  /*
    Safe action pathway.
    Action is checked, analysed, validated, then either:
    • BLOCKED safely
    • Logged + returned
    • Allowed internally (non-executing)
  */
  public process(action: string, payload: unknown) {
    const t = new Date().toISOString();

    // 1. Compliance validation
    const result = this.compliance.evaluate(action, payload);

    if (!result.allowed) {
      this.audit.record({
        type: "orchestrator_block",
        action,
        violations: result.violations,
        timestamp: t
      });

      this.sentinels.raiseAlert("ORCHESTRATOR_BLOCK", {
        action,
        violations: result.violations
      });

      return {
        allowed: false,
        reason: "compliance_rejection",
        detail: result
      };
    }

    // 2. Internal telemetry marker
    this.telemetry.record({
      channel: "governance",
      action,
      timestamp: t,
      payload
    });

    // 3. Kernel non-executing approval
    const approved = this.kernel.requestApproval(action, payload);

    if (!approved) {
      this.audit.record({
        type: "orchestrator_kernel_denial",
        action,
        timestamp: t
      });

      return {
        allowed: false,
        reason: "kernel_rejected"
      };
    }

    // 4. Safe internal return only
    return {
      allowed: true,
      status: "validated_and_logged",
      timestamp: t
    };
  }
}
