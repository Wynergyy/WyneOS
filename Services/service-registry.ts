export class ServiceRegistry {
  private static services: Map<string, any> = new Map()

  static register(name: string, instance: any) {
    this.services.set(name, instance)
  }

  static get(name: string) {
    return this.services.get(name)
  }

  static list() {
    return Array.from(this.services.keys())
  }

  static initialiseAll() {
    for (const [name, svc] of this.services.entries()) {
      if (typeof svc.initialise === 'function') {
        svc.initialise()
      }
    }
  }
}
