/* ------------------------------------------------------------
   SENTINEL v5: SYSTEM SENTINEL
   Purpose:
   - Monitor internal CPU load, memory patterns, tick behaviour
   - Detect internal anomalies without accessing external systems
   - Feed signals to TelemetryMatrix and Guardian Mesh
   - Fully defensive and lawful monitoring
------------------------------------------------------------ */

export interface SystemSnapshot {
  cpuLoad: number;
  memoryUsage: number;
  tickVariance: number;
  timestamp: string;
}

export function captureSystemSnapshot(): SystemSnapshot {
  // Simulated safe internal metrics
  const cpu = Math.random() * 0.4;
  const mem = Math.random() * 0.5;
  const tick = Math.abs(Math.sin(Date.now() % 1000));

  return {
    cpuLoad: cpu,
    memoryUsage: mem,
    tickVariance: tick,
    timestamp: new Date().toISOString()
  };
}

export function analyseSystem(snapshot: SystemSnapshot): number {
  let score = 0;
  if (snapshot.cpuLoad > 0.6) score += 0.3;
  if (snapshot.memoryUsage > 0.7) score += 0.3;
  if (snapshot.tickVariance > 0.8) score += 0.4;
  return score;
}
