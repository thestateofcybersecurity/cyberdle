export type TileState = 'correct' | 'present' | 'absent';

export type GameStatus = 'playing' | 'won' | 'lost';

export type Difficulty = 'easy' | 'medium' | 'hard';

export const CATEGORIES = [
  'certifications',
  'protocols',
  'attacks',
  'crypto',
  'governance',
  'cloud',
  'operations',
  'identity',
  'appsec',
  'network',
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Source {
  name: string;
  url: string;
}

export interface AcronymEntry {
  expansion: string;
  display: string;
  category: Category;
  difficulty: Difficulty;
  explanation: string;
  sources: Source[];
}

export type AcronymData = Record<string, AcronymEntry>;

/** Characters a player can type: the answer-key alphabet. */
export const PLAYABLE_CHARS = /^[A-Z0-9]+$/;
export const MIN_ANSWER_LENGTH = 3;
export const MAX_ANSWER_LENGTH = 8;
export const MAX_GUESSES = 6;
