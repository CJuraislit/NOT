export const isEmpty = (value: unknown): boolean => {
  if (value == null) return true; // null | undefined

  if (typeof value === 'string') return value.trim().length === 0;

  if (Array.isArray(value)) return value.length === 0;

  if (value instanceof Map || value instanceof Set) return value.size === 0;

  if (typeof value === 'object') {
    return Object.keys(value as object).length === 0;
  }

  return false;
};

export const isBlank = (s: string | undefined | null): boolean =>
  s == null || s.trim().length === 0;

export const readCssVars = (name: string) => {
  if (typeof window === 'undefined') return '';
  const v = getComputedStyle(document.documentElement).getPropertyValue(name);
  return v?.trim() ?? '';
};
