/**
 * WyneOS Validators – Phase 0.2
 * Lightweight schema and consistency validation.
 */

export class Validators {
  static requireKeys(obj: any, keys: string[]) {
    return keys.every(k => Object.prototype.hasOwnProperty.call(obj, k));
  }

  static isNonEmptyString(value: any) {
    return typeof value === "string" && value.trim().length > 0;
  }

  static isTimestamp(value: string) {
    return !isNaN(Date.parse(value));
  }
}
