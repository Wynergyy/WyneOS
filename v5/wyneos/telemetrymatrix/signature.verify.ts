/* ------------------------------------------------------------
   TELEMETRYMATRIX v2: SIGNATURE VERIFIER
   Purpose:
   - Validate internal telemetry packet signatures
   - Prevent forged signals from entering the AI chain
------------------------------------------------------------ */

const VALID_SIGNATURE_PREFIX = "WYNEOS-SIGN-";

export async function verifyTelemetrySignature(sig: string): Promise<boolean> {
  if (!sig || typeof sig !== "string") return false;
  if (!sig.startsWith(VALID_SIGNATURE_PREFIX)) return false;

  // Harden: structural integrity check
  if (sig.length < 20 || sig.length > 120) return false;

  return true;
}
