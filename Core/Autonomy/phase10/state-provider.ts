// WyneOS Phase 10
// State Provider
// Deterministic Phase 10 system report

import { getIntegrityState } from "./stubs/integrity-provider.ts";
import { getLicenceState } from "./stubs/licence-provider.ts";
import { getAutonomyState } from "./stubs/state-provider.ts";

function safe(label, fn) {
  return fn().catch(err => ({
    ok: false,
    label,
    error: String(err)
  }));
}

export async function buildPhase10Report() {
  const timestamp = new Date().toISOString();

  const integrity = await safe("integrity", async () => {
    return await getIntegrityState();
  });

  const licence = await safe("licence", async () => {
    return await getLicenceState();
  });

  const autonomy = await safe("autonomy", async () => {
    return await getAutonomyState();
  });

  return {
    phase: 10,
    generated: timestamp,
    integrity,
    licence,
    autonomy
  };
}
