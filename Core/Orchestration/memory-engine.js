export class MemoryEngine {
  constructor() {}

  compactHistory(history) {
    if (history.length <= 50) {
      return { trimmed: false, newHistory: history };
    }

    const newHistory = [
      ...history.slice(0, 25),
      ...history.slice(-25)
    ];

    return {
      trimmed: true,
      newHistory
    };
  }

  compactSignals(signals) {
    if (signals.length <= 100) {
      return { trimmed: false, newSignals: signals };
    }

    const newSignals = [
      ...signals.slice(0, 50),
      ...signals.slice(-50)
    ];

    return {
      trimmed: true,
      newSignals
    };
  }

  compactAlerts(alerts) {
    if (alerts.length <= 100) {
      return { trimmed: false, newAlerts: alerts };
    }

    const newAlerts = [
      ...alerts.slice(0, 50),
      ...alerts.slice(-50)
    ];

    return {
      trimmed: true,
      newAlerts
    };
  }

  compactConvergence(convergenceLog) {
    if (convergenceLog.length <= 200) {
      return { trimmed: false, newConvergence: convergenceLog };
    }

    const newConvergence = [
      ...convergenceLog.slice(0, 100),
      ...convergenceLog.slice(-100)
    ];

    return {
      trimmed: true,
      newConvergence
    };
  }
}
