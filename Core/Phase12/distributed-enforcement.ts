export class DistributedEnforcement {
  propagate(actions: any[]) {
    if (!actions.length) return;

    console.log("Distributed Enforcement Triggered:");
    console.log(JSON.stringify(actions, null, 2));
  }
}
