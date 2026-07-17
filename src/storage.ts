import type { GameStatus } from './game/types';
import type { Stats } from './game/stats';
import { emptyStats } from './game/stats';

export interface Settings {
  hardMode: boolean;
  theme: 'dark' | 'light';
}

export interface DailyProgress {
  puzzleNum: number;
  guesses: string[];
  status: GameStatus;
}

const KEYS = {
  settings: 'cyberdle:settings',
  stats: 'cyberdle:stats',
  daily: 'cyberdle:daily',
} as const;

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage may be unavailable (private mode); the game still works without persistence.
  }
}

export function loadSettings(): Settings {
  return { hardMode: false, theme: 'dark', ...read<Partial<Settings>>(KEYS.settings) };
}

export function saveSettings(settings: Settings): void {
  write(KEYS.settings, settings);
}

export function loadStats(): Stats {
  const stored = read<Partial<Stats>>(KEYS.stats);
  return { ...emptyStats(), ...stored };
}

export function saveStats(stats: Stats): void {
  write(KEYS.stats, stats);
}

export function loadDailyProgress(puzzleNum: number): DailyProgress | null {
  const stored = read<DailyProgress>(KEYS.daily);
  return stored && stored.puzzleNum === puzzleNum ? stored : null;
}

export function saveDailyProgress(progress: DailyProgress): void {
  write(KEYS.daily, progress);
}
