import { applyGuess, createGame } from './game/engine';
import type { GameState } from './game/engine';
import { keyboardStates, scoreGuess } from './game/scorer';
import { dailyIndex, localDateString, puzzleNumber } from './game/daily';
import { recordResult } from './game/stats';
import { CATEGORIES, MAX_GUESSES } from './game/types';
import type { Category, Difficulty } from './game/types';
import { allData, getEntry, pool } from './data';
import {
  loadDailyProgress,
  loadSettings,
  loadStats,
  saveDailyProgress,
  saveSettings,
  saveStats,
} from './storage';
import { Board } from './ui/board';
import { Keyboard } from './ui/keyboard';
import {
  buildEndModal,
  buildHelpModal,
  buildSettingsModal,
  buildStatsModal,
  closeModal,
  initModalChrome,
  openModal,
} from './ui/modals';
import { copyShare, shareText } from './ui/share';
import { toast } from './ui/toast';
import { applyTheme } from './ui/theme';

type Mode = 'daily' | 'practice';

let settings = loadSettings();
let stats = loadStats();
let mode: Mode = 'daily';
let answerKey = '';
let game: GameState;
let currentInput = '';
let revealing = false;

const board = new Board(document.getElementById('game-board')!);
let keyboard: Keyboard;

const todayString = () => localDateString(new Date());
const todayPuzzle = () => puzzleNumber(todayString());

function practiceFilter(): { difficulty?: Difficulty; category?: Category } {
  const difficulty = (document.getElementById('filter-difficulty') as HTMLSelectElement).value;
  const category = (document.getElementById('filter-category') as HTMLSelectElement).value;
  return {
    ...(difficulty ? { difficulty: difficulty as Difficulty } : {}),
    ...(category ? { category: category as Category } : {}),
  };
}

function setStatusLine(): void {
  const el = document.getElementById('status-line')!;
  const entry = getEntry(answerKey);
  const hard = settings.hardMode ? '<span class="sep">//</span>hard mode' : '';
  if (mode === 'daily') {
    el.innerHTML = `puzzle #${todayPuzzle()}<span class="sep">//</span>${game.answer.length} chars${hard}`;
  } else {
    el.innerHTML = `practice<span class="sep">//</span>${entry.difficulty}<span class="sep">//</span>${game.answer.length} chars${hard}`;
  }
}

function renderResumedGame(): void {
  board.build(MAX_GUESSES, game.answer.length);
  game.guesses.forEach((guess, i) => {
    void board.reveal(i, guess, scoreGuess(guess, game.answer), false);
  });
  keyboard.setStates(keyboardStates(game.guesses, game.answer));
  setStatusLine();
}

function startDaily(): void {
  const keys = pool();
  answerKey = keys[dailyIndex(todayPuzzle(), keys.length)];
  game = createGame(answerKey);
  currentInput = '';
  const saved = loadDailyProgress(todayPuzzle());
  if (saved) {
    for (const guess of saved.guesses) {
      const result = applyGuess(game, guess);
      if (!result.error) game = result.state;
    }
  }
  keyboard.reset();
  renderResumedGame();
  if (game.status !== 'playing') {
    showEndModal();
  }
}

function startPractice(): void {
  const keys = pool(practiceFilter());
  if (keys.length === 0) {
    toast('No acronyms match those filters');
    return;
  }
  answerKey = keys[Math.floor(Math.random() * keys.length)];
  game = createGame(answerKey);
  currentInput = '';
  keyboard.reset();
  renderResumedGame();
}

function startCurrentMode(): void {
  if (mode === 'daily') startDaily();
  else startPractice();
}

function setMode(next: Mode): void {
  mode = next;
  document.getElementById('tab-daily')!.setAttribute('aria-selected', String(next === 'daily'));
  document.getElementById('tab-practice')!.setAttribute('aria-selected', String(next === 'practice'));
  (document.getElementById('practice-bar') as HTMLElement).hidden = next !== 'practice';
  startCurrentMode();
}

function showEndModal(): void {
  const entry = getEntry(answerKey);
  const won = game.status === 'won';
  openModal(won ? 'ACCESS GRANTED' : 'ACCESS DENIED', (body) =>
    buildEndModal(body, {
      state: game,
      entry,
      daily: mode === 'daily',
      onShare: async () => {
        const ok = await copyShare(shareText(game, todayPuzzle(), settings.hardMode));
        toast(ok ? 'Copied to clipboard' : 'Could not access the clipboard');
      },
      onNewGame: () => {
        closeModal();
        startPractice();
      },
    }),
  );
}

async function submitGuess(): Promise<void> {
  const rowIndex = game.guesses.length;
  const result = applyGuess(game, currentInput, settings.hardMode);
  if (result.error) {
    board.shake(rowIndex);
    toast(result.error);
    return;
  }
  revealing = true;
  game = result.state;
  currentInput = '';
  const guess = game.guesses[rowIndex];

  if (mode === 'daily') {
    saveDailyProgress({ puzzleNum: todayPuzzle(), guesses: game.guesses, status: game.status });
  }

  await board.reveal(rowIndex, guess, scoreGuess(guess, game.answer));
  keyboard.setStates(keyboardStates(game.guesses, game.answer));
  revealing = false;

  if (game.status === 'won') {
    board.celebrate(rowIndex);
    finishGame(rowIndex + 1);
  } else if (game.status === 'lost') {
    finishGame(null);
  }
}

function finishGame(wonInGuesses: number | null): void {
  if (mode === 'daily') {
    stats = recordResult(stats, todayPuzzle(), wonInGuesses);
    saveStats(stats);
  }
  setTimeout(showEndModal, wonInGuesses !== null ? 900 : 400);
}

function handleKey(key: string): void {
  if (revealing || game.status !== 'playing') return;
  if (key === 'ENTER') {
    void submitGuess();
  } else if (key === 'BACK') {
    currentInput = currentInput.slice(0, -1);
    board.setInput(game.guesses.length, currentInput);
  } else if (/^[A-Z0-9]$/.test(key) && currentInput.length < game.answer.length) {
    currentInput += key;
    board.setInput(game.guesses.length, currentInput);
  }
}

function initChrome(): void {
  initModalChrome();
  applyTheme(settings.theme);

  const categorySelect = document.getElementById('filter-category') as HTMLSelectElement;
  for (const category of CATEGORIES) {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  }

  document.getElementById('tab-daily')!.addEventListener('click', () => setMode('daily'));
  document.getElementById('tab-practice')!.addEventListener('click', () => setMode('practice'));
  document.getElementById('btn-new-game')!.addEventListener('click', startPractice);
  document.getElementById('filter-difficulty')!.addEventListener('change', startPractice);
  document.getElementById('filter-category')!.addEventListener('change', startPractice);

  document.getElementById('btn-help')!.addEventListener('click', () =>
    openModal('How to play', buildHelpModal),
  );
  document.getElementById('btn-stats')!.addEventListener('click', () =>
    openModal('Statistics', (body) => buildStatsModal(body, stats)),
  );
  document.getElementById('btn-settings')!.addEventListener('click', () =>
    openModal('Settings', (body) =>
      buildSettingsModal(body, {
        hardMode: settings.hardMode,
        lightTheme: settings.theme === 'light',
        onHardMode: (on) => {
          settings = { ...settings, hardMode: on };
          saveSettings(settings);
          setStatusLine();
        },
        onLightTheme: (on) => {
          settings = { ...settings, theme: on ? 'light' : 'dark' };
          saveSettings(settings);
          applyTheme(settings.theme);
        },
      }),
    ),
  );

  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (!(document.getElementById('modal-backdrop') as HTMLElement).hidden) return;
    if (event.target instanceof HTMLSelectElement) return;
    const key = event.key.toUpperCase();
    if (key === 'ENTER') handleKey('ENTER');
    else if (key === 'BACKSPACE') handleKey('BACK');
    else if (/^[A-Z0-9]$/.test(key)) handleKey(key);
  });
}

function main(): void {
  if (Object.keys(allData()).length === 0) {
    toast('Acronym data failed to load');
    return;
  }
  keyboard = new Keyboard(document.getElementById('keyboard')!, handleKey);
  initChrome();
  const firstVisit = stats.played === 0 && localStorage.getItem('cyberdle:seen') === null;
  startDaily();
  if (firstVisit) {
    localStorage.setItem('cyberdle:seen', '1');
    openModal('How to play', buildHelpModal);
  }
}

main();
