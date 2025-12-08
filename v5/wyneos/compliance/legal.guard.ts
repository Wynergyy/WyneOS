export class LegalGuard {
  // Ensures every action passes legal boundaries
  public validate(action: string, payload: unknown) {
    const issues: string[] = [];

    if (!action) {
      issues.push("No action provided");
    }

    // Placeholder rules – safe and conceptual only
    if (typeof payload === "function") {
      issues.push("Executable payloads are not permitted");
    }

    return issues;
  }
}
