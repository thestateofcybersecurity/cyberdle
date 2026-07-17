import { describe, expect, it } from 'vitest';
import { emptyStats, recordResult, winRate } from '../src/game/stats';

describe('recordResult', () => {
  it('records a first win', () => {
    const stats = recordResult(emptyStats(), 1, 4);
    expect(stats.played).toBe(1);
    expect(stats.won).toBe(1);
    expect(stats.currentStreak).toBe(1);
    expect(stats.maxStreak).toBe(1);
    expect(stats.distribution[3]).toBe(1);
  });

  it('extends the streak on consecutive-day wins', () => {
    let stats = emptyStats();
    stats = recordResult(stats, 1, 3);
    stats = recordResult(stats, 2, 5);
    expect(stats.currentStreak).toBe(2);
    expect(stats.maxStreak).toBe(2);
  });

  it('resets the streak to 1 after a skipped day', () => {
    let stats = emptyStats();
    stats = recordResult(stats, 1, 3);
    stats = recordResult(stats, 5, 2);
    expect(stats.currentStreak).toBe(1);
    expect(stats.maxStreak).toBe(1);
  });

  it('zeroes the streak on a loss but keeps maxStreak', () => {
    let stats = emptyStats();
    stats = recordResult(stats, 1, 3);
    stats = recordResult(stats, 2, 1);
    stats = recordResult(stats, 3, null);
    expect(stats.currentStreak).toBe(0);
    expect(stats.maxStreak).toBe(2);
    expect(stats.played).toBe(3);
    expect(stats.won).toBe(2);
  });

  it('ignores duplicate submissions for the same puzzle', () => {
    let stats = emptyStats();
    stats = recordResult(stats, 1, 3);
    const again = recordResult(stats, 1, 2);
    expect(again).toEqual(stats);
  });

  it('does not mutate the input stats', () => {
    const stats = emptyStats();
    recordResult(stats, 1, 3);
    expect(stats.played).toBe(0);
    expect(stats.distribution.every((n) => n === 0)).toBe(true);
  });
});

describe('winRate', () => {
  it('is 0 for no games', () => {
    expect(winRate(emptyStats())).toBe(0);
  });

  it('rounds to a whole percentage', () => {
    let stats = emptyStats();
    stats = recordResult(stats, 1, 3);
    stats = recordResult(stats, 2, null);
    stats = recordResult(stats, 3, 2);
    expect(winRate(stats)).toBe(67);
  });
});
