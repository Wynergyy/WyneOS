export class MeshLedger {
  constructor() {
    this.version = "1.0";
  }

  recordCycle(ledgerState, cycleData) {
    ledgerState.cycles.push({
      timestamp: new Date().toISOString(),
      ...cycleData
    });

    if (ledgerState.cycles.length > 500) {
      ledgerState.cycles = ledgerState.cycles.slice(-250);
    }
  }

  recordHandshake(ledgerState, handshake) {
    ledgerState.handshakes.push({
      timestamp: new Date().toISOString(),
      handshake
    });

    if (ledgerState.handshakes.length > 200) {
      ledgerState.handshakes = ledgerState.handshakes.slice(-100);
    }
  }

  recordHealth(ledgerState, healthInfo) {
    ledgerState.health.push({
      timestamp: new Date().toISOString(),
      ...healthInfo
    });

    if (ledgerState.health.length > 200) {
      ledgerState.health = ledgerState.health.slice(-100);
    }
  }
}
