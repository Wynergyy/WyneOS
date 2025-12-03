export function baseline(metrics: any) {
  return {
    generatedAt: new Date().toISOString(),
    baseline: metrics,
    phase: 8
  };
}
