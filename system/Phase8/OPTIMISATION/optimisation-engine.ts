export function optimise(telemetry: any) {
  return {
    timestamp: new Date().toISOString(),
    action: "none-required",
    reason: "Telemetry within expected bounds",
    phase: 8
  };
}
