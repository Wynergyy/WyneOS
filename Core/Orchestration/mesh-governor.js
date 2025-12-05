export class MeshGovernor {
  computeGovernance(state, meshConvState, meshPredState, meshTrustState) {
    const conv = meshConvState.snapshots || [];
    const pred = meshPredState.forecasts || [];
    const trust = meshTrustState.trustSnapshots || [];

    const recentConv = conv.slice(-10);
    const recentPred = pred.slice(-10);
    const recentTrust = trust.slice(-10);

    if (recentConv.length === 0) {
      return {
        score: 1.0,
        level: "baseline",
        reason: "Insufficient convergence samples. Default governor level."
      };
    }

    const avgConv =
      recentConv.map(s => s.score).reduce((a, b) => a + b, 0) / recentConv.length;

    const avgPred = recentPred.length > 0
      ? recentPred.map(f => f.score).reduce((a, b) => a + b, 0) / recentPred.length
      : 1;

    const avgTrust = recentTrust.length > 0
      ? recentTrust.map(t => t.score).reduce((a, b) => a + b, 0) / recentTrust.length
      : 1;

    const combined = parseFloat(
      ((avgConv * 0.5) + (avgPred * 0.2) + (avgTrust * 0.3)).toFixed(3)
    );

    let level = "baseline";

    if (combined >= 0.97) level = "optimised";
    else if (combined >= 0.9) level = "enhanced";
    else if (combined < 0.75) level = "reduced";

    const reason =
      `Governance score computed from convergence ${avgConv.toFixed(3)}, prediction ${avgPred.toFixed(3)}, trust ${avgTrust.toFixed(3)}.`;

    return {
      score: combined,
      level,
      reason
    };
  }

  buildSnapshot(state, gov) {
    return {
      timestamp: new Date().toISOString(),
      cycle: state.orchestrationCycles,
      score: gov.score,
      level: gov.level,
      reason: gov.reason
    };
  }
}
