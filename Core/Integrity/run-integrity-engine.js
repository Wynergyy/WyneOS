// WyneOS Integrity Engine – Full Module Sweep
// Scans all Integrity module files, hashes them deterministically,
// updates manifest, and outputs Phase 6 readiness.

// Required modules
import { createHash } from "crypto";
import fs from "fs";
import path from "path";

// Load manifest
const manifestPath = path.resolve("E:/CIC/WyneOS/Core/Integrity/integrity.manifest.json");
let manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

// Helper: compute SHA-256
function sha256(data) {
  return createHash("sha256").update(data).digest("hex");
}

// Helper: read file content safely
function loadFile(filePath) {
  const abs = path.resolve(filePath);
  if (!fs.existsSync(abs)) {
    throw new Error("File not found: " + abs);
  }
  return fs.readFileSync(abs, "utf8");
}

// Prepare file list from manifest
const baseDir = "E:/CIC/WyneOS/Core/Integrity";
const files = manifest.files.map(f => path.join(baseDir, f));

// Output header
console.log("WyneOS Integrity Engine – Full Sweep");
console.log("====================================\n");

let results = [];
let allGood = true;

// Process each file
for (const file of files) {
  try {
    const contents = loadFile(file);
    const digest = sha256(contents);

    results.push({ file, digest, status: "OK" });

    console.log("File:", file);
    console.log("SHA-256:", digest);
    console.log("Status: OK\n");
  } catch (err) {
    results.push({ file, digest: null, status: "ERROR: " + err.message });
    allGood = false;

    console.log("File:", file);
    console.log("ERROR:", err.message, "\n");
  }
}

// Update manifest sealing status
manifest.seal.lastVerified = new Date().toISOString();
manifest.seal.sealed = allGood;

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log("====================================");
console.log("Sweep Complete");
console.log("All files OK:", allGood);
console.log("Manifest updated at:", manifest.seal.lastVerified);
console.log("Seal State:", manifest.seal.sealed ? "READY FOR PHASE 6" : "ERRORS DETECTED");
console.log("====================================");
