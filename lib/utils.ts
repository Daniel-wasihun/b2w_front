import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges tailwind classes professionally, handling conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Simplified Localize utility.
 * Since we now store data in a single language, this mostly acts as a passthrough.
 */
export function localize(value: any, locale: string = 'en'): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  
  // Graceful fallback for any legacy JSON data
  if (typeof value === 'object') {
    return value[locale] || value['en'] || Object.values(value)[0] || '';
  }
  
  return String(value);
}
