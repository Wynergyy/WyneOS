/**
 * Phase 27 ExecutionGrid Executor
 * Stable, side-effect-controlled, safe executor for queued tasks
 */

export interface ExecutionTask {
  id: string;
  type: string;
  payload: Record<string, unknown>;
  createdAt: number;
}

export interface ExecutionResult {
  id: string;
  ok: boolean;
  timestamp: number;
  output?: unknown;
  error?: string;
}

export class ExecutionGridExecutor {
  execute(task: ExecutionTask): ExecutionResult {
    try {
      const output = this.perform(task);

      return {
        id: task.id,
        ok: true,
        timestamp: Date.now(),
        output
      };
    } catch (err) {
      return {
        id: task.id,
        ok: false,
        timestamp: Date.now(),
        error: err instanceof Error ? err.message : "Unknown execution error"
      };
    }
  }

  private perform(task: ExecutionTask): unknown {
    switch (task.type) {
      case "echo":
        return { echo: task.payload };

      case "noop":
        return { ok: true };

      default:
        throw new Error(`Unsupported task type: ${task.type}`);
    }
  }
}

export const executionGridExecutor = new ExecutionGridExecutor();
