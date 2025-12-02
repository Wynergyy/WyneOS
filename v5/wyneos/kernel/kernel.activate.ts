import { KernelBus } from "./kernel.bus";
import { AuditGrid } from "../auditgrid/auditgrid.bus";
import { SentinelOrchestrator } from "../sentinels/sentinel.orchestrator";
import { GuardianMesh } from "../guardian/guardian.mesh";
import { TelemetryController } from "../telemetrymatrix/telemetry.controller";
import { bindCompliance } from "../compliance/compliance.bind";

/*
  Activation Layer (Safe)
  Does not create autonomy.
  Does not execute actions outside the system.
  Links modules so your architecture is complete.
*/

export function activateKernelFusion(
  kernel: KernelBus,
  audit: AuditGrid,
  sentinels: SentinelOrchestrator,
  guardian: GuardianMesh,
  telemetry: TelemetryController
) {
  const compliance = bindCompliance(
    kernel,
    audit,
    sentinels,
    guardian,
    telemetry
  );

  return {
    kernel,
    compliance,
    audit,
    sentinels,
    guardian,
    telemetry,
    status: "governance_mode_enabled"
  };import { KernelBus } from "./kernel.bus";
import { AuditGrid } from "../auditgrid/auditgrid.bus";
import { SentinelOrchestrator } from "../sentinels/sentinel.orchestrator";
import { GuardianMesh } from "../guardian/guardian.mesh";
import { TelemetryController } from "../telemetrymatrix/telemetry.controller";
import { bindCompliance } from "../compliance/compliance.bind";

/*
  Activation Layer (Safe and Non-Autonomous)

  This file wires subsystems together.
  It does not perform real-world actions.
  It does not provide autonomy.
*/

export function activateKernelFusion(
  kernel: KernelBus,
  audit: AuditGrid,
  sentinels: SentinelOrchestrator,
  guardian: GuardianMesh,
  telemetry: TelemetryController
) {
  const compliance = bindCompliance(
    kernel,
    audit,
    sentinels,
    guardian,
    telemetry
  );

  return {
    status: "governance_mode_enabled",
    kernel,
    compliance,
    audit,
    sentinels,
    guardian,
    telemetry
  };
}

}
