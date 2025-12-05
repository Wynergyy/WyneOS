export class MeshTrust {
  computeTrust(ledgerState, meshConvState, meshPredState) {
    const cycles = ledgerState.cycles || [];
    const conv = meshConvState.snapshots || [];
    const forecasts = meshPredState.forecasts || [];

    if (cycles.length === 0) {
      return {
        score: 1.0,
        grade: "A",
        reason: "No historical samples. Default trust applied."
      };
    }

    const recentConv = conv.slice(-20);
    const recentPred = forecasts.slice(-20);

    const convAvg =
      recentConv.length > 0
        ? recentConv.map(c => c.score).reduce((a, b) => a + b, 0) / recentConv.length
        : 1;

    const predAvg =
      recentPred.length > 0
        ? recentPred.map(f => f.score).reduce((a, b) => a + b, 0) / recentPred.length
        : 1;

    // Weighted trust model
    const trustScore = parseFloat(((convAvg * 0.7) + (predAvg * 0.3)).toFixed(3));

    let grade = "A";
    if (trustScore < 0.8) grade = "B";
    if (trustScore < 0.6) grade = "C";
    if (trustScore < 0.4) grade = "D";

    return {
      score: trustScore,
      grade,
      reason: `Trust based on ${recentConv.length} convergence and ${recentPred.length} prediction samples.`
    };
  }

  buildSnapshot(state, trust) {
    return {
      timestamp: new Date().toISOString(),
      cycle: state.orchestrationCycles,
      score: trust.score,
      grade: trust.grade,
      reason: trust.reason
    };
  }
}
