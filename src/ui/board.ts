import type { TileState } from '../game/types';

const REVEAL_STAGGER_MS = 260;

export class Board {
  private root: HTMLElement;
  private rows: HTMLElement[][] = [];
  private cols = 0;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  build(rows: number, cols: number): void {
    this.cols = cols;
    this.root.innerHTML = '';
    this.root.style.setProperty('--cols', String(cols));
    // Fit tiles to the viewport for long answers and small screens.
    const tile = Math.floor(
      Math.min(58, (Math.min(window.innerWidth, 560) - 24 - (cols - 1) * 6) / cols),
    );
    this.root.style.setProperty('--tile', `${tile}px`);
    this.rows = [];
    for (let r = 0; r < rows; r++) {
      const row: HTMLElement[] = [];
      for (let c = 0; c < cols; c++) {
        const tileEl = document.createElement('div');
        tileEl.className = 'tile';
        tileEl.setAttribute('role', 'gridcell');
        this.root.appendChild(tileEl);
        row.push(tileEl);
      }
      this.rows.push(row);
    }
  }

  setInput(rowIndex: number, guess: string): void {
    const row = this.rows[rowIndex];
    if (!row) return;
    for (let c = 0; c < this.cols; c++) {
      const ch = guess[c] ?? '';
      const tile = row[c];
      if (tile.textContent !== ch) {
        tile.textContent = ch;
        tile.classList.toggle('filled', ch !== '');
        if (ch) {
          tile.classList.remove('filled');
          void tile.offsetWidth; // restart pop animation
          tile.classList.add('filled');
        }
      }
    }
  }

  /** Reveal a scored row with staggered flips. Resolves when done. */
  reveal(rowIndex: number, guess: string, score: TileState[], animate = true): Promise<void> {
    const row = this.rows[rowIndex];
    if (!row) return Promise.resolve();
    if (!animate) {
      row.forEach((tile, c) => {
        tile.textContent = guess[c];
        tile.classList.remove('filled');
        tile.classList.add(score[c]);
      });
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      row.forEach((tile, c) => {
        tile.textContent = guess[c];
        setTimeout(() => {
          tile.classList.add('reveal');
          // Apply the state color at the flip midpoint.
          setTimeout(() => {
            tile.classList.remove('filled');
            tile.classList.add(score[c]);
          }, 250);
        }, c * REVEAL_STAGGER_MS);
      });
      setTimeout(resolve, (row.length - 1) * REVEAL_STAGGER_MS + 520);
    });
  }

  celebrate(rowIndex: number): void {
    const row = this.rows[rowIndex];
    row?.forEach((tile, c) => {
      setTimeout(() => tile.classList.add('bounce'), c * 80);
    });
  }

  shake(rowIndex: number): void {
    const row = this.rows[rowIndex];
    if (!row) return;
    row.forEach((tile) => tile.classList.add('row-shake'));
    setTimeout(() => row.forEach((tile) => tile.classList.remove('row-shake')), 500);
  }
}
