export interface WyneOSState {
  integrity: {
    lastHash: string | null;
    lastUpdate: number | null;
  };
  system: {
    version: string;
    bootCount: number;
  };
}

export class StateProvider {
  private state: WyneOSState = {
    integrity: {
      lastHash: null,
      lastUpdate: null
    },
    system: {
      version: "0.1.0-phase7",
      bootCount: 0
    }
  };

  getState(): WyneOSState {
    return this.state;
  }

  updateIntegrity(hash: string) {
    this.state.integrity.lastHash = hash;
    this.state.integrity.lastUpdate = Date.now();
  }

  incrementBootCount() {
    this.state.system.bootCount += 1;
  }
}
