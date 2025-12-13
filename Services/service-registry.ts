/**
 * Service Registry
 *
 * Provides a deterministic registry for core WyneOS services.
 * Services are registered explicitly and may optionally expose
 * an initialise hook.
 *
 * No logging.
 * No I/O.
 * Controlled global mutation only.
 */

export interface RegisteredService {
  initialise?(): void;
}

export class ServiceRegistry {
  private static readonly services = new Map<string, RegisteredService>();

  static register(name: string, service: RegisteredService): void {
    if (this.services.has(name)) {
      throw new Error(`Service already registered: ${name}`);
    }

    this.services.set(name, service);
  }

  static get<T extends RegisteredService>(name: string): T {
    const service = this.services.get(name);

    if (!service) {
      throw new Error(`Service not found: ${name}`);
    }

    return service as T;
  }

  static list(): readonly string[] {
    return Array.from(this.services.keys());
  }

  static initialiseAll(): void {
    for (const service of this.services.values()) {
      service.initialise?.();
    }
  }
}
