import { describe, expect, it } from 'vitest';
import { EPOCH, dailyIndex, localDateString, mulberry32, puzzleNumber } from '../src/game/daily';
import { answerPool, getEntry, pool } from '../src/data';

describe('localDateString', () => {
  it('formats local dates with zero padding', () => {
    expect(localDateString(new Date(2026, 0, 5))).toBe('2026-01-05');
    expect(localDateString(new Date(2026, 11, 31))).toBe('2026-12-31');
  });
});

describe('puzzleNumber', () => {
  it('starts at 1 on the epoch date', () => {
    expect(puzzleNumber(EPOCH)).toBe(1);
  });

  it('increments by one per day', () => {
    expect(puzzleNumber('2026-07-18')).toBe(2);
    expect(puzzleNumber('2026-08-16')).toBe(31);
  });

  it('is stable across DST boundaries', () => {
    // US DST ends 2026-11-01; the day count must not drift.
    expect(puzzleNumber('2026-11-02') - puzzleNumber('2026-10-31')).toBe(2);
  });
});

describe('dailyIndex', () => {
  it('is deterministic', () => {
    expect(dailyIndex(42, 400)).toBe(dailyIndex(42, 400));
  });

  it('stays within pool bounds', () => {
    for (let n = 1; n <= 1000; n++) {
      const idx = dailyIndex(n, 397);
      expect(idx).toBeGreaterThanOrEqual(0);
      expect(idx).toBeLessThan(397);
    }
  });

  it('visits every entry before repeating for a coprime pool size', () => {
    const poolSize = 401;
    const seen = new Set<number>();
    for (let n = 1; n <= poolSize; n++) {
      seen.add(dailyIndex(n, poolSize));
    }
    expect(seen.size).toBe(poolSize);
  });

  it('throws on an empty pool', () => {
    expect(() => dailyIndex(1, 0)).toThrow();
  });
});

describe('mulberry32', () => {
  it('produces a reproducible sequence in [0, 1)', () => {
    const a = mulberry32(1234);
    const b = mulberry32(1234);
    for (let i = 0; i < 10; i++) {
      const v = a();
      expect(v).toBe(b());
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });

  it('differs for different seeds', () => {
    expect(mulberry32(1)()).not.toBe(mulberry32(2)());
  });
});

describe('answer pool generations', () => {
  // Pinned from the pre-sync 545-key dataset: growing the pool must never
  // change an already-published puzzle's answer (the archive replays them).
  const PINNED: Record<number, string> = {
    1: 'ENISA',
    10: 'ECIH',
    20: 'PAAS',
    29: 'OSTH',
    30: 'WIDS',
  };

  it('keeps every pre-sync puzzle answer exactly as it ran', () => {
    for (const [num, key] of Object.entries(PINNED)) {
      const keys = answerPool(Number(num));
      expect(keys, `pool size for puzzle ${num}`).toHaveLength(545);
      expect(keys[dailyIndex(Number(num), keys.length)], `puzzle ${num}`).toBe(key);
    }
  });

  it('opens the full pool at the cutover puzzle', () => {
    expect(answerPool(31).length).toBe(pool().length);
    expect(answerPool(30)).not.toContain('LLM');
    expect(answerPool(31)).toContain('LLM');
  });

  it('every generation answer key resolves to a real entry', () => {
    for (let n = 1; n <= 60; n++) {
      const keys = answerPool(n);
      expect(() => getEntry(keys[dailyIndex(n, keys.length)])).not.toThrow();
    }
  });
});
