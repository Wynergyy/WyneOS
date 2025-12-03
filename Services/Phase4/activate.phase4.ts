// Phase 4 Behaviour Engine – Activation Module

export interface BehaviourEvent {
  type: string;
  subtype?: string;
  payload?: any;
  ts?: string;
}

export function activatePhase4() {
  return "Phase 4 behaviour engine activated";
}

export function handleBehaviourEvent(evt: BehaviourEvent) {
  const timestamp = evt.ts || new Date().toISOString();

  const basicRecord = {
    received: timestamp,
    type: evt.type,
    subtype: evt.subtype ?? "none",
    payload: evt.payload ?? {}
  };

  const rules = [];

  if (evt.type === "SYSTEM_EVENT" && evt.subtype === "heartbeat") {
    rules.push({
      rule: "heartbeat_registered",
      action: "ok",
      detail: "System heartbeat acknowledged."
    });
  }

  if (evt.type === "USER_EVENT") {
    rules.push({
      rule: "user_event_captured",
      action: "log",
      detail: `User event processed: ${evt.subtype ?? "unknown"}`
    });
  }

  return {
    input: basicRecord,
    rulesApplied: rules,
    result: rules.length > 0 ? "processed" : "no_rules_matched"
  };
}
