import { WAR } from "./WAR/index.js";
import { DataFabric } from "./DataFabric/index.js";
import { WyneID } from "./WyneID/index.js";
import { GuardianMesh } from "./GuardianMesh/index.js";

// WyneOS Core Object
export const WyneOS = {
  runtime: new WAR(),
  data: new DataFabric(),
  identity: (id) => new WyneID(id),
  guardian: new GuardianMesh()
};

// Register a simple test route for the runtime
WyneOS.runtime.registerRoute("/welcome", () => {
  return { message: "WyneOS Genesis Initialised Safely" };
});

console.log("WyneOS Genesis Boot Complete.");
