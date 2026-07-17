import { scoreGuess } from '../game/scorer';
import type { GameState } from '../game/engine';

const EMOJI = { correct: '🟩', present: '🟨', absent: '⬛' } as const;
const EMOJI_COLORBLIND = { correct: '🟧', present: '🟦', absent: '⬛' } as const;

export function shareText(
  state: GameState,
  puzzleNum: number,
  hardMode: boolean,
  colorblind = false,
): string {
  const emoji = colorblind ? EMOJI_COLORBLIND : EMOJI;
  const tries = state.status === 'won' ? String(state.guesses.length) : 'X';
  const header = `Cyberdle #${puzzleNum} ${tries}/${state.maxGuesses}${hardMode ? '*' : ''}`;
  const grid = state.guesses
    .map((guess) =>
      scoreGuess(guess, state.answer)
        .map((s) => emoji[s])
        .join(''),
    )
    .join('\n');
  return `${header}\n\n${grid}`;
}

export async function copyShare(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
