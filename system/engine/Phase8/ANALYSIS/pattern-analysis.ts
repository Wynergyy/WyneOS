export function analyse(history: any[]) {
  return {
    analysedAt: new Date().toISOString(),
    patterns: [],
    anomalies: [],
    phase: 8
  };
}
