import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parse(value: string) {
  try {
    return JSON.parse(value);
  } catch (e) {
    console.error(e);
    return null;
  }
}
export const bytesToMB = (bytes: number): number => {
  try {
      return Number((bytes / 1024 / 1024).toFixed(2));
  } catch (e) {
      return 0;
  }
}