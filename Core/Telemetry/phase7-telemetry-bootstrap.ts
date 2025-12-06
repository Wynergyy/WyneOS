import { TelemetryEngine } from "./telemetry-engine";

const telemetry = new TelemetryEngine();

telemetry.on("system.boot", (event) => {
  console.log("[Telemetry] System boot observed:", event);
});

async function main() {
  await telemetry.record("system.boot", { message: "WyneOS Telemetry Matrix online." });
  console.log("Registered telemetry channels:", telemetry.list());
}

main().catch(err => console.error(err));
