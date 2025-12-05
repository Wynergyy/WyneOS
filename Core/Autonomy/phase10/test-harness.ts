import { buildPhase10Report } from "./state-provider.ts";

(async () => {
  try {
    console.log("=== Phase 10 Test Harness ===");
    
    const report = await buildPhase10Report();

    console.log("Phase 10 dry-run report generated successfully:");
    console.log(JSON.stringify(report, null, 2));

    console.log("=== Phase 10 Test Harness Complete ===");
  } catch (err) {
    console.error("Error running Phase 10 harness:", err);
  }
})();
