import { MAX_ANSWER_LENGTH, MAX_GUESSES, PLAYABLE_CHARS } from './game/types';
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

/**
 * localStorage is untrusted input: any same-origin script, a browser extension,
 * a backup or sync tool, or plain corruption can put anything there, and a bad
 * value comes back on every load. Each loader therefore parses to `unknown` and
 * rebuilds a value of the expected shape, dropping whatever does not fit, so a
 * malformed entry degrades to defaults instead of crashing the app for good.
 */
function read(key: string): unknown {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as unknown) : null;
  } catch {
    return null;
  }
}

/** Upper bound for stored counters; far beyond anything real play can reach. */
const MAX_COUNT = 1_000_000;
/** Dataset keys are 3 to 8 playable characters; allow 1 to 8 for stored keys. */
const STORED_KEY = new RegExp(`^[A-Z0-9]{1,${MAX_ANSWER_LENGTH}}$`);
const PUZZLE_KEY = /^[1-9]\d{0,5}$/;
const STATUSES: readonly GameStatus[] = ['playing', 'won', 'lost'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** A whole number in [0, max], or the fallback for anything else. */
function count(value: unknown, fallback = 0, max = MAX_COUNT): number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= max
    ? value
    : fallback;
}

export function sanitizeSettings(raw: unknown): Settings {
  const stored = isRecord(raw) ? raw : {};
  return {
    hardMode: stored.hardMode === true,
    theme: stored.theme === 'light' ? 'light' : 'dark',
    colorblind: stored.colorblind === true,
  };
}

export function sanitizeStats(raw: unknown): Stats {
  const base = emptyStats();
  if (!isRecord(raw)) return base;
  const played = count(raw.played);
  const maxStreak = count(raw.maxStreak);
  const distribution = Array.isArray(raw.distribution)
    ? base.distribution.map((_, i) => count((raw.distribution as unknown[])[i]))
    : base.distribution;
  const last = raw.lastPlayedPuzzle;
  return {
    played,
    won: Math.min(count(raw.won), played),
    currentStreak: Math.min(count(raw.currentStreak), maxStreak),
    maxStreak,
    distribution,
    lastPlayedPuzzle: typeof last === 'number' && Number.isInteger(last) && last >= 1 && last <= MAX_COUNT ? last : null,
  };
}

export function sanitizeDailyProgress(raw: unknown): DailyProgress | null {
  if (!isRecord(raw)) return null;
  const { puzzleNum, guesses, status } = raw;
  if (typeof puzzleNum !== 'number' || !Number.isInteger(puzzleNum)) return null;
  if (!Array.isArray(guesses)) return null;
  const clean = guesses
    .filter(
      (guess): guess is string =>
        typeof guess === 'string' && guess.length <= MAX_ANSWER_LENGTH && PLAYABLE_CHARS.test(guess),
    )
    .slice(0, MAX_GUESSES);
  return {
    puzzleNum,
    guesses: clean,
    status: STATUSES.includes(status as GameStatus) ? (status as GameStatus) : 'playing',
  };
}

export function sanitizeLearning(raw: unknown): LearningStore {
  const store: LearningStore = {};
  if (!isRecord(raw)) return store;
  for (const [key, value] of Object.entries(raw)) {
    if (!STORED_KEY.test(key) || !isRecord(value)) continue;
    store[key] = { right: count(value.right), wrong: count(value.wrong) };
  }
  return store;
}

export function sanitizeResults(raw: unknown): ResultsLog {
  const log: ResultsLog = {};
  if (!isRecord(raw)) return log;
  for (const [key, value] of Object.entries(raw)) {
    if (!PUZZLE_KEY.test(key)) continue;
    if (value === null) log[key] = null;
    else if (typeof value === 'number' && Number.isInteger(value) && value >= 1 && value <= MAX_GUESSES) {
      log[key] = value;
    }
  }
  return log;
}

function write(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage may be unavailable (private mode); the game still works without persistence.
  }
}

export function loadSettings(): Settings {
  return sanitizeSettings(read(KEYS.settings));
}

export function saveSettings(settings: Settings): void {
  write(KEYS.settings, settings);
}

export function loadStats(): Stats {
  return sanitizeStats(read(KEYS.stats));
}

export function saveStats(stats: Stats): void {
  write(KEYS.stats, stats);
}

export function loadDailyProgress(puzzleNum: number): DailyProgress | null {
  const stored = sanitizeDailyProgress(read(KEYS.daily));
  return stored && stored.puzzleNum === puzzleNum ? stored : null;
}

export function saveDailyProgress(progress: DailyProgress): void {
  write(KEYS.daily, progress);
}

export function loadLearning(): LearningStore {
  return sanitizeLearning(read(KEYS.learning));
}

export function saveLearning(store: LearningStore): void {
  write(KEYS.learning, store);
}

export function loadResults(): ResultsLog {
  return sanitizeResults(read(KEYS.results));
}

export function saveResults(log: ResultsLog): void {
  write(KEYS.results, log);
}
