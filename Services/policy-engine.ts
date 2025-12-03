import { ServiceRegistry } from './service-registry'

export class PolicyEngine {
  static rules = []

  static initialise() {
    console.log('[POLICY] Engine initialised')
  }

  static evaluate(context: any) {
    return { allowed: true, reason: 'No rules applied' }
  }
}

ServiceRegistry.register('policy', PolicyEngine)
