export interface WyneModule {
  name: string
  initialise: () => void
}

export class ModuleLoader {
  private static modules: WyneModule[] = []

  static register(module: WyneModule) {
    this.modules.push(module)
    console.log(\[ModuleLoader] Registered module: \\)
  }

  static initialiseAll() {
    console.log("[ModuleLoader] Initialising Phase 1 modules…")
    this.modules.forEach(m => m.initialise())
    console.log("[ModuleLoader] All modules initialised.")
  }
}
