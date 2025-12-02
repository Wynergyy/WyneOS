import { ComplianceEngine } from "./compliance.engine";
import { KernelBus } from "../kernel/kernel.bus";
import { AuditGrid } from "../auditgrid/auditgrid.bus";
import { SentinelOrchestrator } from "../sentinels/sentinel.orchestrator";
import { GuardianMesh } from "../guardian/guardian.mesh";
import { TelemetryController } from "../telemetrymatrix/telemetry.controller";

export function bindCompliance(
  kernel: KernelBus,
  audit: AuditGrid,
  sentinels: SentinelOrchestrator,
  guardian: GuardianMesh,
  telemetry: TelemetryController
) {
  const engine = new ComplianceEngine(kernel, audit, sentinels, guardian, telemetry);

  return {
    engine,
    evaluate: (action: string, payload: unknown) =>
      engine.evaluate(action, payload)
  };
}
