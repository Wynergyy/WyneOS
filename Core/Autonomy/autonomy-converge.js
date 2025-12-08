export function computeConvergence(telemetryLog) {
  if (!telemetryLog || telemetryLog.length === 0) {
    return {
      score: 1.0,
      grade: "A",
      notes: ["Empty telemetry log. Defaulting to full stability."]
    };
  }

  const recent = telemetryLog.slice(-20);

  let stableCount = 0;
  let warningCount = 0;
  let criticalCount = 0;

  for (const entry of recent) {
    if (entry.stabilityForecast === "stable") stableCount++;
    if (entry.stabilityForecast === "warning") warningCount++;
    if (entry.stabilityForecast === "critical") criticalCount++;
  }

  const total = recent.length;
  const score =
    (stableCount * 1.0 + warningCount * 0.6 + criticalCount * 0.2) / total;

  let grade = "A";
  if (score < 0.8) grade = "B";
  if (score < 0.6) grade = "C";
  if (score < 0.4) grade = "D";

  const notes = [];

  if (criticalCount > 0) {
    notes.push("Critical stability patterns detected in recent cycles.");
  }

  if (warningCount > 5) {
    notes.push("Warning events are more frequent than expected.");
  }

  if (stableCount === total) {
    notes.push("System maintaining full stability.");
  }

  return {
    score: parseFloat(score.toFixed(3)),
    grade,
    notes
  };
}

export function buildConvergenceSnapshot(state, convergence) {
  return {
    timestamp: new Date().toISOString(),
    cycle: state.cycles,
    score: convergence.score,
    grade: convergence.grade,
    notes: convergence.notes
  };
}
