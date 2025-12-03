import { BehaviourIntegration } from './integration';
import { BehaviourLog } from './behaviour-log';

export function activatePhase4() {
  BehaviourIntegration.initialise();
  return 'Phase 4 behaviour engine activated';
}

export function handleBehaviourEvent(evt) {
  const output = BehaviourIntegration.handle(evt);
  BehaviourLog.log(evt, output);
  return output;
}
