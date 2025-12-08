// Phase 15 — Jurisdiction Router
// Provides routing logic based on jurisdiction, sensitivity and policy demands.

import { Jurisdiction, JurisdictionCode } from "./jurisdiction-model";

export interface JurisdictionDecision {
  jurisdiction: JurisdictionCode;
  safe: boolean;
  regulatorNotice: string[];
  reason: string;
}

export class JurisdictionRouter {
  route(payload: { country?: string; sensitivity: number }): JurisdictionDecision {
    const code = this.resolveCountry(payload.country);
    const profile = Jurisdiction.resolve(code);

    const safe = payload.sensitivity <= profile.sensitivity;

    return {
      jurisdiction: code,
      safe,
      regulatorNotice: safe ? [] : profile.regulators,
      reason: safe
        ? "Payload within jurisdiction limits"
        : "Payload exceeds jurisdiction sensitivity threshold"
    };
  }

  private resolveCountry(country?: string): JurisdictionCode {
    if (!country) return "SAFE_DEFAULT";

    const v = country.toLowerCase();
    if (v === "uk" || v.includes("england") || v.includes("scotland")) return "UK";
    if (v === "eu" || v.includes("france") || v.includes("germany")) return "EU";
    if (v === "us" || v.includes("america") || v.includes("usa")) return "US";

    return "GLOBAL";
  }
}

export const JurisdictionRouterInstance = new JurisdictionRouter();
