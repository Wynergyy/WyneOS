export class SignalBus {
  constructor() {
    this.signals = [];
  }

  emit(type, payload) {
    const signal = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      type,
      payload
    };

    this.signals.push(signal);
    return signal;
  }

  list() {
    return this.signals;
  }

  filterByType(type) {
    return this.signals.filter(s => s.type === type);
  }
}
