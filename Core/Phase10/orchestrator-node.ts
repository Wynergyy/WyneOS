export interface OrchestratorNodeState {
  id: string;
  online: boolean;
  lastSeen: number;
  load: number;
  metadata?: Record<string, any>;
}

export class OrchestratorNode {
  private state: OrchestratorNodeState;

  constructor(id: string, metadata: Record<string, any> = {}) {
    this.state = {
      id,
      online: true,
      lastSeen: Date.now(),
      load: 0,
      metadata
    };
  }

  heartbeat(load = 0) {
    this.state.online = true;
    this.state.lastSeen = Date.now();
    this.state.load = load;
  }

  markOffline() {
    this.state.online = false;
  }

  getState() {
    return this.state;
  }
}
