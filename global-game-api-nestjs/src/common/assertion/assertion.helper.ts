export function isNullOrUndefinedOrEmpty<T>(obj: T): boolean {
  return obj === undefined || obj === null || (typeof obj === "object" && Object.keys(obj).length === 0);
}

export function arraysEqual(arr1: string[], arr2: string[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Trier les deux tableaux
  // eslint-disable-next-line no-restricted-syntax
  const sortedArr1 = [...arr1].sort();
  // eslint-disable-next-line no-restricted-syntax
  const sortedArr2 = [...arr2].sort();

  // Comparer les tableaux triés
  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) {
      return false;
    }
  }

  return true;
}