export class RuntimePulse {
  private interval: NodeJS.Timeout | null = null;

  start(periodMs: number, fn: () => void) {
    if (this.interval) return;

    this.interval = setInterval(() => {
      fn();
    }, periodMs);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
