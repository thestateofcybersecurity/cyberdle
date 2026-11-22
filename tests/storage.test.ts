import { describe, expect, it } from 'vitest';
import { emptyStats } from '../src/game/stats';
import {
  sanitizeDailyProgress,
  sanitizeLearning,
  sanitizeResults,
  sanitizeSettings,
  sanitizeStats,
} from '../src/storage';

// Security regression (pentest 2026-11-22, CYB-01): localStorage is untrusted.
// A malformed value must degrade to defaults, never reach code that would throw.
const HOSTILE: unknown[] = [null, undefined, 5, 'x', true, [], [null], {}, { a: null }, '<img src=x onerror=alert(1)>'];

describe('sanitizeSettings', () => {
  it('keeps valid settings', () => {
    expect(sanitizeSettings({ hardMode: true, theme: 'light', colorblind: true })).toEqual({
      hardMode: true,
      theme: 'light',
      colorblind: true,
    });
  });

  it('falls back to defaults for anything else', () => {
    for (const raw of HOSTILE) {
      expect(sanitizeSettings(raw)).toEqual({ hardMode: false, theme: 'dark', colorblind: false });
    }
    expect(sanitizeSettings({ hardMode: 'yes', theme: '<b>', colorblind: 1, extra: 1 })).toEqual({
      hardMode: false,
      theme: 'dark',
      colorblind: false,
    });
  });
});

describe('sanitizeStats', () => {
  it('keeps valid stats unchanged', () => {
    const stats = {
      played: 12,
      won: 9,
      currentStreak: 3,
      maxStreak: 5,
      distribution: [0, 1, 3, 4, 1, 0],
      lastPlayedPuzzle: 128,
    };
    expect(sanitizeStats(stats)).toEqual(stats);
  });

  it('returns empty stats for non-objects', () => {
    for (const raw of [null, undefined, 5, 'x', true, [], [null]]) {
      expect(sanitizeStats(raw)).toEqual(emptyStats());
    }
  });

  it('repairs a distribution that is not a six-number array', () => {
    for (const distribution of ['x', 7, null, {}, { length: 1e9 }, [1, 'a', -1, 2.5, null]]) {
      const stats = sanitizeStats({ played: 3, won: 3, distribution });
      expect(Array.isArray(stats.distribution)).toBe(true);
      expect(stats.distribution).toHaveLength(6);
      expect(stats.distribution.every((n) => Number.isInteger(n) && n >= 0)).toBe(true);
    }
    expect(sanitizeStats({ distribution: [1, 'a', -1, 2.5, null] }).distribution).toEqual([1, 0, 0, 0, 0, 0]);
  });

  it('rejects non-integer, negative, and oversized counters', () => {
    const stats = sanitizeStats({
      played: '12',
      won: -1,
      currentStreak: 1e12,
      maxStreak: NaN,
      lastPlayedPuzzle: '128',
    });
    expect(stats).toEqual(emptyStats());
  });

  it('keeps counters consistent with each other', () => {
    const stats = sanitizeStats({ played: 2, won: 50, currentStreak: 40, maxStreak: 3 });
    expect(stats.won).toBe(2);
    expect(stats.currentStreak).toBe(3);
  });
});

describe('sanitizeDailyProgress', () => {
  it('keeps valid progress', () => {
    const progress = { puzzleNum: 129, guesses: ['SIEM', 'SOAR'], status: 'playing' };
    expect(sanitizeDailyProgress(progress)).toEqual(progress);
  });

  it('returns null when the shape is wrong', () => {
    for (const raw of HOSTILE) expect(sanitizeDailyProgress(raw)).toBeNull();
    expect(sanitizeDailyProgress({ puzzleNum: 129, guesses: 5 })).toBeNull();
    expect(sanitizeDailyProgress({ puzzleNum: 129 })).toBeNull();
    expect(sanitizeDailyProgress({ puzzleNum: '129', guesses: [] })).toBeNull();
  });

  it('drops guesses that are not short playable strings', () => {
    const progress = sanitizeDailyProgress({
      puzzleNum: 129,
      guesses: [1337, null, ['A'], { length: 4 }, 'ok!', '<b>', 'A'.repeat(9), 'siem', 'SIEM'],
      status: 'hacked',
    });
    expect(progress).toEqual({ puzzleNum: 129, guesses: ['SIEM'], status: 'playing' });
  });

  it('caps the number of guesses', () => {
    const progress = sanitizeDailyProgress({ puzzleNum: 1, guesses: new Array(500).fill('SIEM') });
    expect(progress?.guesses).toHaveLength(6);
  });
});

describe('sanitizeLearning', () => {
  it('keeps valid records', () => {
    const store = { SIEM: { right: 2, wrong: 1 }, '2FA': { right: 0, wrong: 3 } };
    expect(sanitizeLearning(store)).toEqual(store);
  });

  it('returns an empty store for non-objects', () => {
    for (const raw of [null, undefined, 5, 'x', true, [], [null]]) {
      expect(sanitizeLearning(raw)).toEqual({});
    }
  });

  it('drops malformed keys and records', () => {
    const store = sanitizeLearning(
      JSON.parse('{"SIEM":null,"XDR":"x","__proto__":{"right":1,"wrong":1},"<img>":{"right":1,"wrong":1},"VPN":{"right":"1","wrong":-4}}'),
    );
    expect(Object.keys(store)).toEqual(['VPN']);
    expect(store.VPN).toEqual({ right: 0, wrong: 0 });
    expect(Object.getPrototypeOf(store)).toBe(Object.prototype);
  });
});

describe('sanitizeResults', () => {
  it('keeps valid results', () => {
    const log = { '1': 3, '2': null, '128': 6 };
    expect(sanitizeResults(log)).toEqual(log);
  });

  it('drops malformed keys and values', () => {
    expect(
      sanitizeResults({ '0': 1, '-1': 1, abc: 1, '3': 0, '4': 7, '5': '3', '6': 2.5, '7': '<b>', '8': 2 }),
    ).toEqual({ '8': 2 });
    for (const raw of [null, undefined, 5, 'x', true, [], [null]]) {
      expect(sanitizeResults(raw)).toEqual({});
    }
  });
});
