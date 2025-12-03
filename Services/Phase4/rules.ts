export const Phase4Rules = [
  {
    trigger: "heartbeat",
    action: (evt) => ({ behaviour: "system.pulse", ts: evt.timestamp })
  },
  {
    trigger: "telemetry.packet",
    action: (evt) => ({ behaviour: "telemetry.received", data: evt })
  }
];
