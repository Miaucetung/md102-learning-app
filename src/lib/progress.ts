// src/lib/progress.ts

const PREFIX = "mainlab-progress:";

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
