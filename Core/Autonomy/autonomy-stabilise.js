export function runStabiliser(state, predictive) {
  const actions = [];

  if (!state.adaptiveMode) {
    return {
      applied: false,
      actions,
      reason: "Adaptive mode inactive"
    };
  }

  if (predictive.stabilityForecast === "critical") {
    actions.push("Reduce computational load");
    actions.push("Throttle non-essential telemetry");
  }

  if (predictive.stabilityForecast === "warning") {
    actions.push("Increase monitoring frequency");
  }

  if (actions.length === 0) {
    actions.push("Maintain adaptive monitoring");
  }

  return {
    applied: true,
    actions,
    reason: `Stabiliser actions applied for ${predictive.stabilityForecast} state`
  };
}
