import { ServiceRegistry } from './service-registry'

export class HeartbeatService {
  static intervalMs = 5000
  static timer: any = null

  static initialise() {
    this.timer = setInterval(() => {
      console.log(\[HEARTBEAT] \\)
    }, this.intervalMs)
  }
}

// Register automatically
ServiceRegistry.register('heartbeat', HeartbeatService)
