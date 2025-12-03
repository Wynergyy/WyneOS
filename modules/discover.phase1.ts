import { ModuleLoader } from "./module-loader"

// Import new modules here as they are created
import { IntegrityModule } from "./Integrity/integrity.module"

// Phase 1 registry
export const Phase1Modules = [
  IntegrityModule
]

// Auto-register
Phase1Modules.forEach(m => ModuleLoader.register(m))
