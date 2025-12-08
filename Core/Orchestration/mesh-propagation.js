export class MeshPropagation {
  constructor() {
    this.version = "1.0";
  }

  buildEnvelope(signal, fromNode) {
    return {
      envelopeID: crypto.randomUUID(),
      version: this.version,
      fromNode,
      timestamp: new Date().toISOString(),
      payload: signal
    };
  }

  distribute(envelope, distState) {
    const nodes = distState.nodes || [];

    const results = nodes.map(n => ({
      nodeID: n.nodeID,
      received: true,
      timestamp: new Date().toISOString()
    }));

    return {
      envelopeID: envelope.envelopeID,
      fromNode: envelope.fromNode,
      distributedTo: results
    };
  }

  recordPropagation(propagationState, record) {
    propagationState.records.push({
      timestamp: new Date().toISOString(),
      ...record
    });

    if (propagationState.records.length > 300) {
      propagationState.records = propagationState.records.slice(-150);
    }
  }
}
