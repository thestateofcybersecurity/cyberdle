import type { TileState } from './types';

/**
 * Score a guess against the answer using Wordle's two-pass rules:
 * greens are consumed first, then yellows are awarded left to right
 * from the remaining unmatched answer characters.
 */
export function scoreGuess(guess: string, answer: string): TileState[] {
  if (guess.length !== answer.length) {
    throw new Error(`Guess length ${guess.length} does not match answer length ${answer.length}`);
  }

  const result: TileState[] = new Array(guess.length).fill('absent');
  const remaining = new Map<string, number>();

  for (let i = 0; i < answer.length; i++) {
    if (guess[i] === answer[i]) {
      result[i] = 'correct';
    } else {
      remaining.set(answer[i], (remaining.get(answer[i]) ?? 0) + 1);
    }
  }

  for (let i = 0; i < guess.length; i++) {
    if (result[i] === 'correct') continue;
    const count = remaining.get(guess[i]) ?? 0;
    if (count > 0) {
      result[i] = 'present';
      remaining.set(guess[i], count - 1);
    }
  }

  return result;
}

const STATE_RANK: Record<TileState, number> = { absent: 0, present: 1, correct: 2 };

/**
 * Best-known state per character across all guesses, for keyboard coloring.
 * A key is never downgraded (correct > present > absent).
 */
export function keyboardStates(guesses: string[], answer: string): Record<string, TileState> {
  const states: Record<string, TileState> = {};
  for (const guess of guesses) {
    const score = scoreGuess(guess, answer);
    for (let i = 0; i < guess.length; i++) {
      const ch = guess[i];
      const prev = states[ch];
      if (prev === undefined || STATE_RANK[score[i]] > STATE_RANK[prev]) {
        states[ch] = score[i];
      }
    }
  }
  return states;
}
