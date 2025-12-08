import { WyneOS } from "./genesis.js";
import { Button, Card } from "./WYNE-UI/components.js";

// 1. Test WAR Runtime route
const welcome = await WyneOS.runtime.handleRequest("/welcome");
console.log("Runtime Test:", welcome);

// 2. Test DataFabric storage
WyneOS.data.set("systemStatus", "Initialised");
console.log("DataFabric Snapshot:", WyneOS.data.snapshot());

// 3. Create a WyneID identity
const user = WyneOS.identity("user-001");
user.addClaim("role", "tester");
user.grantConsent("demo");
console.log("WyneID Test:", user);

// 4. Record safe manual event into Guardian Mesh
WyneOS.guardian.record({ type: "system_start" });
console.log("Guardian Mesh Events:", WyneOS.guardian.getEvents());

// 5. Simple UI output using WYNE-UI components
const uiCard = Card({
  title: "WyneOS Genesis",
  content: "Safe, Ethical, Controlled App Running"
});

const uiButton = Button({ label: "OK" });

console.log("UI Card:", uiCard);
console.log("UI Button:", uiButton);

console.log("WyneOS App Execution Complete.");
