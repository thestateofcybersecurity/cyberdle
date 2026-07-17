import { describe, expect, it } from 'vitest';
import { EPOCH, dailyIndex, localDateString, mulberry32, puzzleNumber } from '../src/game/daily';

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
