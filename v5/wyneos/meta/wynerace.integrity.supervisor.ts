import { verifyChainState } from "../wynechain/verify";
import { auditEvent } from "../auditgrid/audit.logger";
import { detectModuleDrift } from "../telemetrymatrix/drift.detector";
import { triggerHardening } from "../loopylou/hardening.trigger";
import { WYNERACE_DEFAULT_POLICY } from "./wynerace.policy";

export async function runIntegritySupervisor() {
  const policy = WYNERACE_DEFAULT_POLICY;

  // 1. Validate base chain integrity
  const chainState = await verifyChainState();
  if (!chainState.valid) {
    await auditEvent("INTEGRITY_SUPERVISOR_CHAIN_FAILURE", chainState);
    await triggerHardening("chain_integrity_repair");
    return false;
  }

  // 2. Detect module drift from telemetry
  const drift = await detectModuleDrift();
  if (drift > policy.compliance.acceptableDeviation) {
    await auditEvent("MODULE_DRIFT_DETECTED", { drift });
    await triggerHardening("module_drift_repair");
    return false;
  }

  // 3. If everything is consistent
  await auditEvent("INTEGRITY_SUPERVISOR_OK", { drift: drift, chainState });
  return true;
}
