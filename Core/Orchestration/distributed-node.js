import crypto from "crypto";

export class DistributedNode {
  constructor() {
    this.nodeID = crypto.randomUUID();
    this.nodeType = "single";
    this.registered = false;
    this.heartbeatCount = 0;
  }

  registerNode() {
    this.registered = true;
    return {
      nodeID: this.nodeID,
      nodeType: this.nodeType,
      registered: true,
      timestamp: new Date().toISOString()
    };
  }

  heartbeat(cycle) {
    this.heartbeatCount++;
    return {
      nodeID: this.nodeID,
      cycle,
      heartbeatCount: this.heartbeatCount,
      timestamp: new Date().toISOString()
    };
  }
}
