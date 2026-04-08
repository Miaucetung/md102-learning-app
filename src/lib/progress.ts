// src/lib/progress.ts

const PREFIX = "md102-app-progress:";

type ProgressMap = Record<string, boolean>;

/**
 * Liest die gespeicherte Map für ein Modul (z. B. "lab-hyperv-001").
 * Wenn nichts existiert oder im Server-Kontext: leere Map.
 */
export function get(mid: string): ProgressMap {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(PREFIX + mid);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as ProgressMap;
    if (parsed && typeof parsed === "object") {
      return parsed;
    }
    return {};
  } catch {
    return {};
  }
}

// Alias for backward compatibility
export const readProgressMap = get;

/**
 * Speichert die Map für ein Modul in localStorage.
 */
export function set(mid: string, map: ProgressMap): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(PREFIX + mid, JSON.stringify(map));
  } catch {
    // Ignorieren – z. B. wenn Storage voll ist oder im Private Mode
  }
}

/**
 * Berechnet den Fortschritt in Prozent.
 */
export function pctFromMap(map: ProgressMap, total: number): number {
  if (total <= 0) return 0;
  const done = Object.values(map).filter(Boolean).length;
  return Math.round((done / total) * 100);
}
