import { GuardianMesh } from "./guardian-mesh";

const mesh = new GuardianMesh();

mesh.registerNode("node-1");
mesh.registerNode("node-2");

mesh.heartbeat("node-1");

console.log("Guardian Mesh state:", mesh.getMeshState());
