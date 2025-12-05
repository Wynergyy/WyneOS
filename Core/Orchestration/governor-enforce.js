export class MeshGovernorEnforce {
  constructor() {}

  enforce(state, trustSnapshot, predictionSnapshot, convergenceSnapshot) {
    const actions = [];
    let governorStatus = "normal";

    // 1. Trust degradation
    if (trustSnapshot.score < 0.6) {
      actions.push("Trust below threshold. Entering caution mode.");
      governorStatus = "caution";
    }

    if (trustSnapshot.score < 0.4) {
      actions.push("Critical trust level detected. Restricting mesh operations.");
      governorStatus = "restricted";
    }

    // 2. Prediction risk
    if (predictionSnapshot.risk === "medium") {
      actions.push("Medium risk forecast. Slowing autonomous actions.");
    }

    if (predictionSnapshot.risk === "high") {
      actions.push("High risk forecast. Enforcing protective lockdown.");
      governorStatus = "lockdown";
    }

    // 3. Convergence instability
    if (convergenceSnapshot.score < 0.7) {
      actions.push("Convergence instability detected. Raising internal alerts.");
    }

    if (convergenceSnapshot.score < 0.4) {
      actions.push("Severe convergence instability. Halting distributed tasks.");
      governorStatus = "restricted";
    }

    // 4. Normal message if stable
    if (actions.length === 0) {
      actions.push("System stable. No enforcement required.");
    }

    return {
      status: governorStatus,
      actions
    };
  }
}
