export class MeshHandshake {
  constructor() {
    this.version = "1.0";
  }

  buildHandshake(localNode) {
    return {
      handshakeID: crypto.randomUUID(),
      version: this.version,
      nodeID: localNode.nodeID,
      nodeType: localNode.nodeType,
      timestamp: new Date().toISOString()
    };
  }

  assessCompatibility(remoteHandshake) {
    if (!remoteHandshake.version) {
      return {
        compatible: false,
        reason: "No version provided by remote node."
      };
    }

    if (remoteHandshake.version !== this.version) {
      return {
        compatible: false,
        reason: `Version mismatch: local=${this.version}, remote=${remoteHandshake.version}`
      };
    }

    return {
      compatible: true,
      reason: "Version match. Compatible."
    };
  }
}
