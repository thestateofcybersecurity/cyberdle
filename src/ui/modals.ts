import type { AcronymEntry } from '../game/types';
import type { GameState } from '../game/engine';
import type { Stats } from '../game/stats';
import { winRate } from '../game/stats';

const backdrop = () => document.getElementById('modal-backdrop') as HTMLElement;
const titleEl = () => document.getElementById('modal-title') as HTMLElement;
const bodyEl = () => document.getElementById('modal-body') as HTMLElement;

export function openModal(title: string, buildBody: (body: HTMLElement) => void): void {
  titleEl().textContent = title;
  const body = bodyEl();
  body.innerHTML = '';
  buildBody(body);
  backdrop().hidden = false;
}

export function closeModal(): void {
  backdrop().hidden = true;
}

export function initModalChrome(): void {
  document.getElementById('btn-close-modal')?.addEventListener('click', closeModal);
  backdrop().addEventListener('click', (e) => {
    if (e.target === backdrop()) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !backdrop().hidden) closeModal();
  });
}

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

export interface EndModalOptions {
  state: GameState;
  entry: AcronymEntry;
  daily: boolean;
  onShare?: () => void;
  onNewGame?: () => void;
}

export function buildEndModal(body: HTMLElement, opts: EndModalOptions): void {
  const { state, entry, daily } = opts;
  const won = state.status === 'won';

  body.appendChild(
    el('p', undefined, won ? `Decoded in ${state.guesses.length}/${state.maxGuesses}.` : 'Out of guesses. The answer was:'),
  );
  body.appendChild(el('div', 'result-answer', entry.display));
  body.appendChild(el('p', 'result-expansion', entry.expansion));

  const chips = el('div', 'chip-row');
  chips.appendChild(el('span', 'chip accent', entry.category));
  chips.appendChild(el('span', 'chip', entry.difficulty));
  body.appendChild(chips);

  body.appendChild(el('div', 'explanation', entry.explanation));

  body.appendChild(el('h3', undefined, 'Sources'));
  const list = el('ul', 'sources-list');
  for (const source of entry.sources) {
    const item = el('li');
    const link = el('a', undefined, source.name);
    link.setAttribute('href', source.url);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    item.appendChild(link);
    list.appendChild(item);
  }
  body.appendChild(list);

  const actions = el('div', 'modal-actions');
  if (daily && opts.onShare) {
    const share = el('button', 'primary-btn', 'Share result');
    share.addEventListener('click', opts.onShare);
    actions.appendChild(share);
  }
  if (!daily && opts.onNewGame) {
    const again = el('button', 'primary-btn', 'New game');
    again.addEventListener('click', opts.onNewGame);
    actions.appendChild(again);
  }
  body.appendChild(actions);

  if (daily) {
    const countdown = el('div', 'countdown');
    body.appendChild(countdown);
    const tick = () => {
      const now = new Date();
      const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const ms = next.getTime() - now.getTime();
      const h = String(Math.floor(ms / 3_600_000)).padStart(2, '0');
      const m = String(Math.floor((ms % 3_600_000) / 60_000)).padStart(2, '0');
      const s = String(Math.floor((ms % 60_000) / 1000)).padStart(2, '0');
      countdown.textContent = `next puzzle in ${h}:${m}:${s}`;
    };
    tick();
    const timer = setInterval(() => {
      if (!countdown.isConnected) {
        clearInterval(timer);
        return;
      }
      tick();
    }, 1000);
  }
}

export function buildStatsModal(body: HTMLElement, stats: Stats): void {
  const grid = el('div', 'stat-grid');
  const cells: Array<[string | number, string]> = [
    [stats.played, 'played'],
    [`${winRate(stats)}%`, 'win rate'],
    [stats.currentStreak, 'streak'],
    [stats.maxStreak, 'max streak'],
  ];
  for (const [num, label] of cells) {
    const cell = el('div');
    cell.appendChild(el('div', 'stat-num', String(num)));
    cell.appendChild(el('div', 'stat-label', label));
    grid.appendChild(cell);
  }
  body.appendChild(grid);

  body.appendChild(el('h3', undefined, 'Guess distribution'));
  const max = Math.max(1, ...stats.distribution);
  const best = stats.distribution.indexOf(Math.max(...stats.distribution));
  stats.distribution.forEach((count, i) => {
    const row = el('div', 'dist-row');
    row.appendChild(el('span', undefined, String(i + 1)));
    const bar = el('div', 'dist-bar', String(count));
    if (count > 0 && i === best) bar.classList.add('best');
    bar.style.width = `${Math.max(8, (count / max) * 100)}%`;
    row.appendChild(bar);
    body.appendChild(row);
  });
}

export function buildHelpModal(body: HTMLElement): void {
  body.appendChild(
    el('p', undefined, 'Decode the cybersecurity acronym in 6 tries. Each guess must use the full length shown on the board; letters and digits are both in play.'),
  );
  body.appendChild(el('p', undefined, 'After each guess the tiles report your intel:'));

  const examples: Array<[string, number, string, string]> = [
    ['SIEM', 0, 'correct', 'S is in the acronym and in the right spot.'],
    ['XDR', 1, 'present', 'D is in the acronym but in the wrong spot.'],
    ['VPN', 2, 'absent', 'N is not in the acronym at all.'],
  ];
  for (const [word, idx, state, caption] of examples) {
    const row = el('div', 'example-row');
    [...word].forEach((ch, i) => {
      const tile = el('div', 'tile', ch);
      if (i === idx) tile.classList.add(state);
      row.appendChild(tile);
    });
    body.appendChild(row);
    body.appendChild(el('p', 'setting-desc', caption));
  }

  body.appendChild(el('h3', undefined, 'Modes'));
  body.appendChild(
    el('p', undefined, 'DAILY is one shared puzzle per day; keep your streak alive and share your grid. PRACTICE is unlimited, with difficulty and category filters.'),
  );
  body.appendChild(
    el('p', undefined, 'Win or lose, every round ends with the full expansion, a plain-English explanation, and sources to learn more.'),
  );
}

export interface SettingsOptions {
  hardMode: boolean;
  lightTheme: boolean;
  onHardMode: (on: boolean) => void;
  onLightTheme: (on: boolean) => void;
}

export function buildSettingsModal(body: HTMLElement, opts: SettingsOptions): void {
  const rows: Array<[string, string, boolean, (on: boolean) => void]> = [
    ['Hard mode', 'Revealed hints must be used in later guesses. Applies from your next guess.', opts.hardMode, opts.onHardMode],
    ['Light theme', 'Swap the terminal glow for daylight.', opts.lightTheme, opts.onLightTheme],
  ];
  for (const [label, desc, checked, onChange] of rows) {
    const row = el('div', 'setting-row');
    const text = el('div');
    text.appendChild(el('div', undefined, label));
    text.appendChild(el('div', 'setting-desc', desc));
    row.appendChild(text);
    const toggle = el('input', 'toggle') as HTMLInputElement;
    toggle.type = 'checkbox';
    toggle.checked = checked;
    toggle.addEventListener('change', () => onChange(toggle.checked));
    row.appendChild(toggle);
    body.appendChild(row);
  }
}
