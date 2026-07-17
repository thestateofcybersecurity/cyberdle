import type { GameStatus } from './game/types';
import type { Stats } from './game/stats';
import { emptyStats } from './game/stats';

export interface Settings {
  hardMode: boolean;
  theme: 'dark' | 'light';
  colorblind: boolean;
}

export interface DailyProgress {
  puzzleNum: number;
  guesses: string[];
  status: GameStatus;
}

/** Per-acronym learning record: how often the player got it right or wrong. */
export interface LearningRecord {
  right: number;
  wrong: number;
}

export type LearningStore = Record<string, LearningRecord>;

/** Finished daily/archive puzzles: puzzle number -> tries (null = lost). */
export type ResultsLog = Record<string, number | null>;

const KEYS = {
  settings: 'cyberdle:settings',
  stats: 'cyberdle:stats',
  daily: 'cyberdle:daily',
  learning: 'cyberdle:learning',
  results: 'cyberdle:results',
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
  return {
    hardMode: false,
    theme: 'dark',
    colorblind: false,
    ...read<Partial<Settings>>(KEYS.settings),
  };
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

export function loadLearning(): LearningStore {
  return read<LearningStore>(KEYS.learning) ?? {};
}

export function saveLearning(store: LearningStore): void {
  write(KEYS.learning, store);
}

export function loadResults(): ResultsLog {
  return read<ResultsLog>(KEYS.results) ?? {};
}

export function saveResults(log: ResultsLog): void {
  write(KEYS.results, log);
}
