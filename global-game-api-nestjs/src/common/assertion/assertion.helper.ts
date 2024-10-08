export function isNullOrUndefinedOrEmpty<T>(obj: T): boolean {
  return obj === undefined || obj === null || (typeof obj === "object" && Object.keys(obj).length === 0);
}