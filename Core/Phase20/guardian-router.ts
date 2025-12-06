/**
 * Guardian Router
 * Routes Guardian actions to relevant subsystems:
 * - Autonomy Layer (self-recovery)
 * - Process Manager (system responses)
 * - Integrity Layer (hash, chain and audit interventions)
 */

import { GuardianAssessment, GuardianAction } from "./guardian-engine";

export interface RoutedGuardianPacket {
  target: "autonomy" | "process" | "integrity";
  action: GuardianAction;
  dispatchedAt: number;
}

export class GuardianRouter {
  /**
   * Route the resulting GuardianAssessment actions to subsystem targets.
   * Each action produces a packet for every relevant subsystem.
   */
  route(assessment: GuardianAssessment): RoutedGuardianPacket[] {
    const packets: RoutedGuardianPacket[] = [];
    const timestamp = Date.now();

    for (const action of assessment.actions) {
      // Autonomy Layer
      packets.push({
        target: "autonomy",
        action,
        dispatchedAt: timestamp
      });

      // Process Manager
      packets.push({
        target: "process",
        action,
        dispatchedAt: timestamp
      });

      // Integrity Layer
      packets.push({
        target: "integrity",
        action,
        dispatchedAt: timestamp
      });
    }

    return packets;
  }
}
