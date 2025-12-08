// Phase 15 — Jurisdiction Model
// Defines legal jurisdictions, regulatory frameworks, and routing metadata.

export type JurisdictionCode =
  | "UK"
  | "EU"
  | "US"
  | "GLOBAL"
  | "SAFE_DEFAULT";

export interface JurisdictionProfile {
  code: JurisdictionCode;
  region: string;
  regulators: string[];
  sensitivity: number; // 0–10 scale
  notes?: string;
}

export class JurisdictionModel {
  private profiles: Record<JurisdictionCode, JurisdictionProfile> = {
    UK: {
      code: "UK",
      region: "United Kingdom",
      regulators: ["ICO", "FCA", "OFCOM"],
      sensitivity: 8,
      notes: "Default operational jurisdiction for SAS, WFSL, HSRN."
    },
    EU: {
      code: "EU",
      region: "European Union",
      regulators: ["EDPB"],
      sensitivity: 9,
      notes: "GDPR strict region."
    },
    US: {
      code: "US",
      region: "United States",
      regulators: ["FTC", "FCC"],
      sensitivity: 6
    },
    GLOBAL: {
      code: "GLOBAL",
      region: "International",
      regulators: [],
      sensitivity: 5,
      notes: "Used for federated operations."
    },
    SAFE_DEFAULT: {
      code: "SAFE_DEFAULT",
      region: "Safety Fallback",
      regulators: [],
      sensitivity: 10,
      notes: "Used when no jurisdiction is safe or resolvable."
    }
  };

  resolve(code: JurisdictionCode): JurisdictionProfile {
    return this.profiles[code] ?? this.profiles.SAFE_DEFAULT;
  }
}

export const Jurisdiction = new JurisdictionModel();
