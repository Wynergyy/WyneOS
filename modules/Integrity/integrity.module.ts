import { ModuleLoader } from "../module-loader"

export const IntegrityModule = {
  name: "IntegrityModule",
  initialise() {
    console.log("[IntegrityModule] Phase 1 integrity systems online.")
  }
}

ModuleLoader.register(IntegrityModule)
