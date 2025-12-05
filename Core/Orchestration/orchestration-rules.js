export function evaluateOrchestrationRules(orchestrationState) {
  const notes = [];
  let status = "normal";

  const last = orchestrationState.lastAutonomyCycle;

  if (!last) {
    return {
      status: "initialising",
      notes: ["No autonomy cycles recorded yet."]
    };
  }

  if (last.autonomyDurationMs > 2000) {
    status = "slow";
    notes.push("Autonomy engine exceeded 2 seconds runtime.");
  }

  if (orchestrationState.systemHealth === "degraded") {
    status = "attention";
    notes.push("System health marked as degraded.");
  }

  if (orchestrationState.systemHealth === "slow") {
    status = "critical";
    notes.push("System health marked as slow.");
  }

  return {
    status,
    notes
  };
}
