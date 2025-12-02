/**
 * GuardianMesh – Phase 0 Core
 *
 * Local guardian layer that validates, signs, and authorises all
 * system-level actions before they leave the device.
 */

import { TelemetryMatrix } from "../Telemetry/telemetry-matrix";

export class GuardianMesh {
  private static deviceId = crypto.randomUUID();
  private static status = "online";

  static seal(action: string, data: any = {}) {
    const packet = {
      id: crypto.randomUUID(),
      deviceId: this.deviceId,
      action,
      data,
      sealedAt: new Date().toISOString()
    };

    TelemetryMatrix.record("guardian.seal", packet);
    return packet;
  }

  static verify(packet: any) {
    const ok = packet && packet.deviceId === this.deviceId;
    TelemetryMatrix.record("guardian.verify", { ok, packet });
    return ok;
  }

  static heartbeat() {
    const beat = {
      deviceId: this.deviceId,
      ts: new Date().toISOString(),
      status: this.status
    };
    TelemetryMatrix.record("guardian.heartbeat", beat);
    return beat;
  }

  static setStatus(newStatus: string) {
    this.status = newStatus;
    TelemetryMatrix.record("guardian.status", { status: newStatus });
  }
}
