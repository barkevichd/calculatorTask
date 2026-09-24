export function normalizeString(value: string): string {
    return value.replace(/\s/g, '').replace(',', '.').toLowerCase();
  }