export interface BehaviourSignal {
  type: string;
  payload: any;
  timestamp: number;
}

export class BehaviourBus {
  private listeners = new Map<string, ((signal: BehaviourSignal) => void)[]>();

  subscribe(type: string, handler: (signal: BehaviourSignal) => void) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type)!.push(handler);
  }

  emit(type: string, payload: any) {
    const signal: BehaviourSignal = {
      type,
      payload,
      timestamp: Date.now()
    };

    const handlers = this.listeners.get(type) || [];
    for (const handler of handlers) {
      handler(signal);
    }
  }
}
