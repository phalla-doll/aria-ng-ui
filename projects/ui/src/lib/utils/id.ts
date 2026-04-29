let nextId = 0;

export function uniqueId(prefix: string): string {
  return `${prefix}-${nextId++}`;
}
