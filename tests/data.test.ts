import { describe, expect, it } from 'vitest';
import { allData, pool } from '../src/data';
import { validateData } from '../src/data/validate';

describe('acronym dataset', () => {
  it('passes all validation rules', () => {
    expect(validateData(allData())).toEqual([]);
  });

  it('has a sorted, deterministic pool', () => {
    const keys = pool();
    expect(keys.length).toBeGreaterThanOrEqual(400);
    expect(keys).toEqual([...keys].sort());
  });

  it('filters by difficulty and category', () => {
    const easy = pool({ difficulty: 'easy' });
    expect(easy.length).toBeGreaterThan(0);
    const crypto = pool({ category: 'crypto' });
    expect(crypto.length).toBeGreaterThan(0);
    expect(crypto.length).toBeLessThan(pool().length);
  });
});
