/**
 * ExecutionGrid Ingest
 * Normalises orchestrated frames into a deterministic execution-grid bundle.
 * This is the entry point for Phase 27.
 */

export interface ExecutionGridIngestInput {
  frame: any;            // Orchestrated execution frame from Phase 26
  schedule?: any;        // Scheduling metadata
  governance?: any;      // Posture and policy metadata
  source?: string;       // Optional origin tag
}

export interface ExecutionGridBundle {
  frame: any;
  tasks: any[];
  schedule: any;
  governance: any;
  source: string;
  generatedAt: number;
}

export class ExecutionGridIngest {
  /**
   * Build a normalised ExecutionGrid bundle.
   * Converts the orchestration frame into discrete task units.
   */
  buildBundle(input: ExecutionGridIngestInput): ExecutionGridBundle {
    const {
      frame,
      schedule = {},
      governance = {},
      source = "executiongrid"
    } = input;

    const tasks = Array.isArray(frame?.operations)
      ? frame.operations
      : frame
      ? [frame]
      : [];

    return {
      frame,
      tasks,
      schedule,
      governance,
      source,
      generatedAt: Date.now()
    };
  }
}
