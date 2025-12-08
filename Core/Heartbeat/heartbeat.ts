// WyneOS Phase 0 Core – Heartbeat Service
// Provides system uptime pings, health signals, and sync markers.

export interface HeartbeatSignal {
  timestamp: string;
  status: "online" | "degraded" | "offline";
  node: string;
  uptime: number;
}

export class HeartbeatService {
  private nodeId: string;
  private startTime: number;

  constructor(nodeId: string = "wyneos-core") {
    this.nodeId = nodeId;
    this.startTime = Date.now();
  }

  generate(): HeartbeatSignal {
    return {
      timestamp: new Date().toISOString(),
      status: "online",
      node: this.nodeId,
      uptime: Math.floor((Date.now() - this.startTime) / 1000)
    };
  }

  pulse(): HeartbeatSignal {
    const signal = this.generate();
    console.log("Heartbeat:", signal);
    return signal;
  }
}

export const Heartbeat = new HeartbeatService();
