// Phase 15 — Jurisdiction Audit
// Cryptographically seals jurisdiction decisions and policy outcomes.

import { createHash } from "crypto";
import { JurisdictionCode } from "./jurisdiction-model";

export interface JurisdictionAuditEntry {
  timestamp: number;
  jurisdiction: JurisdictionCode;
  sensitivity: number;
  allowed: boolean;
  escalation: string | null;
  ruleId: string | null;
  seal: string; // hash
}

export class JurisdictionAudit {
  private logs: JurisdictionAuditEntry[] = [];

  record(entry: Omit<JurisdictionAuditEntry, "seal">) {
    const seal = this.hashEntry(entry);
    const full: JurisdictionAuditEntry = { ...entry, seal };
    this.logs.push(full);
    return full;
  }

  private hashEntry(data: any) {
    const h = createHash("sha256");
    h.update(JSON.stringify(data));
    return h.digest("hex");
  }

  getAll() {
    return [...this.logs];
  }
}

export const JurisdictionAuditInstance = new JurisdictionAudit();
