/**
 * Integrity History Module
 * Provides a strongly typed event log used by the Integrity Engine.
 * This module must remain backend-safe and contain no UI or JSX code.
 */

export interface IntegrityEvent {
  id: string;
  status: string;
  message?: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

export interface IntegrityHistoryState {
  events: IntegrityEvent[];
}

/**
 * In-memory history store.
 * WyneOS future Phase will replace this with Guardian-Mesh persistence.
 */
const historyState: IntegrityHistoryState = {
  events: []
};

/**
 * Record a new integrity event.
 */
export function recordIntegrityEvent(event: IntegrityEvent): void {
  historyState.events.push(event);
}

/**
 * Return all integrity events.
 */
export function getIntegrityHistory(): IntegrityEvent[] {
  return [...historyState.events];
}

/**
 * Clear the full integrity event history.
 * Used only in controlled test scenarios.
 */
export function clearIntegrityHistory(): void {
  historyState.events.length = 0;
}

/**
 * Return the latest integrity event.
 */
export function getLatestIntegrityEvent(): IntegrityEvent | null {
  if (historyState.events.length === 0) return null;
  return historyState.events[historyState.events.length - 1];
}
