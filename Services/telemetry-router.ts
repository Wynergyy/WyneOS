import { ServiceRegistry } from './service-registry'

export class TelemetryRouter {
  static initialise() {
    console.log('[TELEMETRY] Router online')
  }

  static route(event: any) {
    console.log('[TELEMETRY EVENT]', JSON.stringify(event))
  }
}

ServiceRegistry.register('telemetry', TelemetryRouter)
