import { describe, expect, it } from 'vitest';
import { applyGuess, createGame } from '../src/game/engine';
import { shareText } from '../src/ui/share';

describe('shareText', () => {
  it('builds the emoji grid for a win', () => {
    let state = createGame('VEX');
    ({ state } = applyGuess(state, 'EXV'));
    ({ state } = applyGuess(state, 'VEX'));
    expect(shareText(state, 42, false)).toBe('Cyberdle #42 2/6\n\n🟨🟨🟨\n🟩🟩🟩');
  });

  it('uses X for a loss and marks hard mode with an asterisk', () => {
    let state = createGame('SOC', 1);
    ({ state } = applyGuess(state, 'XDR'));
    expect(state.status).toBe('lost');
    expect(shareText(state, 7, true)).toBe('Cyberdle #7 X/1*\n\n⬛⬛⬛');
  });
});
