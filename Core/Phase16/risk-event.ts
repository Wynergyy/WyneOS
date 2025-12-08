/**
 * Phase 16 — Risk Event Model
 * Defines standardised risk event structures for WyneOS.
 */

export interface RiskEventPayload {
  entityID: string;         // User, subsystem, licence ID, etc
  category: string;         // e.g., "AUTH", "DATA", "FINANCIAL", "LEGAL"
  severity: number;         // 1–10 raw severity indicator
  description: string;      // Human-readable explanation
  timestamp: number;        // Epoch ms
}

export class RiskEvent {
  readonly entityID: string;
  readonly category: string;
  readonly severity: number;
  readonly description: string;
  readonly timestamp: number;

  constructor(payload: RiskEventPayload) {
    this.entityID = payload.entityID;
    this.category = payload.category;
    this.severity = payload.severity;
    this.description = payload.description;
    this.timestamp = payload.timestamp ?? Date.now();
  }

  /**
   * Convert a raw risk event into a weighted signal for the RiskModel.
   */
  toSignal() {
    const weight = Math.min(1, Math.max(0.1, this.severity / 10));

    return {
      source: `risk-event:${this.category}`,
      weight,
      description: this.description,
      timestamp: this.timestamp
    };
  }
}
