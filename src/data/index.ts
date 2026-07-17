import rawData from './acronyms.json';
import type { AcronymData, AcronymEntry, Category, Difficulty } from '../game/types';

const data = rawData as AcronymData;

export function getEntry(key: string): AcronymEntry {
  const entry = data[key];
  if (!entry) throw new Error(`Unknown acronym: ${key}`);
  return entry;
}

export interface PoolFilter {
  difficulty?: Difficulty;
  category?: Category;
}

/** Sorted answer keys, optionally filtered. Sorting keeps daily selection deterministic. */
export function pool(filter: PoolFilter = {}): string[] {
  return Object.keys(data)
    .filter((key) => {
      const entry = data[key];
      if (filter.difficulty && entry.difficulty !== filter.difficulty) return false;
      if (filter.category && entry.category !== filter.category) return false;
      return true;
    })
    .sort();
}

export function allData(): AcronymData {
  return data;
}
