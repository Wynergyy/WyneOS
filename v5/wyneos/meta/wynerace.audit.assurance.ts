import { auditEvent } from "../auditgrid/audit.logger";
import { verifyAuditRecord } from "../auditgrid/verify";
import { WYNERACE_DEFAULT_POLICY } from "./wynerace.policy";

export async function enforceAuditAssurance(eventName: string, payload: any) {
  const policy = WYNERACE_DEFAULT_POLICY;

  // 1. Write audit entry
  await auditEvent(eventName, payload);

  // 2. Verify the entry exists and is valid
  const recordIsValid = await verifyAuditRecord(eventName, payload);

  if (!recordIsValid) {
    await auditEvent("AUDIT_ASSURANCE_FAILURE", {
      failedEvent: eventName,
      payload
    });

    // Trigger a hardening path for audit reliability
    if (policy.governance.escalationMode === "auto") {
      // We do not call external logic here, only internal consistency checks.
      return false;
    }

    return false;
  }

  // 3. Audit record confirmed valid
  await auditEvent("AUDIT_ASSURANCE_OK", {
    event: eventName
  });

  return true;
}
