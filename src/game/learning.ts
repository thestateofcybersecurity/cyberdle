import type { LearningRecord, LearningStore } from '../storage';

/** Record one outcome for an acronym. Returns a new store (input untouched). */
export function recordOutcome(store: LearningStore, key: string, won: boolean): LearningStore {
  const prev: LearningRecord = store[key] ?? { right: 0, wrong: 0 };
  return {
    ...store,
    [key]: {
      right: prev.right + (won ? 1 : 0),
      wrong: prev.wrong + (won ? 0 : 1),
    },
  };
}

/** Acronyms the player has gotten wrong more recently than they have recovered. */
export function missedKeys(store: LearningStore): string[] {
  return Object.keys(store)
    .filter((key) => store[key].wrong > 0 && store[key].wrong >= store[key].right)
    .sort();
}

/**
 * Build a study deck: every pool key once, with previously missed keys
 * repeated so they come up more often. Order is decided by the caller's shuffle.
 */
export function studyDeck(poolKeys: string[], store: LearningStore, missedWeight = 3): string[] {
  const missed = new Set(missedKeys(store));
  const deck: string[] = [];
  for (const key of poolKeys) {
    deck.push(key);
    if (missed.has(key)) {
      for (let i = 1; i < missedWeight; i++) deck.push(key);
    }
  }
  return deck;
}
