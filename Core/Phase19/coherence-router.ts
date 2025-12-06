/**
 * Coherence Router
 * Routes fused CoherenceState to appropriate subsystems:
 * - Guardian Layer (real-time protection)
 * - Autonomy Layer (self-correction logic)
 * - Process Manager (system-level responses)
 */

import { CoherenceState } from "./coherence-engine";

export interface RoutedCoherencePacket {
  target: "guardian" | "autonomy" | "process";
  state: CoherenceState;
  dispatchedAt: number;
}

export class CoherenceRouter {
  /**
   * Route a coherence state to all relevant subsystems.
   * In this phase we produce three packets; later phases may filter or prioritise.
   */
  route(state: CoherenceState): RoutedCoherencePacket[] {
    const timestamp = Date.now();

    return [
      {
        target: "guardian",
        state,
        dispatchedAt: timestamp
      },
      {
        target: "autonomy",
        state,
        dispatchedAt: timestamp
      },
      {
        target: "process",
        state,
        dispatchedAt: timestamp
      }
    ];
  }
}
