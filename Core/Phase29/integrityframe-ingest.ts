/**
 * IntegrityFrame Ingest
 * Normalises upstream ExecutionGrid + AutonomyFrame data
 * into a unified IntegrityFrameBundle for validation.
 */

export interface IntegrityFrameBundle {
  source?: string;
  execution?: any;
  autonomy?: any;
  timestamp: number;
}

export class IntegrityFrameIngest {

  /**
   * Build a normalised IntegrityFrameBundle from raw inputs.
   */
  buildBundle(input: {
    execution?: any;
    autonomy?: any;
    source?: string;
  }): IntegrityFrameBundle {

    return {
      source: input?.source || "unknown",
      execution: input?.execution || {},
      autonomy: input?.autonomy || {},
      timestamp: Date.now()
    };
  }
}
