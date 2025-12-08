import { AutonomyEngine } from "./autonomy-engine";

const engine = new AutonomyEngine();

engine.boot();

engine.registerBehaviour("hello-world", () => {
  return console.log("WyneOS Autonomy Layer Online.");
});

async function main() {
  await engine.runBehaviour("hello-world");
  console.log("Registered behaviours:", engine.getRegisteredBehaviours());
  console.log("System state:", engine.getState());
}

main().catch(err => console.error(err));
