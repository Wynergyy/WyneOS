export class EventsEngine {
  constructor() {
    this.events = [];
  }

  evaluateSignal(signal) {
    const alerts = [];

    if (signal.type === "system_cycle") {
      const { health, rules, autonomyDuration } = signal.payload;

      if (health === "slow") {
        alerts.push({
          level: "critical",
          message: "Autonomy cycle running slowly.",
          detail: autonomyDuration + "ms"
        });
      }

      if (rules === "attention") {
        alerts.push({
          level: "warning",
          message: "Orchestration rule triggered: attention required."
        });
      }

      if (rules === "critical") {
        alerts.push({
          level: "critical",
          message: "Critical rule triggered."
        });
      }
    }

    return alerts;
  }

  recordAlerts(alerts) {
    const timestamp = new Date().toISOString();

    for (const alert of alerts) {
      this.events.push({
        timestamp,
        ...alert
      });
    }

    return alerts.length;
  }
}
