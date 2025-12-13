/**
 * Phase 4 Rules
 *
 * Declarative rule set for Phase 4 signal interpretation.
 * Rules are pure, deterministic transforms from input events
 * to behavioural descriptors.
 *
 * No side effects.
 * No I/O.
 */

export interface Phase4Event {
  readonly type: string;
  readonly timestamp: number;
  readonly payload?: unknown;
}

export interface Phase4Behaviour {
  readonly behaviour: string;
  readonly timestamp: number;
  readonly data?: unknown;
}

export interface Phase4Rule {
  readonly trigger: string;
  readonly action: (event: Phase4Event) => Phase4Behaviour;
}

export const Phase4Rules: readonly Phase4Rule[] = [
  {
    trigger: "heartbeat",
    action: (event) => ({
      behaviour: "system.pulse",
      timestamp: event.timestamp,
    }),
  },
  {
    trigger: "telemetry.packet",
    action: (event) => ({
      behaviour: "telemetry.received",
      timestamp: event.timestamp,
      data: event.payload,
    }),
  },
];
