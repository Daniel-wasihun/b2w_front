import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges tailwind classes professionally, handling conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
/**
 * Localizes a string or object based on the current locale.
 */
export function localize(value: any, locale: string = 'en'): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    return value[locale] || value['en'] || Object.values(value)[0] || '';
  }
  return String(value);
}
