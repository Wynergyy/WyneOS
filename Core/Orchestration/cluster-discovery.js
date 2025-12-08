export class ClusterDiscovery {
  constructor() {
    this.discoveryTimestamp = new Date().toISOString();
  }

  discoverLocalNode(distributedState) {
    if (!distributedState.nodes || distributedState.nodes.length === 0) {
      return {
        clusterRole: "uninitialised",
        message: "No nodes registered."
      };
    }

    const primaryNode = distributedState.nodes[0];

    return {
      clusterRole: "seed",
      nodeID: primaryNode.nodeID,
      message: "Local node registered as cluster seed.",
      timestamp: new Date().toISOString()
    };
  }

  buildTopologySnapshot(distributedState) {
    return {
      timestamp: new Date().toISOString(),
      nodeCount: distributedState.nodes.length,
      nodes: distributedState.nodes.map(n => ({
        nodeID: n.nodeID,
        nodeType: n.nodeType,
        registered: n.registered
      }))
    };
  }
}
