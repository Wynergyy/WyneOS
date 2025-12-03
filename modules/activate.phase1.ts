import { ModuleLoader } from "./module-loader"
import { Phase1Modules } from "./discover.phase1"

// Register all Phase 1 modules dynamically
Phase1Modules.forEach(m => ModuleLoader.register(m))

// Initialise everything
ModuleLoader.initialiseAll()
