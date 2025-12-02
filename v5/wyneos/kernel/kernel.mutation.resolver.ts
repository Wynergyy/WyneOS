/*
  WyneOS v5 Wynerace
  Kernel Mutation Resolver
  -----------------------------------------------------
  This resolver enforces:
  • mutation legality
  • contract validation
  • compliance pre-approval
  • governance seal enforcement
  • sentinel and guardian alerts
  • auditgrid integrity checks
*/

import { KERNEL_MUTATION_CONTRACT, MutationClass } from "./kernel.mutation.contract";
import { ComplianceEngine } from "../compliance/compliance.engine";
import { GovernanceSeal } from "../governance/governance.seal";
import { AuditGrid } from "../auditgrid/auditgrid.bus";
import { SentinelOrchestrator } from "../sentinels/sentinel.orchestrator";
import { GuardianMesh } from "../guardian/guardian.mesh";

export class KernelMutationResolver {
  constructor(
    private compliance: ComplianceEngine,
    private audit: AuditGrid,
    private sentinels: SentinelOrchestrator,
    private guardian: GuardianMesh,
    private seal: GovernanceSeal
  ) {}

  public resolve(type: MutationClass, payload: unknown) {
    const rule = KERNEL_MUTATION_CONTRACT.find(r => r.type === type);

    if (!rule) {
      throw new Error(`Unknown mutation type: ${type}`);
    }

    // Contract-level block
    if (!rule.allowed) {
      this.guardian.trigger("mutation_denied_contract", { type });
      this.sentinels.raiseAlert("MUTATION_BLOCKED", { reason: "contract_forbidden", type });
      this.audit.record({ type: "mutation_blocked_contract", mutation: type });
      return { allowed: false, reason: "contract_forbidden" };
    }

    // Compliance validation
    const complianceResult = this.compliance.evaluate(`mutation:${type}`, payload);
    if (!complianceResult.allowed) {
      this.audit.record({ type: "mutation_compliance_blocked", mutation: type, detail: complianceResult });
      return { allowed: false, reason: "compliance_block" };
    }

    // Integrity requirement
    if (rule.requiresIntegrityCheck) {
      this.audit.requireIntegrity();
    }

    // Governance Seal requirement
    if (rule.requiresGovernanceSeal) {
      const checked = this.seal.validate();
      if (!checked.valid) {
        this.guardian.trigger("seal_failure", checked);
        this.sentinels.raiseAlert("SEAL_INVALID", checked);
        this.audit.record({ type: "governance_seal_invalid", detail: checked });
        return { allowed: false, reason: "invalid_governance_seal" };
      }
    }

    // Mutation approved
    this.audit.record({
      type: "mutation_approved",
      mutation: type,
      payload,
      irreversible: !rule.reversible
    });

    return { allowed: true };
  }
}
