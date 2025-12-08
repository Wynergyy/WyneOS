import { activatePhase4, handleBehaviourEvent } from './Services/Phase4/activate.phase4';

console.log('Activating Phase 4...');
console.log(activatePhase4());

const testEvent = {
  type: 'SYSTEM_EVENT',
  subtype: 'heartbeat',
  payload: { source: 'test-suite', value: 1 },
  ts: new Date().toISOString()
};

console.log('Sending test event...');
const output = handleBehaviourEvent(testEvent);

console.log('Behaviour Engine Output:');
console.log(output);
