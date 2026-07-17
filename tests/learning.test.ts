import { describe, expect, it } from 'vitest';
import { missedKeys, recordOutcome, studyDeck } from '../src/game/learning';

describe('recordOutcome', () => {
  it('creates and increments records without mutating the input', () => {
    const store = {};
    const afterLoss = recordOutcome(store, 'SIEM', false);
    const afterWin = recordOutcome(afterLoss, 'SIEM', true);
    expect(store).toEqual({});
    expect(afterLoss.SIEM).toEqual({ right: 0, wrong: 1 });
    expect(afterWin.SIEM).toEqual({ right: 1, wrong: 1 });
  });
});

describe('missedKeys', () => {
  it('returns acronyms with at least as many losses as wins', () => {
    let store = {};
    store = recordOutcome(store, 'XSS', false); // 0-1 -> missed
    store = recordOutcome(store, 'VPN', true); // 1-0 -> learned
    store = recordOutcome(store, 'HMAC', false);
    store = recordOutcome(store, 'HMAC', true); // 1-1 -> still missed
    expect(missedKeys(store)).toEqual(['HMAC', 'XSS']);
  });

  it('drops an acronym once wins outnumber losses', () => {
    let store = {};
    store = recordOutcome(store, 'XSS', false);
    store = recordOutcome(store, 'XSS', true);
    store = recordOutcome(store, 'XSS', true);
    expect(missedKeys(store)).toEqual([]);
  });
});

describe('studyDeck', () => {
  it('repeats missed keys and includes everything once', () => {
    let store = {};
    store = recordOutcome(store, 'XSS', false);
    const deck = studyDeck(['VPN', 'XSS', 'AES'], store, 3);
    expect(deck.filter((k) => k === 'XSS')).toHaveLength(3);
    expect(deck.filter((k) => k === 'VPN')).toHaveLength(1);
    expect(deck.filter((k) => k === 'AES')).toHaveLength(1);
  });
});
