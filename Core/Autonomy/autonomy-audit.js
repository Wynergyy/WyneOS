export function buildAuditEntry(cycle, stable, predictive) {
  return {
    timestamp: new Date().toISOString(),
    cycle,
    stable,
    predictive
  };
}
