export class OrchestrationScheduler {
  constructor() {
    this.tasks = [];
  }

  registerTask(name, intervalCycles, action) {
    this.tasks.push({
      name,
      intervalCycles,
      action,
      lastRun: 0
    });
  }

  runScheduledTasks(currentCycle, state) {
    const results = [];

    for (const task of this.tasks) {
      const due = currentCycle - task.lastRun >= task.intervalCycles;

      if (due) {
        const output = task.action(state);
        task.lastRun = currentCycle;
        results.push({ task: task.name, output });
      }
    }

    return results;
  }
}
