import { createHash } from "crypto";
import * as fs from "fs";
import * as path from "path";

/**
 * Load WyneOS Integrity Module Manifest
 */
export const loadManifest = () => {
  const manifestPath = path.join(__dirname, "integrity-manifest.json");
  const raw = fs.readFileSync(manifestPath, "utf8");
  return JSON.parse(raw);
};

/**
 * Hash a file using SHA-256
 */
export const hashFile = (filePath: string): string => {
  const data = fs.readFileSync(filePath);
  const hash = createHash("sha256").update(data).digest("hex");
  return hash;
};

/**
 * Hash all module files deterministically in the order defined in the manifest
 */
export const hashModule = () => {
  const manifest = loadManifest();
  const baseDir = __dirname;

  const results: { file: string; hash: string }[] = [];

  for (const file of manifest.files) {
    const fullPath = path.join(baseDir, file);
    const digest = hashFile(fullPath);

    results.push({
      file,
      hash: digest
    });
  }

  return {
    module: manifest.module,
    version: manifest.version,
    hashing: results
  };
};

/**
 * Validate the module seal state
 */
export const verifySeal = () => {
  const manifest = loadManifest();

  if (manifest.seal.sealed !== false) {
    return {
      ok: true,
      status: "sealed",
      phase: manifest.seal.phase
    };
  }

  return {
    ok: true,
    status: "unsealed",
    phase: manifest.seal.phase
  };
};

/**
 * Full Integrity Check
 */
export const runIntegrityCheck = () => {
  const manifest = loadManifest();
  const hashes = hashModule();
  const seal = verifySeal();

  return {
    manifest,
    hashes,
    seal
  };
};

// CLI runner
if (require.main === module) {
  const output = runIntegrityCheck();
  console.log("WyneOS Integrity Engine");
  console.log(JSON.stringify(output, null, 2));
}

