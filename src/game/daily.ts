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

/**
 * Keys added to the dataset after the daily game launched, and the first
 * puzzle number allowed to draw them.
 *
 * The daily answer is `keys[hash(puzzleNum) % keys.length]`, so any change to
 * the pool's membership silently rewrites the answer for every puzzle number,
 * past and future: archive replays would stop matching the puzzles people
 * actually played, and an in-progress daily (saved as guesses, rescored on
 * load) would break mid-day. Excluding later additions from earlier puzzle
 * numbers keeps every already-published puzzle exactly as it ran; each new
 * batch simply starts appearing at its own cutover. Lives here rather than in
 * src/data so the logic stays pure and testable without importing the dataset.
 */
export const POOL_ADDITIONS: { fromPuzzle: number; keys: Set<string> }[] = [
  {
    // 2026-08-16: the AI and IT vocabulary sync from the AlphabetSoup dataset.
    fromPuzzle: 31,
    keys: new Set([
      'AGI', 'AIRMF', 'ATLAS', 'DEVOPS', 'ETL', 'GAN', 'GENAI', 'GPT', 'GPU',
      'GRPC', 'HITL', 'JSON', 'K8S', 'LAN', 'LLM', 'LORA', 'MCP', 'MLOPS',
      'MOE', 'NLP', 'NOSQL', 'OCR', 'RAG', 'REST', 'RLHF', 'RPA', 'SDK',
      'SFT', 'SLM', 'SQL', 'SRE', 'TPU', 'WAN', 'XAI', 'YAML',
    ]),
  },
];

/** The subset of `keys` that was in the answer pool when `puzzleNum` ran. */
export function generationPool(puzzleNum: number, keys: string[]): string[] {
  return keys.filter((key) =>
    POOL_ADDITIONS.every((a) => puzzleNum >= a.fromPuzzle || !a.keys.has(key)),
  );
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
