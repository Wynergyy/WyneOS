import { createHash } from "crypto";
import { Phase10Sealed } from "./phase10-types";

/**
 * Phase 10 Telemetry Sealer
 * SAFE: Produces sealed telemetry objects for audit integrity.
 */

export const sealTelemetry = <T>(input: T): Phase10Sealed<T> => {
  const serialized = JSON.stringify(input);
  const seal = createHash("sha256").update(serialized).digest("hex");

  return {
    data: input,
    seal,
    sealedAt: Date.now()
  };
};
