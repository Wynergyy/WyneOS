export class MeshConvergence {
  constructor() {
    this.windowSize = 20;
  }

  computeMeshScore(ledgerState) {
    const recent = ledgerState.health.slice(-this.windowSize);

    if (recent.length === 0) {
      return {
        score: 1.0,
        grade: "A",
        notes: ["No distributed health data available. Defaulting to stable."]
      };
    }

    let good = 0;
    let warn = 0;
    let bad = 0;

    for (const entry of recent) {
      if (entry.compatible === true) good++;
      if (entry.compatible === false && entry.reason.includes("Version mismatch")) warn++;
      if (entry.compatible === false && !entry.reason.includes("Version mismatch")) bad++;
    }

    const total = recent.length;

    const score =
      (good * 1.0 + warn * 0.5 + bad * 0.1) / total;

    let grade = "A";
    if (score < 0.8) grade = "B";
    if (score < 0.6) grade = "C";
    if (score < 0.4) grade = "D";

    const notes = [];

    if (bad > 0) notes.push("Critical incompatibilities observed.");
    if (warn > 5) notes.push("Multiple version mismatches detected.");
    if (good === total) notes.push("All mesh nodes compatible and stable.");

    return {
      score: parseFloat(score.toFixed(3)),
      grade,
      notes
    };
  }

  buildSnapshot(state, convergence) {
    return {
      timestamp: new Date().toISOString(),
      cycle: state.orchestrationCycles,
      score: convergence.score,
      grade: convergence.grade,
      notes: convergence.notes
    };
  }
}
