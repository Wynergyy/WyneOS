export function buildTelemetry(cycle, predictive, state, stabiliserResult) {
  return {
    cycle,
    timestamp: new Date().toISOString(),
    stabilityForecast: predictive.stabilityForecast,
    confidence: predictive.confidence,
    adaptiveMode: state.adaptiveMode,
    adaptiveReason: state.adaptiveReason,
    stabiliserApplied: stabiliserResult.applied,
    stabiliserActions: stabiliserResult.actions,
    systemStable: state.stable
  };
}
