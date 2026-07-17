import { MAX_GUESSES } from './types';

export interface Stats {
  played: number;
  won: number;
  currentStreak: number;
  maxStreak: number;
  /** Index i = wins in i+1 guesses. */
  distribution: number[];
  lastPlayedPuzzle: number | null;
}

export function emptyStats(): Stats {
  return {
    played: 0,
    won: 0,
    currentStreak: 0,
    maxStreak: 0,
    distribution: new Array(MAX_GUESSES).fill(0),
    lastPlayedPuzzle: null,
  };
}

/**
 * Record a finished daily game. `wonInGuesses` is 1-based, or null for a loss.
 * The streak continues only when consecutive puzzle numbers are won.
 */
export function recordResult(stats: Stats, puzzleNum: number, wonInGuesses: number | null): Stats {
  if (stats.lastPlayedPuzzle !== null && puzzleNum <= stats.lastPlayedPuzzle) {
    return stats; // already recorded (e.g. double-submit or replay)
  }
  const next: Stats = {
    ...stats,
    distribution: [...stats.distribution],
    played: stats.played + 1,
    lastPlayedPuzzle: puzzleNum,
  };
  if (wonInGuesses === null) {
    next.currentStreak = 0;
    return next;
  }
  next.won += 1;
  next.distribution[wonInGuesses - 1] += 1;
  const consecutive = stats.lastPlayedPuzzle !== null && puzzleNum === stats.lastPlayedPuzzle + 1;
  next.currentStreak = consecutive || stats.lastPlayedPuzzle === null ? stats.currentStreak + 1 : 1;
  next.maxStreak = Math.max(next.maxStreak, next.currentStreak);
  return next;
}

export function winRate(stats: Stats): number {
  return stats.played === 0 ? 0 : Math.round((stats.won / stats.played) * 100);
}
