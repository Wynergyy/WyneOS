/**
 * Phase 16 — Risk Model
 * WyneOS Risk Tiering Engine
 *
 * This module defines the data structures and weighting logic
 * for risk computation across all WyneOS subsystems.
 */

export type RiskTier = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface RiskSignal {
  source: string;          // Module generating the risk indicator
  weight: number;          // Numeric weight (0.1–1.0)
  description: string;     // Human-readable explanation
  timestamp: number;       // Epoch time
}

export interface RiskProfile {
  entityID: string;
  signals: RiskSignal[];
  computedRisk: RiskTier;
  score: number;           // 0–100
}

export class RiskModel {
  private static thresholds = {
    LOW: 25,
    MEDIUM: 50,
    HIGH: 75
  };

  /**
   * Compute numeric risk score
   */
  static computeScore(signals: RiskSignal[]): number {
    if (signals.length === 0) return 0;

    const total = signals.reduce((acc, sig) => acc + sig.weight * 10, 0);
    return Math.min(100, Math.round(total));
  }

  /**
   * Convert numeric score into tier
   */
  static scoreToTier(score: number): RiskTier {
    if (score < this.thresholds.LOW) return "LOW";
    if (score < this.thresholds.MEDIUM) return "MEDIUM";
    if (score < this.thresholds.HIGH) return "HIGH";
    return "CRITICAL";
  }

  /**
   * Build a full risk profile object
   */
  static buildProfile(entityID: string, signals: RiskSignal[]): RiskProfile {
    const score = this.computeScore(signals);
    const computedRisk = this.scoreToTier(score);

    return {
      entityID,
      signals,
      score,
      computedRisk
    };
  }
}
