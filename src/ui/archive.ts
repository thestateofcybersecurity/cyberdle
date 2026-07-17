import type { ResultsLog } from '../storage';

export interface ArchiveOptions {
  todayPuzzle: number;
  results: ResultsLog;
  maxGuesses: number;
  onPlay: (puzzleNum: number) => void;
}

/** Build the archive modal body: past dailies, newest first. */
export function buildArchiveModal(body: HTMLElement, opts: ArchiveOptions): void {
  const intro = document.createElement('p');
  intro.textContent =
    'Replay past daily puzzles. Archive games count toward your learning list but not your streak or stats.';
  body.appendChild(intro);

  const list = document.createElement('div');
  list.className = 'archive-list';

  if (opts.todayPuzzle <= 1) {
    const empty = document.createElement('p');
    empty.className = 'setting-desc';
    empty.textContent = 'No past puzzles yet. Come back tomorrow.';
    body.appendChild(empty);
    return;
  }

  for (let puzzleNum = opts.todayPuzzle - 1; puzzleNum >= 1; puzzleNum--) {
    const row = document.createElement('div');
    row.className = 'archive-row';

    const label = document.createElement('span');
    label.textContent = `#${puzzleNum}`;
    row.appendChild(label);

    const spacer = document.createElement('span');
    spacer.className = 'spacer';
    row.appendChild(spacer);

    const result = opts.results[String(puzzleNum)];
    if (result !== undefined) {
      const outcome = document.createElement('span');
      outcome.className = 'archive-result' + (result !== null ? ' won' : '');
      outcome.textContent = result !== null ? `${result}/${opts.maxGuesses}` : 'X';
      row.appendChild(outcome);
    }

    const play = document.createElement('button');
    play.className = 'archive-play';
    play.textContent = result !== undefined ? 'replay' : 'play';
    play.addEventListener('click', () => opts.onPlay(puzzleNum));
    row.appendChild(play);

    list.appendChild(row);
  }
  body.appendChild(list);
}
