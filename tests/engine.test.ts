import { describe, expect, it } from 'vitest';
import { applyGuess, checkHardMode, createGame } from '../src/game/engine';

describe('createGame', () => {
  it('normalizes the answer to uppercase', () => {
    expect(createGame('siem').answer).toBe('SIEM');
  });

  it('rejects unplayable answers', () => {
    expect(() => createGame('PCI-DSS')).toThrow();
  });
});

describe('applyGuess', () => {
  it('wins on a correct guess', () => {
    const { state } = applyGuess(createGame('SIEM'), 'siem');
    expect(state.status).toBe('won');
    expect(state.guesses).toEqual(['SIEM']);
  });

  it('loses after max guesses', () => {
    let state = createGame('SOC', 2);
    ({ state } = applyGuess(state, 'XDR'));
    expect(state.status).toBe('playing');
    ({ state } = applyGuess(state, 'EDR'));
    expect(state.status).toBe('lost');
  });

  it('rejects wrong-length guesses without consuming a turn', () => {
    const game = createGame('SIEM');
    const { state, error } = applyGuess(game, 'SOC');
    expect(error).toBeTruthy();
    expect(state.guesses).toHaveLength(0);
  });

  it('rejects non-alphanumeric guesses', () => {
    const { error } = applyGuess(createGame('SIEM'), 'SI-M');
    expect(error).toBeTruthy();
  });

  it('rejects guesses after the game is over', () => {
    let state = createGame('SOC');
    ({ state } = applyGuess(state, 'SOC'));
    const result = applyGuess(state, 'XDR');
    expect(result.error).toBeTruthy();
    expect(result.state.guesses).toHaveLength(1);
  });

  it('does not mutate the previous state', () => {
    const game = createGame('SOC');
    applyGuess(game, 'XDR');
    expect(game.guesses).toHaveLength(0);
  });
});

describe('hard mode', () => {
  it('requires greens to stay in place', () => {
    let state = createGame('SIEM');
    ({ state } = applyGuess(state, 'SOAR')); // S is green
    expect(checkHardMode(state, 'TEAM')).toMatch(/Position 1 must be S/);
    expect(checkHardMode(state, 'SPAM')).toBeNull();
  });

  it('requires yellows to be reused somewhere', () => {
    let state = createGame('SIEM');
    ({ state } = applyGuess(state, 'MOSS')); // M yellow (pos1), S yellow (pos3)
    expect(checkHardMode(state, 'TIER')).toMatch(/must contain/);
    expect(checkHardMode(state, 'MIST')).toBeNull();
  });

  it('is enforced by applyGuess when enabled', () => {
    let state = createGame('SIEM');
    ({ state } = applyGuess(state, 'SOAR', true));
    const result = applyGuess(state, 'TEAM', true);
    expect(result.error).toBeTruthy();
    expect(result.state.guesses).toHaveLength(1);
  });

  it('is not enforced when disabled', () => {
    let state = createGame('SIEM');
    ({ state } = applyGuess(state, 'SOAR'));
    const result = applyGuess(state, 'TEAM');
    expect(result.error).toBeUndefined();
  });
});
