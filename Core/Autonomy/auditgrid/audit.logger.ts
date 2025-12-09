// WyneOS – Audit Logger (Placeholder Implementation)

export interface AuditEvent {
  source: string;
  type: string;
  timestamp: number;
  payload?: any;
}

export function auditEvent(event: AuditEvent): AuditEvent {
  return {
    ...event,
    timestamp: event.timestamp ?? Date.now()
  };
}

export function auditInfo(message: string, payload?: any) {
  return auditEvent({
    source: "audit.logger",
    type: "info",
    payload
  });
}

export function auditWarn(message: string, payload?: any) {
  return auditEvent({
    source: "audit.logger",
    type: "warning",
    payload
  });
}

export function auditError(message: string, payload?: any) {
  return auditEvent({
    source: "audit.logger",
    type: "error",
    payload
  });
}
