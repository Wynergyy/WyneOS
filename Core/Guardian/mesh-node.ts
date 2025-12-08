export interface MeshNodeState {
  id: string;
  online: boolean;
  lastSeen: number;
}

export class MeshNode {
  private state: MeshNodeState;

  constructor(id: string) {
    this.state = {
      id,
      online: true,
      lastSeen: Date.now()
    };
  }

  getState() {
    return this.state;
  }

  heartbeat() {
    this.state.online = true;
    this.state.lastSeen = Date.now();
  }

  markOffline() {
    this.state.online = false;
  }
}
