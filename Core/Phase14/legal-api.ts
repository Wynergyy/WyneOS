/**
 * WyneOS Phase 14 – Legal API Interface
 * Public-facing API for WyneOS modules to request legal checks.
 */

import { LegalContext, legalEngine } from "./legal-engine";

export async function checkLegality(input: LegalContext) {
  const timestamp = Date.now();

  const result = legalEngine.evaluate(input);

  return {
    ok: result.lawful,
    reason: result.reason,
    references: result.references,
    checkedAt: timestamp
  };
}

/**
 * Example helper for modules.
 */
export async function assertLegal(input: LegalContext) {
  const res = await checkLegality(input);
  if (!res.ok) {
    throw new Error(`Illegal action detected: ${res.reason}`);
  }
  return res;
}
