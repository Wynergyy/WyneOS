export function evaluateAdaptiveNeed(predictive, state) {
  if (state.adaptiveMode) {
    return {
      switchToAdaptive: false,
      reason: "Already active"
    };
  }

  if (predictive.stabilityForecast === "critical" && predictive.confidence < 0.9) {
    return {
      switchToAdaptive: true,
      reason: "Critical forecast and low confidence"
    };
  }

  if (predictive.stabilityForecast === "warning" && state.cycles > 75) {
    return {
      switchToAdaptive: true,
      reason: "Warning threshold exceeded over time"
    };
  }

  return {
    switchToAdaptive: false,
    reason: "No adaptive criteria met"
  };
}
