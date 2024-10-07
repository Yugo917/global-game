export function isNullOrUndefinedOrEmpty(obj: any): boolean {
  return obj === undefined || obj === null || (typeof obj === "object" && Object.keys(obj).length === 0);
}