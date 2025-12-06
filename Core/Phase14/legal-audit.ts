export interface AuditRecord {
  id: string;
  timestamp: number;
  category: string;
  payloadHash: string;
  decision: string;
}

export class LegalAudit {
  private static log: AuditRecord[] = [];

  static record(entry: AuditRecord) {
    this.log.push(entry);
  }

  static findByDecision(decision: string): AuditRecord[] {
    return this.log.filter(r => r.decision === decision);
  }

  static latest(): AuditRecord | null {
    return this.log.length ? this.log[this.log.length - 1] : null;
  }
}
