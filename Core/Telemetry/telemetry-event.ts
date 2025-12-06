export interface TelemetryEvent<T = any> {
  type: string;
  timestamp: number;
  payload: T;
}

export function createTelemetryEvent<T>(type: string, payload: T): TelemetryEvent<T> {
  return {
    type,
    timestamp: Date.now(),
    payload
  };
}
