/**
 * WyneOS Integrity Engine
 * Public API Boundary
 *
 * This file defines the only supported import surface for
 * integrity, hashing, snapshotting, and validation logic.
 *
 * Internal files are intentionally not exported.
 */

/* Core engine */
export { IntegrityEngine } from "./integrity-engine";

/* Providers */
export { IntegrityProvider } from "./integrity-provider";

/* Hashing and snapshot utilities */
export { createHash } from "./hasher";
export { createSnapshot } from "./snapshot";

/* Validation */
export { validateIntegrity } from "./validators";

/* Historical and audit context */
export { IntegrityHistory } from "./history";

/* Types */
export type {
  IntegrityManifest,
  IntegrityResult,
  IntegritySnapshot,
} from "./integrity.manifest";
