export interface TelemetryEvent {
  id: string;                     // Unique event ID
  type: string;                   // Event type (e.g. "INTEGRITY_CHECK")
  timestamp: string;              // ISO timestamp
  payload: any;                   // Event-specific data
  source: {
    module: string;               // "IntegrityEngine"
    version: string;              // Future WFSL version tags
  };
}
