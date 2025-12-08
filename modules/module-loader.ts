/**
 * WFSL Module Loader
 * Safe, deterministic loader for internal WyneOS modules
 */

export interface LoadedModule<T = unknown> {
  name: string;
  ok: boolean;
  module?: T;
  error?: string;
}

export class ModuleLoader {
  async load<T = unknown>(path: string, name: string): Promise<LoadedModule<T>> {
    try {
      if (!path || typeof path !== "string") {
        return {
          name,
          ok: false,
          error: "Invalid module path"
        };
      }

      const mod = (await import(path)) as T;

      return {
        name,
        ok: true,
        module: mod
      };
    } catch (err) {
      return {
        name,
        ok: false,
        error: err instanceof Error ? err.message : "Unknown module load error"
      };
    }
  }
}

export const moduleLoader = new ModuleLoader();
