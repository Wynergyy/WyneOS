export class MeshPredictor {
  computeForecast(ledgerState, meshConvState) {
    const cycles = ledgerState.cycles || [];
    const health = ledgerState.health || [];
    const conv = meshConvState.snapshots || [];

    if (cycles.length === 0) {
      return {
        score: 1.0,
        grade: "A",
        reason: "No data. Default stability.",
        risk: "none"
      };
    }

    const recentCycles = cycles.slice(-20);
    const recentHealth = health.slice(-20);
    const recentConv = conv.slice(-20);

    // HEALTH STABILITY
    let stable = 0;
    let degraded = 0;

    for (const h of recentHealth) {
      if (h.compatible) stable++;
      else degraded++;
    }

    const total = recentHealth.length || 1;
    const stabilityScore = stable / total;

    // MESH CONVERGENCE STABILITY
    let meshScore = 1;
    if (recentConv.length > 0) {
      meshScore = recentConv.map(c => c.score).reduce((a, b) => a + b, 0) / recentConv.length;
    }

    // OVERALL FORECAST
    const combined = parseFloat(((stabilityScore * 0.6) + (meshScore * 0.4)).toFixed(3));

    let grade = "A";
    let risk = "none";

    if (combined < 0.8) {
      grade = "B";
      risk = "low";
    }
    if (combined < 0.6) {
      grade = "C";
      risk = "medium";
    }
    if (combined < 0.4) {
      grade = "D";
      risk = "high";
    }

    return {
      score: combined,
      grade,
      risk,
      reason: `Based on ${recentCycles.length} cycles, ${stable} stable and ${degraded} degraded compatibility events.`
    };
  }

  buildSnapshot(state, forecast) {
    return {
      timestamp: new Date().toISOString(),
      cycle: state.orchestrationCycles,
      score: forecast.score,
      grade: forecast.grade,
      risk: forecast.risk,
      reason: forecast.reason
    };
  }
}
