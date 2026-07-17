/** First daily puzzle date (local time), puzzle #1. */
export const EPOCH = '2026-07-17';

const DAY_MS = 86_400_000;

/** Local-time YYYY-MM-DD, so everyone rolls over at their own midnight like Wordle. */
export function localDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** 1-based daily puzzle number for a local date string. */
export function puzzleNumber(dateString: string, epoch = EPOCH): number {
  // Parse as UTC midnights so DST shifts can't skew the day count.
  const days = Math.round((Date.parse(dateString) - Date.parse(epoch)) / DAY_MS);
  return days + 1;
}

/**
 * Deterministic pool index for a puzzle number. Uses a multiplicative step
 * with a large prime so consecutive days jump around the pool and every
 * entry is visited before any repeats (for pool sizes not divisible by the prime).
 */
export function dailyIndex(puzzleNum: number, poolSize: number): number {
  if (poolSize <= 0) throw new Error('Pool is empty');
  const PRIME = 2_654_435_761; // Knuth's multiplicative hash constant
  // Use BigInt to avoid float precision loss beyond 2^53.
  return Number((BigInt(puzzleNum) * BigInt(PRIME)) % BigInt(poolSize));
}

/** Seeded PRNG (mulberry32) for reproducible practice shuffles. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
