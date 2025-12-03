import { ModuleLoader } from "./module-loader"

// Auto-discover all Phase 1 modules
import { IntegrityModule } from "./Integrity/integrity.module"

// Register modules here
ModuleLoader.register(IntegrityModule)

// Initialise all Phase 1 systems
ModuleLoader.initialiseAll()
