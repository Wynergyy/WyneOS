/**
 * Phase 16 — RiskRouter
 * Directs events to the correct risk evaluation pathway.
 */

import { RiskEvent } from "./risk-event";
import { RiskEngine } from "./risk-engine";
import { RiskModel } from "./risk-model";

export class RiskRouter {
  private engines: Map<string, RiskEngine>;

  constructor(models: Record<string, RiskModel>) {
    this.engines = new Map();

    for (const key of Object.keys(models)) {
      this.engines.set(key, new RiskEngine(models[key]));
    }
  }

  /**
   * Route an incoming event to the appropriate engine.
   */
  route(event: RiskEvent) {
    const engine = this.engines.get(event.domain);

    if (!engine) {
      return {
        ok: false,
        reason: "No risk engine for domain",
        domain: event.domain
      };
    }

    const result = engine.evaluate(event);

    return {
      ok: true,
      domain: event.domain,
      result
    };
  }
}
