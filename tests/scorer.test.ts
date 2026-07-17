import { describe, expect, it } from 'vitest';
import { keyboardStates, scoreGuess } from '../src/game/scorer';

describe('scoreGuess', () => {
  it('marks an exact match all correct', () => {
    expect(scoreGuess('SIEM', 'SIEM')).toEqual(['correct', 'correct', 'correct', 'correct']);
  });

  it('marks absent letters', () => {
    expect(scoreGuess('XDR', 'SOC')).toEqual(['absent', 'absent', 'absent']);
  });

  it('marks present letters in wrong positions', () => {
    expect(scoreGuess('OCS', 'SOC')).toEqual(['present', 'present', 'present']);
  });

  it('does not double-count a guessed duplicate when the answer has one occurrence', () => {
    // Answer SOC has one S; guess SSH: first S is green, second S must be absent.
    expect(scoreGuess('SSH', 'SOC')).toEqual(['correct', 'absent', 'absent']);
  });

  it('greens consume before yellows (Wordle two-pass rule)', () => {
    // Answer ABBA, guess BBAA: pos1 B yellow, pos2 B green, pos3 A yellow, pos4 A green.
    expect(scoreGuess('BBAA', 'ABBA')).toEqual(['present', 'correct', 'present', 'correct']);
  });

  it('awards yellows left to right until answer occurrences run out', () => {
    // Answer AABB, guess AAAA: two greens for A, remaining As absent (answer has only two As).
    expect(scoreGuess('AAAA', 'AABB')).toEqual(['correct', 'correct', 'absent', 'absent']);
  });

  it('handles digits like letters', () => {
    expect(scoreGuess('SHA512', 'SHA256')).toEqual([
      'correct',
      'correct',
      'correct',
      'present',
      'absent',
      'present',
    ]);
  });

  it('throws on length mismatch', () => {
    expect(() => scoreGuess('AB', 'ABC')).toThrow();
  });
});

describe('keyboardStates', () => {
  it('tracks best state per character and never downgrades', () => {
    // Answer SOC. Guess 1: OCS (all yellow). Guess 2: SOC (all green).
    const states = keyboardStates(['OCS', 'SOC'], 'SOC');
    expect(states).toEqual({ S: 'correct', O: 'correct', C: 'correct' });
  });

  it('keeps correct when a later guess scores the same char present', () => {
    // Answer ABBA. First guess fixes A green at pos 1; second guess has A only as yellow.
    const states = keyboardStates(['AXXX', 'XAXX'], 'ABBA');
    expect(states.A).toBe('correct');
    expect(states.X).toBe('absent');
  });

  it('marks unused characters absent only when guessed', () => {
    const states = keyboardStates(['XDR'], 'SOC');
    expect(states).toEqual({ X: 'absent', D: 'absent', R: 'absent' });
  });
});
