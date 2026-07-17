import { scoreGuess } from './scorer';
import { MAX_GUESSES, PLAYABLE_CHARS } from './types';
import type { GameStatus } from './types';

export interface GameState {
  answer: string;
  guesses: string[];
  status: GameStatus;
  maxGuesses: number;
}

export interface GuessResult {
  state: GameState;
  error?: string;
}

export function createGame(answer: string, maxGuesses = MAX_GUESSES): GameState {
  const normalized = answer.toUpperCase();
  if (!PLAYABLE_CHARS.test(normalized)) {
    throw new Error(`Answer "${answer}" contains unplayable characters`);
  }
  return { answer: normalized, guesses: [], status: 'playing', maxGuesses };
}

/**
 * Hard mode: every revealed hint must be reused. Greens must stay in place,
 * and yellows must appear somewhere in the new guess.
 * Returns an error message, or null if the guess is allowed.
 */
export function checkHardMode(state: GameState, guess: string): string | null {
  const { answer, guesses } = state;
  for (const prev of guesses) {
    const score = scoreGuess(prev, answer);
    // Count required (non-green) hint characters, then verify placement.
    const required = new Map<string, number>();
    for (let i = 0; i < prev.length; i++) {
      if (score[i] === 'correct') {
        if (guess[i] !== prev[i]) {
          return `Position ${i + 1} must be ${prev[i]}`;
        }
      } else if (score[i] === 'present') {
        required.set(prev[i], (required.get(prev[i]) ?? 0) + 1);
      }
    }
    // Non-green guess characters must cover all "present" hints.
    const available = new Map<string, number>();
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] !== prev[i] || score[i] !== 'correct') {
        available.set(guess[i], (available.get(guess[i]) ?? 0) + 1);
      }
    }
    for (const [ch, count] of required) {
      if ((available.get(ch) ?? 0) < count) {
        return `Guess must contain ${ch}`;
      }
    }
  }
  return null;
}

export function applyGuess(state: GameState, rawGuess: string, hardMode = false): GuessResult {
  if (state.status !== 'playing') {
    return { state, error: 'Game is over' };
  }
  const guess = rawGuess.toUpperCase();
  if (guess.length !== state.answer.length) {
    return { state, error: `Not enough characters: need ${state.answer.length}` };
  }
  if (!PLAYABLE_CHARS.test(guess)) {
    return { state, error: 'Only letters and digits are allowed' };
  }
  if (hardMode) {
    const hardError = checkHardMode(state, guess);
    if (hardError) {
      return { state, error: hardError };
    }
  }

  const guesses = [...state.guesses, guess];
  let status: GameStatus = 'playing';
  if (guess === state.answer) {
    status = 'won';
  } else if (guesses.length >= state.maxGuesses) {
    status = 'lost';
  }
  return { state: { ...state, guesses, status } };
}
