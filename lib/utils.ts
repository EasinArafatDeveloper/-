import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const BENGALI_DIGITS = "০১২৩৪৫৬৭৮৯";

export function toBengaliDigits(value: number | string): string {
  return String(value).replace(/[0-9]/g, (d) => BENGALI_DIGITS[Number(d)] ?? d);
}

/** Collapse whitespace and strip control characters. */
export function cleanText(value: string): string {
  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Count user-visible characters (code points). */
export function charCount(value: string): number {
  return Array.from(value).length;
}

export function formatBengaliDate(date: Date): string {
  try {
    return new Intl.DateTimeFormat("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch {
    return toBengaliDigits(
      `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
    );
  }
}
