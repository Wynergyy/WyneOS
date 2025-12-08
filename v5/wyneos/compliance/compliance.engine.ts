import { WYNERACE_DEFAULT_POLICY } from "../meta/wynerace.policy";
import { AuditGrid } from "../auditgrid/auditgrid.bus";
import { KernelBus } from "../kernel/kernel.bus";
import { SentinelOrchestrator } from "../sentinels/sentinel.orchestrator";
import { GuardianMesh } from "../guardian/guardian.mesh";
import { TelemetryPacket } from "../telemetrymatrix/telemetry.packet";
import { TelemetryController } from "../telemetrymatrix/telemetry.controller";
import { LegalGuard } from "./legal.guard";

/*
  Compliance Engine v5
  Law-aligned autonomy governor.

  Every decision is checked against:
  • legal boundaries
  • organisational policy
  • Wynerace constitutional rules
  • safety standards
  • audit requirements

  Hardened for deterministic evaluation.
*/

export class ComplianceEngine {
  private policy = WYNERACE_DEFAULT_POLICY;
  private legal = new LegalGuard();

  constructor(
    private kernel: KernelBus,
    private audit: AuditGrid,
    private sentinels: SentinelOrchestrator,
    private guardian: GuardianMesh,
    private telemetry: TelemetryController
  ) {}

  /* Core compliance evaluation */
  public evaluate(action: string, payload: unknown) {
    const timestamp = new Date().toISOString();

    // Hardening Layer 1 – Policy simulation must remain ON
    if (!this.policy.governance.simulateBeforeApply) {
      throw new Error("Governance simulation disabled. Unsafe operation blocked.");
    }

    // Telemetry logging
    const packet = new TelemetryPacket("compliance", {
      action,
      timestamp,
      payload
    });
    this.telemetry.record(packet);

    // Aggregate all violations
    const violations = this.scanForViolations(action, payload);

    if (violations.length > 0) {
      // Mesh-level escalation
      this.guardian.trigger("compliance_violation", { action, violations });

      // Sentinel-line escalation
      this.sentinels.raiseAlert("COMPLIANCE_BLOCK", { action, violations });

      // Audit record
      this.audit.record({
        type: "compliance_block",
        action,
        violations,
        timestamp
      });

      return {
        allowed: false,
        violations
      };
    }

    // Hardening Layer 2 – Merkle integrity enforcement
    this.audit.requireIntegrity();

    // Hardening Layer 3 – Kernel governance approval
    const approved = this.kernel.requestApproval(action, payload);

    if (!approved) {
      this.audit.record({
        type: "kernel_denial",
        action,
        timestamp
      });

      return { allowed: false, reason: "kernel_rejected" };
    }

    return { allowed: true };
  }

  /* Violation scanner */
  private scanForViolations(action: string, payload: unknown): string[] {
    const issues: string[] = [];

    // Missing bindings
    if (this.policy.compliance.requireAuditGrid && !this.audit) {
      issues.push("Missing AuditGrid binding");
    }

    if (this.policy.compliance.requireTelemetry && !this.telemetry) {
      issues.push("Missing TelemetryMatrix binding");
    }

    // Policy validation
    if (this.policy.security.anomalyThreshold < 0.1 ||
        this.policy.security.anomalyThreshold > 1) {
      issues.push("Security anomaly threshold out of bounds");
    }

    // Input validation
    if (!action || typeof action !== "string") {
      issues.push("Invalid action");
    }

    // Legal validation (safe and static)
    const legalIssues = this.legal.validate(action, payload);
    issues.push(...legalIssues);

    return issues;
  }
}
