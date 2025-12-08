export interface LicenceRecord {
  valid: boolean;
  reason: string;
}

export class LicenceCheck {
  constructor(private validator: (nodeId: string) => Promise<LicenceRecord>) {}

  async verify(nodeId: string) {
    try {
      return await this.validator(nodeId);
    } catch {
      return { valid: false, reason: "Licence validation error" };
    }
  }
}
