import type { TileState } from '../game/types';

const LAYOUT: string[][] = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'],
];

export type KeyHandler = (key: string) => void;

export class Keyboard {
  private keys = new Map<string, HTMLButtonElement>();

  constructor(root: HTMLElement, onKey: KeyHandler) {
    root.innerHTML = '';
    for (const rowKeys of LAYOUT) {
      const row = document.createElement('div');
      row.className = 'kb-row';
      for (const key of rowKeys) {
        const btn = document.createElement('button');
        btn.className = 'key';
        if (/^\d$/.test(key)) btn.classList.add('digit');
        if (key === 'ENTER' || key === 'BACK') btn.classList.add('wide');
        btn.textContent = key === 'BACK' ? '⌫' : key;
        btn.setAttribute('aria-label', key === 'BACK' ? 'Backspace' : key);
        btn.addEventListener('click', () => onKey(key));
        row.appendChild(btn);
        this.keys.set(key, btn);
      }
      root.appendChild(row);
    }
  }

  setStates(states: Record<string, TileState>): void {
    for (const [ch, btn] of this.keys) {
      btn.classList.remove('correct', 'present', 'absent');
      const state = states[ch];
      if (state) btn.classList.add(state);
    }
  }

  reset(): void {
    this.setStates({});
  }
}
